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
        onClick={onToggle}
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-md bg-blue-500 px-2 py-3 text-xs font-semibold text-white hover:bg-blue-600"
    >
        {isOpen ? '→' : '←'}
    </button>
);

export default ChatToggleButton;
