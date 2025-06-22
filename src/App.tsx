import type { FC } from 'react';
import { useEffect, useState } from 'react';

import ChatDrawer from './components/chat/ChatDrawer';
import type { ChatMessage } from './components/chat/ChatMessage.type';

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

    // Toggle chat with ⌘+E hotkey
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                setIsChatOpen((o) => !o);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-white">
            <h1 className="text-4xl font-bold text-black">Hello World</h1>

            {/* Chat components */}
            <ChatDrawer
                isOpen={isChatOpen}
                toggle={() => setIsChatOpen((o) => !o)}
                messages={messages}
                onSend={handleSend}
            />
        </div>
    );
};

export default App;
