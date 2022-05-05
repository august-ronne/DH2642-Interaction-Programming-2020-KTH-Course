import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Container from "react-bootstrap/Container";

import LoginPresentation from "./auth/LoginPresentation";

const getPopover = (user, logOut) => {
    return (
        <Popover id="popover-basic">
            <Dropdown.Menu show>
                <Dropdown.Item eventKey="1" disabled>
                    {user.email}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2" href="/user-list#to-watch">
                    Watchlist
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" href="/user-list#rated">
                    Ratings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4" onClick={(e) => logOut(e)}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
    );
};

const NavbarPresentation = ({ authStatus, logIn, logOut, createAccount }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid="md">
                <Navbar.Brand href="/" className="nav-moview">
                    MoView
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">
                        <Nav.Link href="/movie" className="nav-discover">
                            Discover More Movies
                        </Nav.Link>
                    </Nav>
                    {authStatus.uid ? (
                        <OverlayTrigger
                            trigger="click"
                            placement="bottom"
                            overlay={getPopover(authStatus, logOut)}
                        >
                            <div className="avatar-circle">
                                <span className="initials">
                                    {authStatus.initials}
                                </span>
                                <Button className="invisible"></Button>
                            </div>
                        </OverlayTrigger>
                    ) : (
                        <LoginPresentation
                            createAccount={createAccount}
                            logIn={logIn}
                            title="Login"
                        />
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarPresentation;
