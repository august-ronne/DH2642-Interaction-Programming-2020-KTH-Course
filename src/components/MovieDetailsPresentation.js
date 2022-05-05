import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ShowMoreText from "react-show-more-text";
import Rating from "react-rating";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdPlaylistAdd, MdPlayCircleFilled } from "react-icons/md";

import { POSTER_PATH } from "./MoviesPresentation";

function renderTooltip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            You need to create an account to be able to add movies to your
            personal To Watch List
        </Tooltip>
    );
}

const MovieDetailsPresentation = ({
    authStatus,
    movie,
    credits,
    addMovie,
    rateMovie,
    alreadyAdded,
    alreadyRated,
    userRating,
}) => {
    const [lockRatingTool, setLockRatingTool] = useState(true);
    return (
        <div>
            <Container className="mt-3">
                <Row>
                    <Col sm={4}>
                        {authStatus.user ? (
                            <div>
                                {alreadyAdded ? (
                                    <div>
                                        <Alert variant="success">
                                            <h5>
                                                This Movie is in your To Watch
                                                List
                                            </h5>
                                        </Alert>
                                    </div>
                                ) : (
                                    <div>
                                        <Card.Body>
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                block
                                                onClick={addMovie}
                                            >
                                                Add Movie to your To Watch List
                                            </Button>
                                        </Card.Body>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 200, hide: 100 }}
                                    overlay={renderTooltip}
                                >
                                    <Card.Body>
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            block
                                            disabled
                                        >
                                            Add Movie to your To Watch List
                                        </Button>
                                    </Card.Body>
                                </OverlayTrigger>
                            </div>
                        )}
                        <Card.Img
                            variant="top"
                            src={POSTER_PATH + movie.poster_path}
                        />
                    </Col>
                    <Col sm={8}>
                        <h1>{`${
                            movie.original_title
                        }(${movie.release_date.slice(0, 4)})`}</h1>
                        <div>
                            <span>{movie.release_date}</span>(
                            <span>
                                {movie.production_countries.map(
                                    (country) => country.iso_3166_1
                                )}
                            </span>
                            )<b> · </b>
                            <span>{movie.genres.map((g) => `${g.name}/`)}</span>
                            <b> · </b>
                            <span>
                                {movie.spoken_languages.map(
                                    (g) => `${g.name}/`
                                )}
                            </span>
                            <b> · </b>
                            <span>{movie.runtime} mins</span>
                        </div>

                        <div className="mt-3 mb-3">
                            <Card>
                                <Card.Body>
                                    {authStatus.user ? (
                                        <div>
                                            {alreadyRated ? (
                                                <div>
                                                    <Card.Title>
                                                        Your Rating:{" "}
                                                        {userRating}/10
                                                    </Card.Title>
                                                    <Rating
                                                        className="mt-2 mb-3"
                                                        emptySymbol="fa fa-star-o fa-2x"
                                                        fullSymbol="fa fa-star fa-2x"
                                                        start={1}
                                                        stop={10}
                                                        fractions={1}
                                                        initialRating={
                                                            userRating
                                                        }
                                                        readonly={
                                                            lockRatingTool
                                                        }
                                                        onChange={(rating) => {
                                                            setLockRatingTool(
                                                                true
                                                            );
                                                            rateMovie(rating);
                                                        }}
                                                    />
                                                    <Card.Text>
                                                        Do you want to change
                                                        your rating of this
                                                        movie? If so just click
                                                        below to unlock the
                                                        rating stars.
                                                    </Card.Text>
                                                    <Button
                                                        variant="outline-primary"
                                                        onClick={() =>
                                                            setLockRatingTool(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Change My Rating
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Card.Title>
                                                        You have not rated this
                                                        movie yet! Rate the
                                                        movie from 1 to 10 by
                                                        using the rating stars
                                                        below
                                                    </Card.Title>
                                                    <Rating
                                                        className="mt-2 mb-3"
                                                        emptySymbol="fa fa-star-o fa-2x"
                                                        fullSymbol="fa fa-star fa-2x"
                                                        start={1}
                                                        stop={10}
                                                        initialRating={0}
                                                        onChange={(rating) =>
                                                            rateMovie(rating)
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <Card.Title>
                                                Want to be able to rate this
                                                movie?
                                            </Card.Title>
                                            <Rating
                                                className="mt-2 mb-3"
                                                emptySymbol="fa fa-star-o fa-2x"
                                                fullSymbol="fa fa-star fa-2x"
                                                start={1}
                                                stop={10}
                                                initialRating={0}
                                                fractions={1}
                                                readonly={true}
                                            />
                                            <Card.Text>
                                                To do so you need to create an
                                                account. It is very simple, just
                                                click on 'Create an Account'
                                                below!
                                            </Card.Text>
                                            <Button variant="primary">
                                                Create an Account
                                            </Button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>

                        <i>{movie.tagline}</i>
                        <h3>Overview</h3>
                        <ShowMoreText
                            lines={3}
                            more="more"
                            less="less"
                            // width={680}
                        >
                            {movie.overview}
                        </ShowMoreText>
                        <ul>
                            {credits.id &&
                                credits.crew
                                    .filter(
                                        (crew) =>
                                            crew.job === "Director" ||
                                            crew.job === "Editor"
                                    )
                                    .map((crew) => (
                                        <li key={crew.name}>
                                            <p>
                                                <a>{crew.name}</a>
                                            </p>
                                            <p>{crew.job}</p>
                                        </li>
                                    ))}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col sm></Col>
                    <Col sm>sm=true</Col>
                    <Col sm>sm=true</Col>
                </Row>
            </Container>
        </div>
    );
};

export default MovieDetailsPresentation;
