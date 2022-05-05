import React from "react";
import Nav from "react-bootstrap/Nav";
import "react-input-calendar/style/index.css";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MultiSearchSidebar = ({ filters, setCategory }) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Search Results
                    </Accordion.Toggle>
                </Card.Header>
            </Card>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Tab.Container
                        // defaultActiveKey="popularity.desc"
                        // activeKey={searchParams.sortMethod}
                        onSelect={(k) => {
                            setCategory(k);
                        }}
                    >
                        <Row>
                            <Col sm={9}>
                                <Nav variant="pills" className="flex-column">
                                    {filters.map((c) => (
                                        <Nav.Item>
                                            <Nav.Link eventKey={c.id}>
                                                {c.name}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    );
};

export default MultiSearchSidebar;
