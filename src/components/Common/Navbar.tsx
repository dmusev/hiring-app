// src/components/Sidebar.tsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand>Let's hire!</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Candidates" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/candidate/create">
                                Add Candidate
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/candidates">
                                View Candidates
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Offers" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/offer/create">
                                Submit Offer
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/offers">
                                View Offers
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            View My Offers
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

