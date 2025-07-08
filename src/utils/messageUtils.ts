import type { ChatMessage } from '../components/chat/ChatMessage.type';
import type { ModelMessage } from '../services/WebLLM';

/**
 * Converts UI ChatMessage objects to model-compatible ModelMessage objects.
 * Filters out UI-specific fields like id, thinking, and _rawContent.
 *
 * @param messages - Array of UI ChatMessage objects
 * @returns Array of clean ModelMessage objects suitable for the AI model
 */
export function convertUIMessagesToModelMessages(
    messages: ChatMessage[]
): ModelMessage[] {
    return messages.map(
        (message): ModelMessage => ({
            role: message.role,
            content: message.content, // Only use the clean content, not thinking or _rawContent
        })
    );
}

/**
 * Prepares a full conversation history for the AI model.
 * Includes a system message and all conversation messages.
 *
 * @param messages - Array of UI ChatMessage objects
 * @param systemMessage - Optional custom system message (defaults to markdown-aware assistant)
 * @returns Complete conversation history ready for the AI model
 */
export function prepareConversationHistory(
    messages: ChatMessage[],
    systemMessage: string = 'You are a friendly but sharp assistant. You follow instructions precisely and are not overly verbose. Always use proper **markdown formatting** including:\n\n- **Bold text** for emphasis\n- `inline code` for technical terms\n- ```code blocks``` for code examples\n- Bullet points for lists\n- Line breaks between paragraphs\n- Clear structure and readability\n\nFormat your responses using markdown syntax for the best user experience.'
): ModelMessage[] {
    const modelMessages = convertUIMessagesToModelMessages(messages);

    // Add system message at the beginning
    return [
        {
            role: 'system',
            content: systemMessage,
        },
        ...modelMessages,
    ];
}
