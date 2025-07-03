import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import type { ChatMessage as ChatMessageType } from './ChatMessage.type';
import ChatToggleButton from './ChatToggleButton';

interface ChatDrawerProps {
    isOpen: boolean;
    toggle: () => void;
    messages: ChatMessageType[];
    onSend: (text: string) => void;
    downloadProgress: { progress: number; file: string } | null;
    modelStatus: 'initializing' | 'ready' | 'error';
}

const ChatDrawer: FC<ChatDrawerProps> = ({
    isOpen,
    toggle,
    messages,
    onSend,
    downloadProgress,
    modelStatus,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages]);

    return (
        <aside
            role="complementary"
            aria-label="Chat drawer"
            className={`fixed right-0 top-0 z-30 flex h-full w-full sm:w-2/5 transform flex-col bg-white/90 backdrop-blur-md shadow-xl transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {/* Toggle handle */}
            <ChatToggleButton isOpen={isOpen} onToggle={toggle} />

            {/* Message list */}
            <div
                ref={containerRef}
                className="flex flex-1 flex-col gap-2 overflow-y-auto p-4"
            >
                {/* Model Status Indicator */}
                <div className="mb-4 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
                    {modelStatus === 'initializing' &&
                        (downloadProgress ? (
                            <>
                                <p className="font-semibold">
                                    Downloading model...
                                </p>
                                <p className="truncate">
                                    {downloadProgress.file}
                                </p>
                                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-600"
                                        style={{
                                            width: `${downloadProgress.progress}%`,
                                        }}
                                    ></div>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="font-semibold">
                                    Initializing model...
                                </p>
                                <p>
                                    This may take a moment. The model is being
                                    prepared for you.
                                </p>
                            </>
                        ))}
                    {modelStatus === 'ready' && (
                        <div>
                            <p className="font-semibold text-green-600">
                                Model Ready
                            </p>
                            <p>
                                The model is loaded and ready for your
                                questions.
                            </p>
                        </div>
                    )}
                    {modelStatus === 'error' && (
                        <div>
                            <p className="font-semibold text-red-600">
                                Model Error
                            </p>
                            <p>
                                There was a problem loading the model. Please
                                try refreshing the page.
                            </p>
                        </div>
                    )}
                </div>

                {messages.map((message) => (
                    <ChatMessage key={message.id} role={message.role}>
                        {message.content}
                    </ChatMessage>
                ))}
            </div>
            {/* Input */}
            <div className="border-t border-gray-200 p-4">
                <ChatInput onSend={onSend} disabled={modelStatus !== 'ready'} />
            </div>
            {/* Click outside to close maybe implement later */}
        </aside>
    );
};

export default ChatDrawer;
