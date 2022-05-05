import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store/store";
import "./App.css";

import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import Search from "./containers/Search";
import MovieDetails from "./containers/MovieDetails";
import Login from "./containers/Login";
import ToWatchList from "./containers/UserMovieLists";
// import {
//     UserIsAuthenticated,
//     UserIsNotAuthenticated,
// } from "./containers/routeProtection";
// import AuthenticatedRoute from "./routeComponents/AuthenticatedRoute";
// import UnauthenticatedRoute from "./routeComponents/UnauthenticatedRoute";
import Navbar from "./containers/Navbar";
import Home from "./containers/homePage";
import firebase from "./config/firebase";
import MultiSearch from "./containers/MultiSearch";

const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    attachAuthIsReady: true,
}; // react-redux-firebase config
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
};

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.profile)
    if (!isLoaded(auth)) return <div></div>;
    return children
  }

function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <Navbar />
            </AuthIsLoaded>
                <Router>
                <AuthIsLoaded>
                    <div className="App">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => <Home {...props} />}
                            />
                            <Route
                                exact
                                path="/movie/:slug"
                                render={(props) => (
                                    // <BlogPost />
                                    <MovieDetails {...props} />
                                )}
                            />
                            <Route
                                exact
                                path="/movie"
                                render={(props) => (
                                    <Search
                                        {...props} //
                                    />
                                )}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/search"
                                component={MultiSearch}
                            />
                            <Route
                                exact
                                path="/user-list"
                                component={ToWatchList}
                            />
                            <Route
                                exact
                                path="/404"
                                render={() => {
                                    window.location.href = "404.html";
                                }}
                            />
                        </Switch>
                    </div>
                    </AuthIsLoaded>
                </Router>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

export default App;
