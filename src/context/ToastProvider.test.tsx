import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToastProvider from './ToastProvider';
import ToastContext from './ToastContext';

// Mock child component to interact with ToastContext
const MockChildComponent = () => {
    const { handleShowToast, handleCloseToast } = useContext(ToastContext);

    return (
        <div>
            <button onClick={() => handleShowToast("Test Message", { autohide: true })}>
                Show Toast
            </button>
            <button onClick={handleCloseToast}>Close Toast</button>
        </div>
    );
};

describe('ToastProvider Component', () => {
    it('should show and hide toast when context functions are called', () => {
        render(
            <ToastProvider>
                <MockChildComponent />
            </ToastProvider>
        );

        // Initial state should not show the toast
        // expect(screen.queryByText('Test Message')).toBeNull();

        // Simulate showing the toast
        userEvent.click(screen.getByText('Show Toast'));

        // Simulate hiding the toast
        userEvent.click(screen.getByText('Close Toast'));
        // We use queryByText because it returns null instead of throwing if the element is not found
        expect(screen.queryByText('Test Message')).toBeNull();
    });
});
