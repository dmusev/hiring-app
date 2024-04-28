import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CANDIDATE } from '../../graphql/Candidate/mutations';
import './Candidate.css';

// interface Candidate {
//     id: any;
//     name: string;
//     email: string;
// }

// interface CandidatesData {
//     candidates: Candidate[];
// }

export default function CandidateForm() {
    const [name, setTitle] = useState('');
    const [email, setStatus] = useState('');
    const [createCandidate, { data, loading, error }] = useMutation(CREATE_CANDIDATE);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !email) {
            // TODO: add toast message
            console.error('Candidate ID is required');
            return;
        }
        createCandidate({ variables: { name, email } });
    };

    if (loading) return <p>Loading...</p>;
    // TODO: Add proper error handling, with toast messages 
    if (error) return <p>Error :(</p>;
    // TODO: Add proper success handling, with toast messages 
    if (data) return <p>Candidate Created!</p>;

    return (
        <form onSubmit={handleSubmit} className="justify-content-center align-items-center form-container">
            <h1>Create New Candidate</h1>
            <div className="form-group" >
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setTitle(e.target.value)}
                    className="form-control"
                />
            </div >
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={e => setStatus(e.target.value)}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form >
    );
};
