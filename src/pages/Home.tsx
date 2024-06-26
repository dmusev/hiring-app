import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import HomeCard from '../components/Common/HomeCard';
import { BsPersonRolodex, BsFillArchiveFill } from 'react-icons/bs';
import { GET_TOTAL_CANDIDATES } from '../graphql/Candidate/queries';
import { GET_TOTAL_OFFERS } from '../graphql/Offer/queries';
import ToastContext from '../context/ToastContext';

import './Home.css';

export default function Home() {
    const { loading: candidatesLoading, error: candidatesError, data: candidatesData } = useQuery(GET_TOTAL_CANDIDATES);
    const { loading: offersLoading, error: offersError, data: offersData } = useQuery(GET_TOTAL_OFFERS);
    const { handleShowToast } = useContext(ToastContext);

    if (candidatesLoading || offersLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="grow" />
            </Container>
        );
    }

    if (candidatesError || offersError) {
        handleShowToast(
            'Something went wrong while fetching data.',
            {
                autohide: true,
                bg: 'danger',
            }
        );
    };

    return (
        <Container fluid className="home-container">
            <Row>
                <Col xs={12} md={6}>
                    <HomeCard
                        title="Candidates (Total)"
                        amount={candidatesData?.totalCandidates}
                        Icon={BsPersonRolodex}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <HomeCard
                        title="Offers (Total)"
                        amount={offersData?.totalOffers}
                        Icon={BsFillArchiveFill}
                    />
                </Col>
            </Row>
        </Container>
    );
};