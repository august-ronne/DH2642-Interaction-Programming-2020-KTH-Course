import React, { useState, useEffect } from "react";
import SearchFormPresentation from "./SearchFormPresentation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MoviesPresentation from "../MoviesPresentation";
import InfiniteSearchPresentation from "../search/InfiniteSearchPresentation";
import tmdbLogo from "../../images/tmdb-logo.png";

const SearchPresentation = (props) => {
    const [sortMethod, setSortMethod] = useState("popularity.desc");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [timeInterval, setTimeInterval] = useState(false);
    const [genreID, setGenreID] = useState("");

    useEffect(() => {
        props.onSearch(startYear, endYear, genreID, sortMethod);
    }, [genreID, sortMethod, timeInterval]);

    const [page, setPage] = useState(2);
    const loadMore = () => {
        props.onSearch(startYear, endYear, genreID, sortMethod, page);
        setPage(page + 1);
    };
    const hasMore = props.searchResult.page < props.searchResult.total_pages;

    const searchParams = {
        sortMethod: sortMethod,
        startYear: startYear,
        endYear: endYear,
        genreID: genreID,
        intervalChange: timeInterval,
    };
    const selector = {
        setSortMethod: setSortMethod,
        setStartDate: setStartYear,
        setEndDate: setEndYear,
        setGenre: setGenreID,
        setDateInterval: setTimeInterval,
    };

    const children = (
        <MoviesPresentation
            movies={props.searchResult.movies}
            viewMovie={props.viewMovie}
            loading={props.loading}
        />
    );

    return (
        <Container className="mt-3">
            <Row>
                <Col sm={3}>
                    <Row>
                        <SearchFormPresentation
                            sort={props.sort}
                            genres={props.genres}
                            searchParams={searchParams}
                            selector={selector}
                        />
                    </Row>
                </Col>
                <Col>
                    <Container className="tmdb-info-homepage mt-4 lead" fluid>
                        Movie information and images fetched using{" "}
                        <a href="https://www.themoviedb.org/">
                            <img src={tmdbLogo} alt="TMDb"></img>
                        </a>
                    </Container>
                    <InfiniteSearchPresentation
                        loadMore={loadMore}
                        hasMore={hasMore}
                        loading={props.loading}
                        children={children}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default SearchPresentation;
