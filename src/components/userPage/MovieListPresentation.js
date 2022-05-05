import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import ActionBar from "./userPage/userActionBar";

export const POSTER_PATH = "https://image.tmdb.org/t/p/w220_and_h330_face";

const MovieListPresentation = (props) => {
    return (
            <CardDeck>
                {props.movies.map((movie) => (
                    <Card
                        style={{ width: "15rem" }}
                        key={movie.id}
                        className={props.cardClass + " movie-results-card mt-3"}
                    >
                        <Link to={`/movie/${movie.id}`}>
                            <Card.Img
                                variant="top"
                                src={POSTER_PATH + movie.poster_path}
                                onClick={() => props.viewMovie(movie.id)}
                                className={props.cardClass + "-img"}
                            />
                        </Link>
                        <Card.Body>
                            <Card.Title>
                                {`${
                                    movie.original_title || movie.original_name
                                } `}
                                <h5 className="vote-average">
                                    {movie.vote_average}
                                </h5>
                            </Card.Title>
                            <Card.Text className="text-muted">
                                {movie.release_date || movie.first_air_date}
                            </Card.Text>
                            {props.isRateList != null && (
                                <ActionBar
                                    userRating={movie.userScore}
                                    removeFromList={() =>
                                        props.removeSelector[props.isRateList](
                                            movie
                                        )
                                    }
                                    rateMovie={props.rateMovie}
                                />
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </CardDeck>
    );
};

export default MovieListPresentation;
