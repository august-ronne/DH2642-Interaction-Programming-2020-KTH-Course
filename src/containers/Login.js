import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import {
    addToWatchMovieToDb,
    addRatedMovieToDb,
    removeRatedMovie,
    getMovie,
    getCredits,
    removeToWatchMovie,
    signUp,
    signIn,
} from "../actions";
import MovieDetailsPresentation from "../components/MovieDetails/MovieDetailsPresentation";
import SpinnerAnimation from "../components/Spinner";
import { firestoreConnect } from "react-redux-firebase";

const MovieDetails = () => {
    const dispatch = useDispatch();

    const [addClick, setAddClick] = useState(false);

    // for page refresh
    const { slug } = useParams();
    useEffect(() => {
        dispatch(getMovie(slug));
        dispatch(getCredits(slug));
    }, [slug]);

    const [authStatus, movie, credits, loading, error] = useSelector(
        (state) => {
 
            return [
                state.firebase.profile,
                state.search.currentMovie,
                state.search.credits,
                state.search.loading,
                state.search.error,
            ];
        }
    );

    const initialState = {
        alreadyAdded: false,
        alreadyRated: false,
        userRating: null,
    };
    const [userActions, setUserActions] = useState(initialState);

    useEffect(() => {
        if (authStatus.isLoaded && !authStatus.isEmpty && movie) {

            if (authStatus.to_watch_movies.indexOf(movie.id) > -1) {
                setUserActions({
                    ...userActions,
                    alreadyAdded: true,
                    alreadyRated: false,
                });

            } else if (movie.id in authStatus.rated_movies) {
                setUserActions({
                    ...userActions,
                    alreadyAdded: false,
                    alreadyRated: true,
                    userRating: authStatus.rated_movies[movie.id],
                });
            } else {
                setUserActions(initialState);
            }
        }
    }, [authStatus.rated_movies, authStatus.to_watch_movies, movie]);

    const addMovie = () => {
        dispatch(addToWatchMovieToDb(movie));
        if (userActions.alreadyRated) {
            dispatch(removeRatedMovie(movie));
        }
        setAddClick(!addClick);
    };

    const rateMovie = (rating) => {
        dispatch(addRatedMovieToDb(rating, movie));
        if (userActions.alreadyAdded) {
            dispatch(removeToWatchMovie(movie));
        }
        setAddClick(!addClick);
    };

    const createAccount = (event, email, password) => {
        event.preventDefault();
        dispatch(signUp({ email, password }));
    };

    const logIn = (event, email, password) => {
        event.preventDefault();

        dispatch(signIn(email, password));
    };

    return error != null ? (
        <Redirect to="/404"></Redirect>
    ) : movie === null || loading ? (
        <SpinnerAnimation />
    ) : (
        <MovieDetailsPresentation
            authStatus={authStatus}
            movie={movie}
            credits={credits}
            addMovie={addMovie}
            rateMovie={rateMovie}
            userActions={userActions}
            createAccount={createAccount}
            logIn={logIn}
        />
    );
};

export default firestoreConnect([{ collection: "to_watch_movies" }])(
    MovieDetails
);
