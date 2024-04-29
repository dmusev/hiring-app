import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import App from './App';
import ToastProvider from './context/ToastProvider';

describe('Application Root', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    const { unmount } = render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ApolloProvider>
      </React.StrictMode>,
      { container: div }
    );

    const linkElement = screen.getByText("Let's hire!");
    expect(linkElement).toBeInTheDocument();

    unmount();
  });
});
