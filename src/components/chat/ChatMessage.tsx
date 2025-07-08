import type { FC } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                className={`max-w-2xl rounded-lg px-4 py-3 ${
                    isUser
                        ? 'bg-gray-100 text-gray-900 shadow-sm border border-gray-200'
                        : 'bg-white text-gray-900 shadow-sm border border-gray-200'
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
                    <div className="flex-1 prose prose-sm max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Custom styling for code blocks
                                code: (
                                    props: React.ComponentProps<'code'> & {
                                        inline?: boolean;
                                    }
                                ) => {
                                    const { inline, children, ...rest } = props;
                                    return inline ? (
                                        <code
                                            className={`${
                                                isUser
                                                    ? 'bg-gray-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono font-semibold'
                                                    : 'bg-gray-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono font-semibold'
                                            }`}
                                            {...rest}
                                        >
                                            {children}
                                        </code>
                                    ) : (
                                        <pre
                                            className={`${
                                                isUser
                                                    ? 'bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto my-2'
                                                    : 'bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto my-2'
                                            }`}
                                        >
                                            <code
                                                className="text-sm font-mono"
                                                {...rest}
                                            >
                                                {children}
                                            </code>
                                        </pre>
                                    );
                                },
                                // Custom styling for lists
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-1 my-3 ml-2">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-1 my-3 ml-2">
                                        {children}
                                    </ol>
                                ),
                                li: ({ children }) => (
                                    <li className="leading-relaxed">
                                        {children}
                                    </li>
                                ),
                                // Custom styling for paragraphs
                                p: ({ children }) => (
                                    <p className="mb-3 last:mb-0 leading-relaxed">
                                        {children}
                                    </p>
                                ),
                                // Custom styling for headings
                                h1: ({ children }) => (
                                    <h1 className="text-xl font-bold mb-3 mt-2 border-b border-gray-300 pb-1">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-lg font-bold mb-2 mt-2">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-md font-semibold mb-2 mt-2">
                                        {children}
                                    </h3>
                                ),
                                // Custom styling for blockquotes
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-blue-400 pl-4 italic my-3 bg-gray-50 py-2 rounded-r">
                                        {children}
                                    </blockquote>
                                ),
                                // Custom styling for strong (bold) text
                                strong: ({ children }) => (
                                    <strong className="font-bold text-gray-900">
                                        {children}
                                    </strong>
                                ),
                                // Custom styling for emphasis (italic) text
                                em: ({ children }) => (
                                    <em className="italic text-gray-800">
                                        {children}
                                    </em>
                                ),
                                // Custom styling for links
                                a: ({ children, href }) => (
                                    <a
                                        href={href}
                                        className="text-blue-600 hover:text-blue-800 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
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
