import type { FC, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import sendIcon from '../../assets/send.svg';

interface ChatInputProps {
    onSend: (text: string) => void;
    disabled?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ onSend, disabled }) => {
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
        <div className="flex items-end gap-2 p-2">
            <textarea
                ref={textareaRef}
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="flex-1 min-h-10 resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={disabled}
            />
            <button
                type="button"
                aria-label="Send message"
                onClick={handleSend}
                className="flex h-10 w-10 items-center justify-center rounded bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={disabled}
            >
                <img src={sendIcon} alt="send" className="h-5 w-5" />
            </button>
        </div>
    );
};

export default ChatInput;
