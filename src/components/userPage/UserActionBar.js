import React, { useRef, useState } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";
import Rating from "react-rating";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ActionBar = ({ rateMovie, userRating, removeFromList }) => {
    const target = useRef(null);
    const [hoverRating, setHoverRating] = useState(null);
    return (
        <div className="action-bar">
            <Container fluid>
                <Row className="align-items-end">
                    <Col sm={8}>
                        {userRating ? (
                            <p className="mb-1 ml-1">
                                Your rating: {userRating}{" "}
                            </p>
                        ) : (
                            <p className="mb-1 ml-1">Rate this movie: </p>
                        )}
                        <span>
                            <Rating
                                className="mb-3"
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                stop={10}
                                step={2}
                                fractions={2}
                                initialRating={userRating}
                                ref={target}
                                onHover={(currentHoverRating) =>
                                    setHoverRating(currentHoverRating)
                                }
                                onClick={(rating) => {
                                    setHoverRating(null);
                                    rateMovie(rating);
                                }}
                            />
                        </span>
                        {hoverRating ? (
                            <span className="rating-list mb-10 ml-1">
                                {hoverRating}/10
                            </span>
                        ) : (
                            <span></span>
                        )}
                    </Col>
                    <Col sm={4}>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                removeFromList();
                            }}
                        >
                            <MdRemoveCircleOutline
                                color="blue"
                                size="2em"
                                className="rating-list-remove-link"
                            />
                            <span> Remove</span>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ActionBar;
