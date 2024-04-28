import React, { useState, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_OFFER } from '../../graphql/Offer/mutations';
import { GET_CANDIDATES } from '../../graphql/Candidate/queries';
import { Spinner, Container } from 'react-bootstrap';
import ToastContext from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

interface Candidate {
    id: any;
    name: string;
    email: string;
}

interface CandidatesData {
    candidates: Candidate[];
}

export default function OfferForm() {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [salary, setSalary] = useState(0);
    const [candidateId, setSelectedCandidate] = useState('');
    const [createOffer, { data, loading, error: offersError }] = useMutation(CREATE_OFFER);
    const { data: candidatesData, error: candidatesError } = useQuery<CandidatesData>(GET_CANDIDATES);
    const { handleShowToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!candidateId) {
            handleShowToast(
                'Please, select a candidate.',
                {
                    autohide: true,
                    bg: 'danger',
                }
            );
            return;
        }
        createOffer({ variables: { salary, title, status, candidateId } });
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="grow" />
            </Container>
        );
    }

    if (offersError || candidatesError) {
        handleShowToast(
            offersError ? 'Something went wrong while creating offer..' : 'Something went wrong while fetching candidates.',
            {
                autohide: true,
                bg: 'danger',
            }
        );
    }

    if (data) {
        handleShowToast(
            'Successfully created a candidate.',
            {
                autohide: true,
                bg: 'success',
            }
        );
        navigate('/offers'); // Redirects to the offers page
    };


    return (
        <form onSubmit={handleSubmit} className="justify-content-center align-items-center form-container">
            <h1>Create New Offer</h1>
            <div className="form-group" >
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="form-control"
                />
            </div >
            <div className="form-group">
                <label>Status:</label>
                <input
                    type="text"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Salary ($):</label>
                <input
                    type="number"
                    value={salary}
                    onChange={e => setSalary(parseFloat(e.target.value))}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Candidate:</label>
                <select
                    className="form-control"
                    value={candidateId.toString()}
                    onChange={e => setSelectedCandidate(e.target.value)}
                >
                    <option value="">Select a Candidate</option>
                    {candidatesData && candidatesData.candidates.map((candidate: Candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                            {candidate.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form >
    );
};
