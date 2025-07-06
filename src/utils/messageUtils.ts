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
 * @param systemMessage - Optional custom system message (defaults to friendly assistant)
 * @returns Complete conversation history ready for the AI model
 */
export function prepareConversationHistory(
    messages: ChatMessage[],
    systemMessage: string = 'You are a friendly assistant.'
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
