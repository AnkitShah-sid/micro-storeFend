import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const KitchenDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Container className="mt-5">
            <Card className="text-center">
                <Card.Header as="h5">Kitchen Dashboard</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome, Kitchen User!</Card.Title>
                    <Card.Text>
                        You have successfully logged in as a Kitchen user. You can now manage kitchen resources and operations.
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate('/kitchen/orders')}>
                        Manage Orders
                    </Button>{' '}
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default KitchenDashboard;
