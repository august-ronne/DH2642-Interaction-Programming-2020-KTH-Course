import React from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

const UserInstructionsPresentation = ({ authStatus }) => {
    return (
        <Container fluid="md" className="user-instructions mt-3">
            {authStatus.user ? (
                <Card className="text-center">
                    <Card.Header>
                        Welcome to MoView user <b>{authStatus.user.email}</b>!
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            If you want to discover more movies click on
                            'Discover Movies' in the menu above
                        </Card.Title>
                        <Card.Text>
                            To view your lists of movies you want to watch and
                            movies you have rated just click on the button below
                        </Card.Text>
                        <Nav.Link href="/to-watch-list">
                            <Button variant="primary">
                                Go to my movie lists
                            </Button>
                        </Nav.Link>
                    </Card.Body>
                </Card>
            ) : (
                <Card className="text-center">
                    <Card.Header>Welcome to MoView!</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            MoView helps you with finding new movies to watch.
                            To discover more movies according to your
                            preferences click on 'Discover Movies' in the menu
                            above!
                        </Card.Title>
                        <Card.Text>
                            If you also want to add movies to your personal To
                            Watch list, as well as rating them after you've
                            watched them, simply click on create an account
                            below.
                        </Card.Text>
                        <Button variant="primary">Create an Account</Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default UserInstructionsPresentation;
