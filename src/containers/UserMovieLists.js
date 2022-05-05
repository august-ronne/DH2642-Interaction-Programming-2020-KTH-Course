/* 
View model for both 'to watch list' & 'rated list'
*/

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { firestoreConnect } from "react-redux-firebase";

import MoviesPresentation from "../components/MoviesPresentation";
import MovieListSidebarPresentation from "../components/userPage/MovieListSidebarPresentation";
import tmdbLogo from "../images/tmdb-logo.png";
import {
    getUsersToWatchList,
    getUsersRatedList,
    removeRatedMovie,
    removeToWatchMovie,
    addRatedMovieToDb,
} from "../actions/movieListsActions";
import { viewMovieCreator } from "../actions";

const WatchList = () => {
    const dispatch = useDispatch();

    const [profile, movies, loading] = useSelector((state) => {
        return [
            state.firebase.profile,
            state.userMovieLists.movies,
            state.userMovieLists.loading,
        ];
    });

    // for refreshing page
    useEffect(() => {
        if (profile.isLoaded && !profile.isEmpty) {
            if (window.location.hash == "#rated") {
                setSelected("rated");
                dispatch(getUsersRatedList());
            } else {
                setSelected("toWatch");
                dispatch(getUsersToWatchList());
            }
        }
    }, [profile.isLoaded]);

    const [isRateList, setIsRateList] = useState(false);

    // if (!profile.uid) {
    //     return <Redirect to='/'/>
    // }
    const [selected, setSelected] = useState("toWatch");
    useEffect(() => {
        window.addEventListener("hashchange", (e) => {
            if (window.location.hash === "#to-watch") {
                setSelected("toWatch");
                dispatch(getUsersToWatchList());
            }
            if (window.location.hash === "#rated") {
                setSelected("rated");

                dispatch(getUsersRatedList());
            }
        });
    }, [window.location.hash]);

    const selector = {
        toWatch: () => {
            dispatch(getUsersToWatchList());
            window.location.hash = "to-watch";
        },
        rated: () => {
            dispatch(getUsersRatedList());
            window.location.hash = "rated";
        },
    };

    const removeSelector = {
        true: (movie) => {
            dispatch(removeRatedMovie(movie));
            dispatch(getUsersRatedList(profile.uid));
        },

        false: (movie) => {
            dispatch(removeToWatchMovie(movie));
            dispatch(getUsersToWatchList(profile.uid));
        },
    };

    const rateMovie = (rating, movie) => {
        dispatch(addRatedMovieToDb(rating, movie));
        if (selected == "toWatch") {
            dispatch(removeToWatchMovie(movie));
            dispatch(getUsersToWatchList(profile.uid));
        } else {
            dispatch(getUsersRatedList(profile.uid));
        }
    };

    const viewMovie = viewMovieCreator(dispatch);
    return (
        <Container>
            <Row className="justify-content-md-center mb-2">
                <Container className="tmdb-info-homepage mt-4 lead" fluid>
                    Movie information and images fetched using{" "}
                    <a href="https://www.themoviedb.org/">
                        <img src={tmdbLogo} alt="TMDb"></img>
                    </a>
                </Container>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={3} className="mt-3">
                    <MovieListSidebarPresentation
                        selected={selected}
                        selector={selector}
                        setIsRateList={setIsRateList}
                    />
                </Col>
                <Col className="user-list">
                    <MoviesPresentation
                        cardClass="user-list-card"
                        movies={movies}
                        viewMovie={viewMovie}
                        isRateList={isRateList}
                        removeSelector={removeSelector}
                        rateMovie={rateMovie}
                        loading={loading}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default firestoreConnect([{ collection: "users" }])(WatchList);
