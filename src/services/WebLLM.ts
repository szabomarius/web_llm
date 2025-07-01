import {
    pipeline,
    type TextGenerationPipeline,
    TextStreamer,
} from '@huggingface/transformers';

export class WebLLM {
    private _pipe: Promise<TextGenerationPipeline>;

    constructor() {
        // Start loading the model as soon as the service is constructed so that
        // subsequent calls to `generate` can reuse the same pipeline instance.
        this._pipe = this._loadModel();
    }

    /**
     * Load the text-generation pipeline. You can swap the model identifier with
     * any other model available on the Hugging Face Hub that is compatible
     * with the Transformers.js runtime.
     */
    private async _loadModel() {
        // Using an official Transformers.js compatible checkpoint so we avoid
        // 404s for missing ONNX files. See
        // https://huggingface.co/Xenova/distilgpt2 for the available assets.
        return pipeline('text-generation', 'onnx-community/Qwen3-0.6B-ONNX', {
            dtype: 'q4f16',
        });
    }

    /**
     * Generate a completion for the provided prompt.
     *
     * Example:
     * ```ts
     * const llm = new WebLLM();
     * const reply = await llm.generate('Hi, how are you?');
     * console.log(reply);
     * ```
     */
    async generate(prompt: string) {
        const pipe = await this._pipe;

        const messages = [
            { role: 'system', content: 'You are a helpful assistant.' },
            {
                role: 'user',
                content: prompt,
            },
        ];

        // Generate a response
        const output = await pipe(messages, {
            max_new_tokens: 512,
            do_sample: false,
            streamer: new TextStreamer(pipe.tokenizer, {
                skip_prompt: true,
                skip_special_tokens: true,
            }),
        });
        console.log(output[0]);
    }
}
