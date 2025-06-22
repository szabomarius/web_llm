import type { FC, ReactNode } from 'react';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    children: ReactNode;
}

const ChatMessage: FC<ChatMessageProps> = ({ role, children }) => {
    const isUser = role === 'user';

    return (
        <div
            className={`max-w-sm rounded-lg px-4 py-2 text-sm shadow-md ${
                isUser
                    ? 'ml-auto bg-blue-300 text-gray-900'
                    : 'mr-auto bg-white/80 text-gray-900'
            }`}
        >
            {children}
        </div>
    );
};

export default ChatMessage;
