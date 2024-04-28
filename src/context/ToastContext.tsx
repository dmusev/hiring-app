import React from 'react';

export interface ToastOptions {
    autohide?: boolean;
    delay?: number;
    animation?: string;
    bg?: 'success' | 'danger';
}

const ToastContext = React.createContext<ToastContextValue>({
    handleShowToast: (message) => { },
    handleCloseToast: () => { },
});

export interface ToastContextValue {
    handleShowToast: (message: string, options?: ToastOptions) => void;
    handleCloseToast: () => void;
}

export default ToastContext;