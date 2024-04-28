import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_OFFER } from '../../graphql/Offer/queries';

const OfferView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery(GET_OFFER, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h2>Offer Details</h2>
            <p><strong>Title:</strong> {data.offer.title}</p>
            <p><strong>Status:</strong> {data.offer.status}</p>
            <p><strong>Salary:</strong> ${data.offer.salary}</p>
        </div>
    );
};

export default OfferView;
