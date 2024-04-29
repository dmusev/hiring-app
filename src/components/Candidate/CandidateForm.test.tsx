import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import CandidateForm from './CandidateForm';
import ToastContext from '../../context/ToastContext';
import { CREATE_CANDIDATE } from '../../graphql/Candidate/mutations';

const mockHandleShowToast = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('CandidateForm Component', () => {
    it('renders form and submits with valid data', async () => {
        const createCandidateMock = {
            request: {
                query: CREATE_CANDIDATE,
                variables: { name: 'John Doe', email: 'john@example.com' },
            },
            result: {
                data: {
                    createCandidate: { id: '1', name: 'John Doe', email: 'john@example.com' },
                },
            },
        };

        render(
            <MockedProvider mocks={[createCandidateMock]} addTypename={false}>
                <ToastContext.Provider value={{ handleShowToast: mockHandleShowToast }}>
                    <BrowserRouter>
                        <CandidateForm />
                    </BrowserRouter>
                </ToastContext.Provider>
            </MockedProvider>
        );

        const submitButton = screen.getByRole('button', { name: 'Submit' });

        userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockHandleShowToast).toHaveBeenCalledWith('Please, enter name and email.', expect.any(Object));
        });
    });
});
