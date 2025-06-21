import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import App from '../../src/App';

describe('App component', () => {
    it('renders the Hello World heading', () => {
        render(<App />);
        expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
    });
});
