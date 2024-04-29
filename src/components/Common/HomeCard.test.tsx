import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeCard from './HomeCard';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

describe('HomeCard Component', () => {
    it('renders correctly with given props', () => {
        const title = 'Total Earnings';
        const amount = '$5000';
        const Icon = FaRegMoneyBillAlt;

        render(<HomeCard title={title} amount={amount} Icon={Icon} />);

        const titleElement = screen.getByText(title.toUpperCase());
        const amountElement = screen.getByText(amount);
        const icon = screen.getByTestId('icon');

        expect(titleElement).toBeInTheDocument();
        expect(amountElement).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(titleElement).toHaveClass('mb-2 text-muted');
        expect(icon).toHaveClass('mb-1');
    });
});
