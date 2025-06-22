import type { FC, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

interface ChatInputProps {
    onSend: (text: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    }, [text]);

    return (
        <div className="flex gap-2 p-2">
            <textarea
                ref={textareaRef}
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="flex-1 resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="button"
                onClick={handleSend}
                className="rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
