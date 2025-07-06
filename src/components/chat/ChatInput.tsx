import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import sendIcon from '../../assets/send.svg';

interface ChatInputProps {
    onSend: (text: string) => void;
    disabled?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ onSend, disabled }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (text.trim() && !disabled) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
        }
    }, [text]);

    return (
        <div className="flex items-end gap-2">
            <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={1}
                className="flex-1 min-h-10 max-h-30 resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={disabled}
            />
            <button
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
