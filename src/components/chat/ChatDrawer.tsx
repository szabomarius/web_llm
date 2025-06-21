import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import type { ChatMessage as ChatMessageType } from './ChatMessage.type';

interface ChatDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    messages: ChatMessageType[];
    onSend: (text: string) => void;
}

const ChatDrawer: FC<ChatDrawerProps> = ({
    isOpen,
    onClose,
    messages,
    onSend,
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
            className={`fixed right-0 top-0 z-30 h-full w-80 transform bg-yellow-100 shadow-xl transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {/* Close button */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close chat panel"
                className="absolute left-4 top-4 rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
            >
                ✕
            </button>

            {/* Message list */}
            <div
                ref={containerRef}
                className="flex h-[calc(100%-64px)] flex-col gap-2 overflow-y-auto p-4"
            >
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
