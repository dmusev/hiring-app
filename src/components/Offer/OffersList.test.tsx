import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import OffersList from './OffersList';
import { GET_OFFERS } from '../../graphql/Offer/queries';

describe('OffersList Component', () => {
    it('renders no offers found', async () => {
        const mocks = [
            {
                request: {
                    query: GET_OFFERS,
                },
                result: {
                    data: {
                        offers: [],
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OffersList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('No Offers Found')).toBeInTheDocument();
        });
    });

    it('renders offers', async () => {
        const mocks = [
            {
                request: {
                    query: GET_OFFERS,
                },
                result: {
                    data: {
                        offers: [
                            {
                                id: '1',
                                title: 'Software Engineer',
                                status: 'Active',
                                salary: 100000,
                                candidate: {
                                    id: '1',
                                    name: 'John Doe',
                                }
                            }
                        ],
                    },
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OffersList />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Offers List')).toBeInTheDocument();
        });
    })
});
