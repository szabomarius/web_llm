// Type definitions for message interfaces
export interface ModelMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export type WebLLMMessage = {
    type:
        | 'token'
        | 'generation-complete'
        | 'ready'
        | 'error'
        | 'download-progress';
    payload: unknown;
};

export class WebLLM {
    private worker: Worker;
    private onMessage: ((message: WebLLMMessage) => void) | null = null;

    constructor(onMessage: (message: WebLLMMessage) => void) {
        this.worker = new Worker(
            new URL('../workers/transformers.worker.ts', import.meta.url),
            {
                type: 'module',
            }
        );
        this.onMessage = onMessage;
        this.worker.onmessage = (event: MessageEvent<WebLLMMessage>) => {
            this.onMessage?.(event.data);
        };
    }

    public generate(prompt: string) {
        this.worker.postMessage({ prompt });
    }

    public generateWithHistory(messages: ModelMessage[]) {
        this.worker.postMessage({ messages });
    }

    public terminate() {
        this.worker.terminate();
    }
}
