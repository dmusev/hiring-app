import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import OfferForm from './OfferForm';
import { CREATE_OFFER } from '../../graphql/Offer/mutations';
import { GET_CANDIDATES } from '../../graphql/Candidate/queries';
import ToastContext from '../../context/ToastContext';

const mockHandleShowToast = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const candidatesMock = {
    request: {
        query: GET_CANDIDATES,
    },
    result: {
        data: {
            candidates: [
                { id: '1', name: 'John Doe', email: 'john@example.com' },
                { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
            ],
        },
    },
};

const createOfferMock = {
    request: {
        query: CREATE_OFFER,
        variables: {
            salary: 50000,
            title: 'Senior Developer',
            status: 'Open',
            candidateId: '1'
        },
    },
    result: {
        data: {
            createOffer: {
                id: '1',
                title: 'Senior Developer',
                status: 'Open',
                salary: 50000,
                candidateId: '1'
            },
        },
    },
};

describe('OfferForm Component', () => {
    beforeEach(() => {
        render(
            <MockedProvider mocks={[candidatesMock, createOfferMock]} addTypename={false}>
                <ToastContext.Provider value={{ handleShowToast: mockHandleShowToast }}>
                    <BrowserRouter>
                        <OfferForm />
                    </BrowserRouter>
                </ToastContext.Provider>
            </MockedProvider>
        );
    });

    it('displays an error when no candidate is selected', async () => {
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockHandleShowToast).toHaveBeenCalledWith('Please, select a candidate.', expect.any(Object));
        });
    });
});
