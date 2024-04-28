import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_OFFER } from '../../graphql/Offer/mutations';
import { GET_CANDIDATES } from '../../graphql/Candidate/queries';
import './Offer.css';

interface Candidate {
    id: any;
    name: string;
    email: string;
}

interface CandidatesData {
    candidates: Candidate[];
}

const OfferForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [salary, setSalary] = useState(0);
    const [candidateId, setSelectedCandidate] = useState('');
    const [createOffer, { data, loading, error }] = useMutation(CREATE_OFFER);
    const { data: candidatesData, error: candidatesError } = useQuery<CandidatesData>(GET_CANDIDATES);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!candidateId) {
            // TODO: add toast message
            console.error('Candidate ID is required');
            return;
        }
        createOffer({ variables: { salary, title, status, candidateId } });
    };

    if (loading) return <p>Loading...</p>;
    // TODO: Add proper error handling, with toast messages 
    if (error) return <p>Error :(</p>;
    // TODO: Add proper success handling, with toast messages 
    if (data) return <p>Offer Created!</p>;

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
            {/* TODO: Add no candidate selected error handling */}
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

export default OfferForm;
