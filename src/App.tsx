import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateOffer from './pages/CreateOffer';
import CreateCandidate from './pages/CreateCandidate';
import ViewOffer from './pages/ViewOffer';
import Navigation from './components/Common/Navbar';
import Offers from './components/Offer/OffersList';
import Candidates from './components/Candidate/CandidatesList';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate/create" element={<CreateCandidate />} />
        <Route path="/candidate/:id" element={<Candidates />} />
        <Route path="/offer/create" element={<CreateOffer />} />
        <Route path="/offer/:id" element={<ViewOffer />} />
      </Routes>
    </Router>
  );
};