import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import App from '../../src/App';

describe('App component', () => {
    it('renders the WebLLM Chat heading', () => {
        render(<App />);
        expect(screen.getByText(/WebLLM Chat/i)).toBeInTheDocument();
    });
});
