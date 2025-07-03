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
}

const ChatDrawer: FC<ChatDrawerProps> = ({
    isOpen,
    toggle,
    messages,
    onSend,
    downloadProgress,
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
                {downloadProgress && (
                    <div className="mb-4 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
                        <p className="font-semibold">Downloading model...</p>
                        <p className="truncate">{downloadProgress.file}</p>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-blue-600"
                                style={{
                                    width: `${downloadProgress.progress}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                )}
                {messages.map((m) => (
                    <ChatMessage key={m.id} role={m.role}>
                        {m.content}
                    </ChatMessage>
                ))}
            </div>
            {/* Input */}
            <ChatInput onSend={onSend} />
            {/* Click outside to close maybe implement later */}
        </aside>
    );
};

export default ChatDrawer;
