export interface ChatMessage {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    thinking?: string;
    _rawContent?: string;
}
