import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPresentation = ({ createAccount, logIn, title }) => {
    const authError = useSelector((state) => state.auth.error);
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button
                variant="outline-secondary"
                onClick={() => setModalShow(true)}
            >
                {title}
            </Button>
            <LoginPopoutPresentation
                show={modalShow}
                onHide={() => setModalShow(false)}
                createAccount={createAccount}
                logIn={logIn}
                authError={authError}
                initTitle={title.split(" ")[0]}
            />
        </>
    );
};

const LoginPopoutPresentation = ({
    show,
    onHide,
    createAccount,
    logIn,
    authError,
    initTitle,
}) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    useEffect(() => {
        if (firstName && firstName[0] === " ") {
            authError = "FirstName must start with a letter or a number!";
        }
    }, [firstName]);

    const [title, setTitle] = useState(initTitle);
    const submitMethod = {
        Login: (e) => logIn(e, userEmail, userPassword),
        Register: (e) =>
            createAccount(e, userEmail, userPassword, firstName, lastName),
    };

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="login"
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* EMAIL */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        {title === "Register" && (
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        )}
                    </Form.Group>

                    {/* PASSWORD */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </Form.Group>

                    {title === "Register" && (
                        <>
                            {/* FIRST NAME */}
                            <Form.Group controlId="formBasic">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    placeholder="First Name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </Form.Group>

                            {/* FIRST NAME */}
                            <Form.Group controlId="formBasic">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </>
                    )}

                    {/* LOGIN OR REGISTER SWITCHER */}
                    <Form.Group controlId="formBasicCheckbox">
                        <Button
                            variant="link"
                            onClick={() =>
                                setTitle(
                                    title === "Register" ? "Login" : "Register"
                                )
                            }
                        >
                            {title === "Register" ? "Login" : "Register"}
                        </Button>
                    </Form.Group>

                    {/* CANCEL */}
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        block
                        onClick={(e) => {
                            submitMethod[title](e);
                            if (authError && typeof authError != "string") {
                                onHide();
                            }
                        }}
                    >
                        {title}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {authError ? (
                    <Form.Text className="red-text center">
                        {authError}
                    </Form.Text>
                ) : null}
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginPresentation;
