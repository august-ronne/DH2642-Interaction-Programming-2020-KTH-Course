import React from "react";
import Nav from "react-bootstrap/Nav";
import Calendar from "react-input-calendar";
import "react-input-calendar/style/index.css";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

/* FOR TOOLTIP WHEN WRITING YEAR IN CALENDAR FIELD */
function renderTooltip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Press tab after entering a year to auto-complete the date
        </Tooltip>
    );
}

const FilterPresentation = ({ sort, genres, searchParams, selector }) => {
    return (
        <Col>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey="0"
                        >
                            Sort
                        </Accordion.Toggle>
                    </Card.Header>
                </Card>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Tab.Container
                            defaultActiveKey="popularity.desc"
                            activeKey={searchParams.sortMethod}
                            onSelect={(k) => {
                                selector.setSortMethod(k);
                                // onSearch(startYear, endYear, genre, k);
                            }}
                        >
                            <Row>
                                <Col sm={9}>
                                    <Nav
                                        variant="pills"
                                        className="flex-column"
                                    >
                                        {sort.map((g) => (
                                            <Nav.Item key={g.id}>
                                                <Nav.Link eventKey={g.id}>
                                                    {g.name}
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card.Body>
                </Accordion.Collapse>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey="0"
                        >
                            Filters
                        </Accordion.Toggle>
                    </Card.Header>
                </Card>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p className="mb-2">Movies Released Later Than</p>
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 200, hide: 100 }}
                            overlay={renderTooltip}
                        >
                            <Calendar
                                placeholder="Enter a year"
                                onFocus={() => selector.setStartDate("")}
                                onChange={(date) => selector.setStartDate(date)}
                                openOnInputFocus={true}
                                closeOnSelect={true}
                                hideOnBlur={true}
                                computableFormat="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                date={searchParams.startYear}
                            />
                        </OverlayTrigger>
                        <p className="mt-3 mb-2">
                            Movies Released Earlier Than
                        </p>

                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 200, hide: 100 }}
                            overlay={renderTooltip}
                        >
                            <Calendar
                                placeholder="Enter a year"
                                onFocus={() => selector.setEndDate("")}
                                onChange={(date) => selector.setEndDate(date)}
                                openOnInputFocus={true}
                                closeOnSelect={true}
                                hideOnBlur={true}
                                computableFormat="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                date={searchParams.endYear}
                            />
                        </OverlayTrigger>
                        <p className="mt-3 mb-2">Happy with the timespan?</p>
                        <Button
                            onClick={() =>
                                selector.setDateInterval(
                                    !searchParams.intervalChange
                                )
                            }
                        >
                            Yes
                        </Button>
                        <Card body className="mt-3">
                            <h5 className="text-center">Genres</h5>
                            <Tab.Container
                                defaultActiveKey="popularity.desc"
                                activeKey={searchParams.genreID}
                                onSelect={(k) => {
                                    selector.setGenre(k);
                                    // onSearch(startYear, endYear, k, sortMethod);
                                }}
                            >
                                <Row>
                                    <Col sm={13}>
                                        <Nav
                                            variant="pills"
                                            defaultActiveKey="Action"
                                        >
                                            {genres.map((g) => (
                                                <Nav.Item key={g.id}>
                                                    <Nav.Link eventKey={g.id}>
                                                        {g.name}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            ))}
                                        </Nav>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Card>
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </Col>
    );
};

const SearchFormPresentation = (props) => {
    return (
        <div>
            <h4 className="p-3">
                Use the filter options below to find more movies
            </h4>
            <FilterPresentation
                sort={props.sort}
                genres={props.genres}
                searchParams={props.searchParams}
                selector={props.selector}
            />
        </div>
    );
};

export default SearchFormPresentation;
