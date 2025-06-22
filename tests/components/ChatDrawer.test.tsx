import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import App from '../../src/App';

describe('Chat drawer toggle', () => {
    it('opens and closes the chat drawer', () => {
        render(<App />);

        const toggleButton = screen.getByRole('button', { name: /open chat/i });
        expect(toggleButton).toBeInTheDocument();

        // Drawer should be hidden initially (translated out of page)
        const drawerContainer = screen.getByRole('complementary', {
            name: /chat drawer/i,
        });
        expect(drawerContainer.classList.contains('translate-x-full')).toBe(
            true
        );

        // Open drawer
        fireEvent.click(toggleButton);
        expect(drawerContainer.classList.contains('translate-x-0')).toBe(true);

        // Close again via same toggle handle
        fireEvent.click(toggleButton);

        // Drawer closed again
        expect(drawerContainer.classList.contains('translate-x-full')).toBe(
            true
        );
    });
});
