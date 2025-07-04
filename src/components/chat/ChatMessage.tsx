import type { FC } from 'react';

import chevron from '../../assets/chevron.svg';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    thinking?: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ role, content, thinking }) => {
    const isUser = role === 'user';
    const hasThinking = !isUser && thinking && thinking.trim().length > 0;

    return (
        <div
            className={`flex items-start gap-2 ${
                isUser ? 'justify-end' : 'justify-start'
            }`}
        >
            <div
                className={`max-w-xl rounded-lg px-3 py-2 ${
                    isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
            >
                {hasThinking && (
                    <div className="mb-2">
                        <details className="group">
                            <summary className="list-none flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs font-semibold text-gray-600 group-open:rounded-b-none">
                                <span>Thought Process</span>
                                <img
                                    src={chevron}
                                    alt="toggle"
                                    className="h-4 w-4 transform transition-transform group-open:rotate-180"
                                />
                            </summary>
                            <div className="rounded-b-lg border border-t-0 border-gray-300 bg-gray-100 p-2 text-xs text-gray-500">
                                <p className="whitespace-pre-wrap">
                                    {thinking}
                                </p>
                            </div>
                        </details>
                    </div>
                )}
                <div>{content}</div>
            </div>
        </div>
    );
};

export default ChatMessage;
