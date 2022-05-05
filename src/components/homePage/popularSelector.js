import React from "react";
import Nav from "react-bootstrap/Nav";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

const SelectorPresentation = (props) => {
    return (
        <div>
            <h3>What's popular</h3>
            <Nav
                fill
                variant="tabs"
                defaultActiveKey="Movies"
                onSelect={(eventKey) => props.selector[eventKey]()}
            >
                <Nav.Item>
                    <Nav.Link eventKey="Movies">Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="TV">TV</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default SelectorPresentation;
