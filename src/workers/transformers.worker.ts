import {
    pipeline,
    type TextGenerationPipeline,
    TextStreamer,
} from '@huggingface/transformers';

// Type definitions for message interfaces
interface ModelMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface WorkerMessageData {
    // New format: conversation history
    messages?: ModelMessage[];
    // Old format: single prompt (for backward compatibility)
    prompt?: string;
}

/**
 * A singleton class to manage the text generation pipeline.
 */
class PipelineSingleton {
    private static instance: Promise<TextGenerationPipeline> | null = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = pipeline(
                'text-generation',
                'HuggingFaceTB/SmolLM2-1.7B-Instruct',
                {
                    dtype: 'q4f16',
                    device: 'webgpu',
                    progress_callback: (progress: unknown) => {
                        self.postMessage({
                            type: 'download-progress',
                            payload: progress,
                        });
                    },
                }
            ) as unknown as Promise<TextGenerationPipeline>;
        }
        return this.instance;
    }
}

async function initialize() {
    try {
        await PipelineSingleton.getInstance();
        self.postMessage({ type: 'ready' });
    } catch (e) {
        self.postMessage({
            type: 'error',
            payload: e,
        });
    }
}

self.onmessage = async (event: MessageEvent<WorkerMessageData>) => {
    const pipe = await PipelineSingleton.getInstance();
    if (!pipe) {
        self.postMessage({
            type: 'error',
            payload: 'Failed to load model.',
        });
        return;
    }

    let messages: ModelMessage[];

    // Support both new format (messages array) and old format (single prompt)
    if (event.data.messages) {
        // New format: use provided conversation history (includes system message)
        messages = event.data.messages;
    } else if (event.data.prompt) {
        // Old format: create messages array from prompt (backward compatibility)
        messages = [
            {
                role: 'system',
                content:
                    'You are a friendly but sharp assistant. You follow instructions precisely and are not overly verbose. Always use proper **markdown formatting** including:\n\n- **Bold text** for emphasis\n- `inline code` for technical terms\n- ```code blocks``` for code examples\n- Bullet points for lists\n- Line breaks between paragraphs\n- Clear structure and readability\n\nFormat your responses using markdown syntax for the best user experience.',
            },
            {
                role: 'user',
                content: event.data.prompt,
            },
        ];
    } else {
        self.postMessage({
            type: 'error',
            payload:
                'Invalid message format: must provide either messages array or prompt string.',
        });
        return;
    }

    // Log the messages being sent to the model for debugging
    console.log(
        '🤖 Messages being sent to model:',
        JSON.stringify(messages, null, 2)
    );

    const streamer = new TextStreamer(pipe.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (text: string) => {
            self.postMessage({
                type: 'token',
                payload: text,
            });
        },
    });

    await pipe(messages, {
        max_new_tokens: 10000,
        streamer,
        temperature: 0.7,
        top_p: 0.95,
    });

    self.postMessage({ type: 'generation-complete' });
};

initialize();
