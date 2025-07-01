import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { WebLLM } from './services/WebLLM.ts';

const llm = new WebLLM();
console.log('Loading model...');
llm.generate('Hello, how are you?')
    .then(console.log)
    .catch((e: unknown) => {
        console.error(e);
    });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
