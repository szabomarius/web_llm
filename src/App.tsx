import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import ChatDrawer from './components/chat/ChatDrawer';
import type { ChatMessage } from './components/chat/ChatMessage.type';
import { WebLLM, type WebLLMMessage } from './services/WebLLM';

const App: FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const llm = useRef<WebLLM | null>(null);

    useEffect(() => {
        const handleLLMMessage = (message: WebLLMMessage) => {
            switch (message.type) {
                case 'token':
                    setMessages((prev) => {
                        const lastMessage = prev[prev.length - 1];
                        if (lastMessage?.role === 'assistant') {
                            return [
                                ...prev.slice(0, -1),
                                {
                                    ...lastMessage,
                                    content:
                                        lastMessage.content + message.payload,
                                },
                            ];
                        }
                        return prev;
                    });
                    break;
                case 'generation-complete':
                    // Generation is done.
                    break;
                case 'ready':
                    // You could add a status indicator here.
                    break;
                case 'error':
                    // Handle errors from the worker.
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            role: 'assistant',
                            content: `Error: ${JSON.stringify(
                                message.payload
                            )}`,
                        },
                    ]);
                    break;
            }
        };

        const webllm = new WebLLM(handleLLMMessage);
        llm.current = webllm;

        return () => {
            webllm.terminate();
        };
    }, []);

    const handleSend = (text: string) => {
        if (!llm.current) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            role: 'user',
            content: text,
        };
        const assistantMessage: ChatMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            content: '',
        };
        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        llm.current.generate(text);
    };

    // Toggle chat with ⌘+E hotkey
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                setIsChatOpen((o) => !o);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-white">
            <h1 className="text-4xl font-bold text-black">Hello World</h1>

            {/* Chat components */}
            <ChatDrawer
                isOpen={isChatOpen}
                toggle={() => setIsChatOpen((o) => !o)}
                messages={messages}
                onSend={handleSend}
            />
        </div>
    );
};

export default App;
