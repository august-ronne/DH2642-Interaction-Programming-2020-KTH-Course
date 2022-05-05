import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Card from "react-bootstrap/Card";

import SelectorPresentation from "./popularSelector";
import SearchBar from "./searchBar";
import MoviesPresentation from "../MoviesPresentation";
import LoginPresentation from "../auth/LoginPresentation";
import SpinnerAnimation from "../Spinner";
import tmdbLogo from "../../images/tmdb-logo.png";

const HomePresentation = (props) => {

    return (
        <Container className="mt-3 mb-5">
            {props.authStatus.uid ? (
                <Card className="text-center">
                    <Card.Body>
                        <h5>
                            Welcome! To view your To Watch List or the movies
                            you have rated, click on the <b>blue circle</b> in
                            the menu above!
                        </h5>
                    </Card.Body>
                </Card>
            ) : (
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title className="homepage-card-title">
                            MoView helps you discover new movies! Find them by
                            genre, year, popularity, and more!
                            <br /> To get started click on{" "}
                            <b>Discover More Movies</b> in the menu above
                        </Card.Title>
                        <Card.Text className="mt-3">
                            If you also want to build your own <b>To Watch</b>{" "}
                            list or <b>rate</b> the movies you have watched you
                            will need to register an account, but it is very
                            simple, just click on the button below
                        </Card.Text>
                        <LoginPresentation
                            createAccount={props.createAccount}
                            logIn={props.logIn}
                            title={"Register An Account"}
                        />
                    </Card.Body>
                </Card>
            )}
            <Row>
                <Container className="tmdb-info-homepage mt-4 lead" fluid>
                    Movie information and images fetched using{" "}
                    <a href="https://www.themoviedb.org/">
                        <img src={tmdbLogo} alt="TMDb"></img>
                    </a>
                </Container>

                <SearchBar onSearch={props.onSearch} />
            </Row>
            <Row>
                <SelectorPresentation selector={props.selector} />
            </Row>
            <Row className="popular">
                {props.loading ? (
                    <SpinnerAnimation />
                ) : (
                    <MoviesPresentation
                        movies={props.popularMovies.results}
                        viewMovie={props.viewMovie}
                    />
                )}
            </Row>
            <Row className="popular">
                <h3>Upcoming</h3>
                <MoviesPresentation
                    movies={props.data.results}
                    viewMovie={props.viewMovie}
                />
            </Row>
        </Container>
    );
};

export default HomePresentation;
