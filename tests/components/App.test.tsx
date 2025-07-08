import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import App from '../../src/App';

describe('App component', () => {
    it('renders the Transformers.js Chat heading', () => {
        render(<App />);
        expect(screen.getByText(/Transformers\.js Chat/i)).toBeInTheDocument();
    });
});
