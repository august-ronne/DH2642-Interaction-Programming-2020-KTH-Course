import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

export const POSTER_PATH = "https://image.tmdb.org/t/p/w220_and_h330_face";
const NO_PICTURE_PATH =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

const CastPresentation = (props) => {
    const getImgUrl = (path) => {
        if (path) {
            return POSTER_PATH + path;
        }
        return NO_PICTURE_PATH;
    };
    return (
        <CardDeck>
            {props.actors.map((actor) => (
                <Card
                    style={{ width: "6rem" }}
                    key={actor.id}
                    className={props.cardClass + " mt-3"}
                >
                    {/* <Link to={`/person/${actor.id}`}> */}
                    <Card.Img
                        variant="top"
                        src={getImgUrl(actor.profile_path)}
                        // onClick={() => props.viewMovie(actor.id)}
                        className={props.cardClass + "-img"}
                    />
                    {/* </Link> */}
                    <Card.Body>
                        <Card.Title>{`${actor.name} `}</Card.Title>
                        <Card.Text className="text-muted">
                            {actor.character}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </CardDeck>
    );
};

export default CastPresentation;
