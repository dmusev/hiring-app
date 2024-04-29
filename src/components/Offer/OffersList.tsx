import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_OFFERS } from '../../graphql/Offer/queries';
import { Table, Spinner, Container } from 'react-bootstrap';
import ToastContext from '../../context/ToastContext';

export default function OffersList() {
    const { loading, error, data } = useQuery(GET_OFFERS);
    const { handleShowToast } = useContext(ToastContext);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="grow" />
            </Container>
        );
    }

    if (error) {
        console.error("An error occurred:", error.message);

        handleShowToast(
            'Error occured while fetching offers.',
            {
                autohide: true,
                bg: 'danger',
            }
        );
    }

    // Check if there are no candidates and render temporary screen message
    if (!data || !data.offers || data.offers.length === 0) {
        return (
            <Container className="text-center mt-5">
                <h2>No Offers Found</h2>
                <p>No data is available at the moment. Please check back later.</p>
            </Container>
        );
    }


    return (
        <div>
            <h2>Offers List</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Salary</th>
                        <th>Candidate</th>
                    </tr>
                </thead>
                <tbody>
                    {data.offers.map(({ id, title, status, salary, candidate }: any, index: number) => (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td>{title}</td>
                            <td>{status}</td>
                            <td>${salary}</td>
                            <td>${candidate.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
