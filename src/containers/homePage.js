import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    signUp,
    getPopularMovies,
    getPopularTv,
    multiSearch,
    usePromise,
    getPromise,
    viewMovieCreator,
} from "../actions";
import HomePresentaion from "../components/homePage";
import API_KEY from "../config/configAPI";
import { BASE_URL } from "../actions/searchActions";
import promiseNoData from "../components/promiseNoData";

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopularMovies());
    }, []);

    const [authStatus, loading, popularMovies] = useSelector((state) => [
        state.firebase.auth,
        state.search.loading,
        state.search.popularMovies,
    ]);

    // get popular movies/tv
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`;
    const [upcomingpromise, setUpcomingPromise] = useState(
        getPromise(url, "results")
    );
    const [upcomingData, upcomingError] = usePromise(upcomingpromise);

    const viewMovie = viewMovieCreator(dispatch);

    const selector = {
        Movies: () => dispatch(getPopularMovies()),
        TV: () => dispatch(getPopularTv()),
    };

    const onSearch = (query, page = 1) => {
        dispatch(multiSearch(query, page));
    };

    const createAccount = (event, email, password) => {
        event.preventDefault();
        dispatch(signUp({ email, password }));
    };

    return (
        promiseNoData({
            promise: upcomingpromise,
            data: upcomingData,
            error: upcomingError,
        }) || (
            <HomePresentaion
                authStatus={authStatus}
                selector={selector}
                loading={loading}
                popularMovies={popularMovies}
                data={upcomingData}
                viewMovie={viewMovie}
                onSearch={onSearch}
                createAccount={createAccount}
            />
        )
    );
}

export default Home;
