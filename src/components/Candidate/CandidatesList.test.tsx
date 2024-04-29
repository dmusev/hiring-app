import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CandidatesList from './CandidatesList';
import { GET_CANDIDATES } from '../../graphql/Candidate/queries';

const mocks = [
    {
        request: {
            query: GET_CANDIDATES,
        },
        result: {
            data: {
                candidates: [],
            },
        },
    },
];

describe('CandidatesList Component', () => {
    it('renders no candidates found', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <CandidatesList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('No Candidates Found')).toBeInTheDocument();
        });
    })
});
