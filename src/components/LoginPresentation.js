import React, { useState } from "react";
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
    const [title, setTitle] = useState(initTitle);
    const submitMethod = {
        Login: logIn,
        Register: createAccount,
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

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </Form.Group>
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
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        block
                        onClick={(e) => {
                            submitMethod[title](e, userEmail, userPassword);
                            if (typeof authError != "string") {
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
