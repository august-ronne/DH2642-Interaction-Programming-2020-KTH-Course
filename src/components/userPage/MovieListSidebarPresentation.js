import Nav from "react-bootstrap/Nav";
import React from "react";

const MovieListSidebarPresentation = (props) => {
    return (
        <Nav
            defaultActiveKey={props.selected}
            activeKey={props.selected}
            variant="pills"
            className="flex-column"
            onSelect={(eventKey) => {
                props.selector[eventKey]();
                props.setIsRateList(eventKey === "rated");
            }}
        >
            <Nav.Link eventKey="toWatch">Movies I Want to Watch</Nav.Link>
            <Nav.Link eventKey="rated">Movies I Have Rated</Nav.Link>
        </Nav>
    );
};

export default MovieListSidebarPresentation;
