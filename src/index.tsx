import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import App from './App';
import './index.css';
import ToastProvider from './context/ToastProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ApolloProvider>
  </React.StrictMode>
);
