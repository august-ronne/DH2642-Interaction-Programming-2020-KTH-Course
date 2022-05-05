import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Alert from "react-bootstrap/Alert";
import ActionBar from "./userPage/UserActionBar";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export const POSTER_PATH = "https://image.tmdb.org/t/p/w220_and_h330_face";
export const NO_PICTURE_URL =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

export const getImgUrl = (path) => {
    if (path) {
        return POSTER_PATH + path;
    }
    return NO_PICTURE_URL;
};

function renderTooltip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Click on me to read more about the movie, and maybe add me to your
            To Watch List
        </Tooltip>
    );
}

function AlertDismissible({ show, setShow }) {
    if (show) {
        setTimeout(() => setShow(false), 6000);
        return (
            <Alert
                variant="success"
                onClose={() => setShow(false)}
                dismissible
                fade
                className="movie-list"
            >
                <Alert.Heading>Success</Alert.Heading>
                <p>Your rating has been saved! That movie is now in your <b>Movies I have Rated</b> list</p>
            </Alert>
        );
    }
    return <span></span>;
}

const MoviesPresentation = (props) => {
    const [show, setShow] = useState(false);
    if (!props.loading && props.movies.length < 1) {
        return <h3>Oops! Nothing found.</h3>;
    }
    return (
        <CardDeck>
            <AlertDismissible show={show} setShow={setShow} />
            {props.movies.map((movie) => (
                <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className={props.cardClass + " movie-card-link"}
                    target="_blank"
                >
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 200, hide: 100 }}
                        overlay={renderTooltip}
                    >
                        <Card
                            style={{ width: "15rem" }}
                            key={movie.id}
                            className={
                                props.cardClass + " movie-results-card mt-3"
                            }
                            onClick={() => props.viewMovie(movie.id)}
                        >
                            <div>
                                <Card.Img
                                    variant="top"
                                    src={getImgUrl(movie.poster_path)}
                                    className={props.cardClass + "-img"}
                                />
                            </div>

                            <Card.Body>
                                <Card.Title>
                                    {`${
                                        movie.original_title ||
                                        movie.original_name
                                    } `}
                                    <br />
                                    <div className="movie-card-rating-text mt-3">
                                        Average Rating:
                                    </div>
                                    <span> </span>
                                    <h5 className="vote-average mt-3">
                                        {movie.vote_average}
                                    </h5>
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    {movie.release_date || movie.first_air_date}
                                </Card.Text>
                                {props.isRateList != null && (
                                    <>
                                        <ActionBar
                                            userRating={movie.userScore}
                                            rateMovie={(rating) => {
                                                props.rateMovie(rating, movie);
                                                setShow(true);
                                            }}
                                            removeFromList={() =>
                                                props.removeSelector[
                                                    props.isRateList
                                                ](movie)
                                            }
                                        />
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </OverlayTrigger>
                </Link>
            ))}
        </CardDeck>
    );
};

export default MoviesPresentation;
