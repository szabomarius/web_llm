import type { FC } from 'react';

interface ChatToggleButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

// A small vertical pill-shaped button that sits on the right edge of the screen.
const ChatToggleButton: FC<ChatToggleButtonProps> = ({ isOpen, onToggle }) => (
    <button
        type="button"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        title="⌘E"
        onClick={onToggle}
        className="group absolute -left-8 top-1/2 z-40 -translate-y-1/2 rounded-l-md bg-indigo-500 px-2 py-3 text-xs font-semibold text-white hover:bg-indigo-600"
    >
        {isOpen ? '→' : '←'}
        <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            ⌘E
        </span>
    </button>
);

export default ChatToggleButton;
