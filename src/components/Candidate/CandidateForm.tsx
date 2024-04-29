import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Spinner, Container } from 'react-bootstrap';
import { CREATE_CANDIDATE } from '../../graphql/Candidate/mutations';
import ToastContext from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/utils'; // Import the utility function

import './Candidate.css';

export default function CandidateForm() {
    const [name, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const { handleShowToast } = useContext(ToastContext);
    const [createCandidate, { data, loading, error }] = useMutation(CREATE_CANDIDATE);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(validateEmail(newEmail));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !email) {
            handleShowToast(
                'Please, enter name and email.',
                {
                    autohide: true,
                    bg: 'danger',
                }
            );
            return;
        }

        if (!emailValid) {
            handleShowToast(
                'Please, enter a valid email.',
                {
                    autohide: true,
                    bg: 'danger',
                }
            );
            return;
        }

        createCandidate({ variables: { name, email } });
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="grow" />
            </Container>
        );
    }

    if (error) {
        handleShowToast(
            'Something went wrong while creating candidate.',
            {
                autohide: true,
                bg: 'danger',
            }
        );
    };

    if (data) {
        handleShowToast(
            'Successfully created a candidate.',
            {
                autohide: true,
                bg: 'success',
            }
        );
        navigate('/candidates'); // Redirects to the candidates list page
    };

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
                    onChange={handleEmailChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form >
    );
};
