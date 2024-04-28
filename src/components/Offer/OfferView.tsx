import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_OFFER } from '../../graphql/Offer/queries';
import { Spinner, Container } from 'react-bootstrap';
import ToastContext from '../../context/ToastContext';

export default function OfferView() {
    const { id } = useParams<{ id: string }>();
    const { handleShowToast } = useContext(ToastContext);

    const { loading, error, data } = useQuery(GET_OFFER, {
        variables: { id },
    });

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="grow" />
            </Container>
        );
    }

    if (error) {
        handleShowToast(
            'Error occured while fetching offers.',
            {
                autohide: true,
                bg: 'danger',
            }
        );
    }

    return (
        <div>
            <h2>Offer Details</h2>
            <p><strong>Title:</strong> {data.offer.title}</p>
            <p><strong>Status:</strong> {data.offer.status}</p>
            <p><strong>Salary:</strong> ${data.offer.salary}</p>
        </div>
    );
};
