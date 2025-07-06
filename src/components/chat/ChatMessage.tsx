import type { FC } from 'react';
import { useState } from 'react';

import chevron from '../../assets/chevron.svg';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    thinking?: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ role, content, thinking }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const isUser = role === 'user';
    const hasThinking = !isUser && thinking && thinking.trim().length > 0;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

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
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">{content}</div>
                    <button
                        onClick={handleCopy}
                        className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
                        title={copySuccess ? 'Copied!' : 'Copy message'}
                    >
                        {copySuccess ? (
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
