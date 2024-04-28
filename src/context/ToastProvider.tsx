import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContext, { ToastContextValue } from './ToastContext';
import './Toast.css';

interface CombinedToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({
    children,
}: CombinedToastProviderProps) {
    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastOptions, setToastOptions] = useState({});

    const handleShowToast = (message: string, options = {}) => {
        setToastMessage(message);
        setToastOptions(options);
        setShow(true);
    };

    const handleCloseToast = () => setShow(false);

    const value: ToastContextValue = {
        handleShowToast,
        handleCloseToast,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            {/* Render the toast component outside the provider for global access */}
            <Toast onClose={handleCloseToast} show={show} {...toastOptions} className="toast">
                <Toast.Header>
                    <strong className="me-auto">Message</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContext.Provider>
    );
};