import React from 'react';
import { Card } from 'react-bootstrap';
import { IconType } from 'react-icons';

interface HomeCardProps {
    title: string;
    amount: string;
    Icon: IconType;
}

export default function HomeCard({ title, amount, Icon }: HomeCardProps) {
    return (
        <Card className="text-center earnings-card" >
            <Card.Body>
                <Card.Title className="mb-2 text-muted">{title.toUpperCase()}</Card.Title>
                <Card.Text>
                    <Icon className="mb-1" />
                    {amount}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};