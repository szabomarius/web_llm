import type { FC } from 'react';
import { useState } from 'react';

import ChatDrawer from './components/chat/ChatDrawer';
import type { ChatMessage } from './components/chat/ChatMessage.type';
import ChatToggleButton from './components/chat/ChatToggleButton';

const App: FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, role: 'user', content: 'hi' },
        {
            id: 2,
            role: 'assistant',
            content: 'The chat bot answers normally, in this whole text.',
        },
        { id: 3, role: 'user', content: "now let's.." },
    ]);

    const handleSend = (text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), role: 'user', content: text },
            { id: Date.now() + 1, role: 'assistant', content: 'Echo: ' + text }, // stub
        ]);
    };

    return (
        <div className="relative min-h-screen bg-white">
            <div className="flex h-full items-center justify-center">
                <h1 className="text-4xl font-bold text-black">Hello World</h1>
            </div>

            {/* Chat components */}
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                messages={messages}
                onSend={handleSend}
            />
            <ChatToggleButton
                isOpen={isChatOpen}
                onToggle={() => setIsChatOpen((o) => !o)}
            />
        </div>
    );
};

export default App;
