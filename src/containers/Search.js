import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    discoverMovies,
    searchGenres,
    signOut,
    viewMovieCreator,
} from "../actions";
import SearchPresentation from "../components/search";

function Search() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchGenres());
    }, []);

    const [genres, loading, searchResult] = useSelector((state) => {

        return [
            state.search.genres,
            state.search.loading,
            state.search.searchResult,
        ];
    });

    const onSearch = (startYear, endYear, genreID, sortMethod, page = 1) =>
        dispatch(discoverMovies(startYear, endYear, genreID, sortMethod, page));

    const viewMovie = viewMovieCreator(dispatch);
    const logOut = (event) => {
        event.preventDefault();

        dispatch(signOut());
    };

    const sort = [
        {
            id: "popularity.desc",
            name: "Popularity",
        },
        {
            id: "vote_average.desc",
            name: "Top Rated",
        },
        {
            id: "revenue.desc",
            name: "Highest Revenue",
        },
    ];

    return (
        <SearchPresentation
            onSearch={onSearch}
            genres={genres}
            sort={sort}
            logOut={logOut}
            loading={loading}
            searchResult={searchResult}
            viewMovie={viewMovie}
        />
    );
}

export default Search;
