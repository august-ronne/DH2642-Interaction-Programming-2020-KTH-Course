import axios from "axios";
import React, { useState } from "react";
import {
    SEARCH_REQUEST,
    SEARCH_MOVIES_SUCCESS,
    SEARCH_GENRES_SUCCESS,
    GET_MOVIE_SUCCESS,
    GET_CREDITS_SUCCESS,
    PROMISE_FAILURE,
    GET_POPULAR_SUCCESS,
    GET_UPCOMING_SUCCESS,
} from "./actionTypes";
import API_KEY from "../config/configAPI";
export const BASE_URL = "https://api.themoviedb.org/3";

export const searchRequest = () => {
    return {
        type: SEARCH_REQUEST,
    };
};

function setAction(actionType, value) {
    return {
        type: actionType,
        payload: value,
    };
}

function promiseActions(url, actionType, key = null) {
    return (dispatch) => {
        dispatch(searchRequest());
        axios
            .get(url)
            .then((response) => {
                const value = response.data[key] || response.data;
                dispatch(setAction(actionType, value));
            })
            .catch((error) => {
                const errorMsg = error.message;
                dispatch(setAction(PROMISE_FAILURE, errorMsg));
            });
    };
}

// export const searchMovies = () => {
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}=Jack+Reacher`;
//     return promiseActions(url, SEARCH_MOVIES_SUCCESS, 'results')
// };

export const discoverMovies = (
    startYear,
    endYear,
    genreID,
    sortMethod,
    page = 1
) => {
    var url = "";
    if (startYear && !endYear) {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortMethod}&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=${startYear}&with_genres=${genreID}`;
    } else if (!startYear && endYear) {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortMethod}&include_adult=false&include_video=false&page=${page}&primary_release_date.lte=${endYear}&with_genres=${genreID}`;
    } else if (!startYear && !endYear && !genreID) {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortMethod}&include_adult=false&include_video=false&page=${page}`;
    } else if (!startYear && !endYear) {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortMethod}&include_adult=false&include_video=false&page=${page}&with_genres=${genreID}`;
    } else {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortMethod}&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=${startYear}&primary_release_date.lte=${endYear}&with_genres=${genreID}`;
    }

    return promiseActions(url, SEARCH_MOVIES_SUCCESS);
};

export const multiSearch = (query, page = 1) => {
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}include_adult=false`;
    return promiseActions(url, SEARCH_MOVIES_SUCCESS);
};

export const searchGenres = () => {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return promiseActions(url, SEARCH_GENRES_SUCCESS, "genres");
};

export const getMovie = (movieID) => {
    const url = `${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=en-US`;
    return promiseActions(url, GET_MOVIE_SUCCESS);
};

// Get the cast and crew for a movie.
export const getCredits = (movieID) => {
    const url = `${BASE_URL}/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`;
    return promiseActions(url, GET_CREDITS_SUCCESS);
};

export const getLatest = () => {
    const url = `${BASE_URL}/movie/latest?api_key=${API_KEY}&language=en-US`;
    return promiseActions(url, GET_POPULAR_SUCCESS);
};

export const getPopularMovies = (page = 1) => {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=en-US`;
    return promiseActions(url, GET_POPULAR_SUCCESS);
};

export const getPopularTv = (page = 1) => {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}&language=en-US`;
    return promiseActions(url, GET_POPULAR_SUCCESS);
};

export const getUpcoming = (page = 1) => {
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}&language=en-US`;
    return promiseActions(url, GET_UPCOMING_SUCCESS);
};

//

export function usePromise(promise) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    React.useEffect(
        function () {
            setData(null);
            setError(null);
            if (promise) {
                promise
                    .then((data) => {
                        setData(data);
                    })
                    .catch((error) => setError(error));
            }
        },
        [promise]
    );
    return [data, error];
}

export const getPromise = (url, key = null) => {
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((err) => err.status_message);
};

export const viewMovieCreator = (dispatch) => {
    return (movieID) => {
        dispatch(getMovie(movieID));
        dispatch(getCredits(movieID));
    };
};
