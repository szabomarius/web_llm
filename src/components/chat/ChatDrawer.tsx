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
}

const ChatDrawer: FC<ChatDrawerProps> = ({
    isOpen,
    toggle,
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
            className={`fixed right-0 top-0 z-30 h-full w-full sm:w-2/5 transform bg-white/90 backdrop-blur-md shadow-xl transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {/* Toggle handle */}
            <ChatToggleButton isOpen={isOpen} onToggle={toggle} />

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
