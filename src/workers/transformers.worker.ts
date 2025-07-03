import {
    pipeline,
    type TextGenerationPipeline,
    TextStreamer,
} from '@huggingface/transformers';

/**
 * A singleton class to manage the text generation pipeline.
 */
class PipelineSingleton {
    private static instance: Promise<TextGenerationPipeline> | null = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = pipeline(
                'text-generation',
                'onnx-community/Qwen3-0.6B-ONNX',
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

self.onmessage = async (event: MessageEvent<{ prompt: string }>) => {
    const pipe = await PipelineSingleton.getInstance();
    if (!pipe) {
        self.postMessage({
            type: 'error',
            payload: 'Failed to load model.',
        });
        return;
    }

    const messages = [
        {
            role: 'system',
            content: 'You are a friendly assistant.',
        },
        {
            role: 'user',
            content: event.data.prompt,
        },
    ];

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
        max_new_tokens: 512,
        streamer,
    });

    self.postMessage({ type: 'generation-complete' });
};

initialize();
