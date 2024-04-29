import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
    it('renders navbar correctly', () => {
        render(<Navbar />);

        expect(screen.getByText("Let's hire!")).toBeInTheDocument();

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');

        expect(screen.getByText('Candidates')).toBeInTheDocument();

        expect(screen.getByText('Offers')).toBeInTheDocument();

    });
});
