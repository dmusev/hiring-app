import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_OFFERS } from '../../graphql/Offer/queries';
import { Table, Spinner, Container } from 'react-bootstrap';

const OffersList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_OFFERS);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="grow" />
            </Container>
        );
    }

    if (error) return <p>Error :(</p>;

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

export default OffersList;
