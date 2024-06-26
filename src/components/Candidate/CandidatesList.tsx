import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Table, Spinner, Container } from 'react-bootstrap';
import { GET_CANDIDATES } from '../../graphql/Candidate/queries';
import ToastContext from '../../context/ToastContext';

export default function CandidatesList() {
    const { loading, error, data } = useQuery(GET_CANDIDATES);
    const { handleShowToast } = useContext(ToastContext);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="grow" />
            </Container>
        );
    }

    if (error) {
        handleShowToast(
            'Error occured while fetching candidates.',
            {
                autohide: true,
                bg: 'danger',
            }
        );
    }

    // Check if there are no candidates and render temporary screen message
    if (!data || !data.candidates || data.candidates.length === 0) {
        return (
            <Container className="text-center mt-5">
                <h2>No Candidates Found</h2>
                <p>No data is available at the moment. Please check back later.</p>
            </Container>
        );
    }

    return (
        <div>
            <h2>Candidates List</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Offers Received</th>
                    </tr>
                </thead>
                <tbody>
                    {data.candidates.map(({ id, name, email, offers }: any, index: number) => (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            {/* TODO: Check why no offers returned */}
                            <td>{offers.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};