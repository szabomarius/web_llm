import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import ChatDrawer from './components/chat/ChatDrawer';
import type { ChatMessage } from './components/chat/ChatMessage.type';
import { WebLLM, type WebLLMMessage } from './services/WebLLM';
import { prepareConversationHistory } from './utils/messageUtils';

type DownloadProgress = {
    progress: number;
    file: string;
};

type ModelStatus = 'initializing' | 'ready' | 'error';

const App: FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [downloadProgress, setDownloadProgress] =
        useState<DownloadProgress | null>(null);
    const [modelStatus, setModelStatus] = useState<ModelStatus>('initializing');
    const [isGenerating, setIsGenerating] = useState(false);
    const llm = useRef<WebLLM | null>(null);

    useEffect(() => {
        const handleLLMMessage = (message: WebLLMMessage) => {
            switch (message.type) {
                case 'token':
                    setMessages((prev) => {
                        const lastMessage = prev[prev.length - 1];
                        if (lastMessage?.role === 'assistant') {
                            const newRawContent =
                                (lastMessage._rawContent || '') +
                                message.payload;

                            let finalContent = '';
                            let finalThinking = '';
                            let buffer = newRawContent;

                            const thinkTagStart = '<think>';
                            const thinkTagEnd = '</think>';

                            while (buffer.length > 0) {
                                const thinkStartIdx =
                                    buffer.indexOf(thinkTagStart);

                                if (thinkStartIdx === -1) {
                                    finalContent += buffer;
                                    buffer = '';
                                    continue;
                                }

                                finalContent += buffer.substring(
                                    0,
                                    thinkStartIdx
                                );
                                buffer = buffer.substring(thinkStartIdx);

                                const thinkEndIdx = buffer.indexOf(thinkTagEnd);

                                if (thinkEndIdx === -1) {
                                    finalThinking += buffer.substring(
                                        thinkTagStart.length
                                    );
                                    buffer = '';
                                    continue;
                                }

                                finalThinking += buffer.substring(
                                    thinkTagStart.length,
                                    thinkEndIdx
                                );
                                buffer = buffer.substring(
                                    thinkEndIdx + thinkTagEnd.length
                                );
                            }

                            return [
                                ...prev.slice(0, -1),
                                {
                                    ...lastMessage,
                                    content: finalContent,
                                    thinking: finalThinking,
                                    _rawContent: newRawContent,
                                },
                            ];
                        }
                        return prev;
                    });
                    break;
                case 'generation-complete':
                    setIsGenerating(false);
                    // Generation is done.
                    break;
                case 'download-progress': {
                    const payload = message.payload as {
                        progress: number;
                        file: string;
                    };
                    if (
                        payload &&
                        typeof payload.progress === 'number' &&
                        typeof payload.file === 'string'
                    ) {
                        setDownloadProgress({
                            progress: payload.progress,
                            file: payload.file,
                        });
                    }
                    setModelStatus('initializing');
                    break;
                }
                case 'ready':
                    setDownloadProgress(null);
                    setModelStatus('ready');
                    break;
                case 'error':
                    setModelStatus('error');
                    setIsGenerating(false);
                    // Handle errors from the worker.
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            role: 'assistant',
                            content:
                                'Sorry, an error occurred while processing your request. Please try again.',
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
            thinking: '',
            _rawContent: '',
        };

        // Prepare conversation history including the new user message
        const conversationHistory = prepareConversationHistory([
            ...messages,
            userMessage,
        ]);

        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setIsGenerating(true);

        // Use the new generateWithHistory method instead of generate
        llm.current.generateWithHistory(conversationHistory);
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
            <div className="text-center">
                <h1 className="text-4xl font-bold text-black mb-4">
                    WebLLM Chat
                </h1>
                <p className="text-gray-600 mb-2">
                    An AI chat interface powered by WebLLM
                </p>
                <p className="text-sm text-gray-500">
                    Press{' '}
                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">
                        ⌘+E
                    </kbd>{' '}
                    to open the chat
                </p>
            </div>

            {/* Chat components */}
            <ChatDrawer
                isOpen={isChatOpen}
                toggle={() => setIsChatOpen((o) => !o)}
                messages={messages}
                onSend={handleSend}
                downloadProgress={downloadProgress}
                modelStatus={modelStatus}
                isGenerating={isGenerating}
            />
        </div>
    );
};

export default App;
