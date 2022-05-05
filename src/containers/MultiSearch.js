import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MultiSearchSidebar from "../components/multiSearch/multiSearchSidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { viewMovieCreator, multiSearch } from "../actions";
import MoviesPresentation from "../components/MoviesPresentation";
import SpinnerAnimation from "../components/Spinner";

const filters = [
    {
        id: "tv",
        name: "TV Shows",
    },
    {
        id: "movie",
        name: "Movies",
    },
    {
        id: "person",
        name: "People",
    },
    {
        id: "keyword",
        name: "Keywords",
    },
    {
        id: "company",
        name: "Companies",
    },
    {
        id: "collection",
        name: "Collections",
    },
    {
        id: "network",
        name: "Networks",
    },
];

const MultiSearch = ({ match, location }) => {
    /* The functionality of search bar on homepage.
        Search multiple models in a single request. 
        Multi search currently supports searching for movies, tv shows and people in a single request. 
    */


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(multiSearch(location.search.slice(7)));
    }, [location.search]);
    const [searchResult, loading] = useSelector((state) => {

        return [state.search.searchResult, state.search.loading];
    });



    const [category, setCategory] = useState(null);

    const filterResults = (category) => {
        if (category) {
            return searchResult.movies.filter(
                (item) => item.media_type == category
            );
        } else {
            return searchResult.movies;
        }
    };

    const [movies, setMovies] = useState(searchResult.movies);
    useEffect(() => {
        setMovies(filterResults(category));
    }, [category, searchResult.movies]);

    const viewMovie = viewMovieCreator(dispatch);

    return (
        <Container className="mt-3">
            <Row>
                <Col sm={3}>
                    <MultiSearchSidebar
                        filters={filters}
                        setCategory={setCategory}
                    />
                </Col>
                <Col>
                    {loading ? (
                        <SpinnerAnimation />
                    ) : (
                        <MoviesPresentation
                            movies={movies}
                            viewMovie={viewMovie}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default MultiSearch;
