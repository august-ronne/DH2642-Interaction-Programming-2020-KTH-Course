import {
    USER_MOVIES_LIST_REQUEST,
    GET_LIST_SUCCESS,
    GET_LIST_FAILURE,
    HAS_USER_RATED_CURRENT_MOVIE,
} from "./actionTypes";

export const userMoviesListRequest = () => {
    return {
        type: USER_MOVIES_LIST_REQUEST,
    };
};

export const getUsersListSuccess = (usersList) => {
    return {
        type: GET_LIST_SUCCESS,
        payload: usersList,
    };
};

export const getListFailure = (error) => {
    return {
        type: GET_LIST_FAILURE,
        payload: error,
    };
};

export const getUserRating = (userRatingData) => {
    return {
        type: HAS_USER_RATED_CURRENT_MOVIE,
        payload: userRatingData,
    };
};

export const getUsersToWatchList = () => {
    
    return (dispatch, getState, { getFirestore }) => {
        const authStatus = getState().firebase.profile;
        if (authStatus.to_watch_movies.length) {
            dispatch(userMoviesListRequest());
            const to_watch_movies = authStatus.to_watch_movies.map((m) =>
                m.toString()
            );
            const firestore = getFirestore();
            firestore
                .collection("to_watch_movies")
                // .where(firestore.FieldPath.documentId(), "in", to_watch_movies)
                .onSnapshot(
                    (querySnapshot) => {
                        const usersMovies = querySnapshot.docs
                            .map((doc) => doc.data())
                            .filter(
                                (item) =>
                                    item.to_watch_user_ids.indexOf(
                                        authStatus.uid
                                    ) > -1
                            )
                            .map((item) => item.movie);
                        dispatch(getUsersListSuccess(usersMovies));
                    },
                    (error) => dispatch(getListFailure(error))
                );
        } else {
            dispatch(getUsersListSuccess([]));
        }
    };
};

export const getUsersRatedList = () => {
   
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const authStatus = getState().firebase.profile;
        if (JSON.stringify(authStatus.rated_movies) != "{}") {
            dispatch(userMoviesListRequest());
            const firestore = getFirestore();
            const rated_movies = Object.keys(authStatus.rated_movies);
            firestore
                .collection("to_watch_movies")
                // .where(firestore.FieldPath.documentId(), "in", rated_movies)
                .onSnapshot(
                    (querySnapshot) => {
                        const usersMovies = querySnapshot.docs
                            .map((doc) => doc.data())
                            .filter(
                                (item) => authStatus.uid in item.rated_user_ids
                            )
                            .map((item) => ({
                                ...item.movie,
                                userScore: item.rated_user_ids[authStatus.uid],
                            }));
                        dispatch(getUsersListSuccess(usersMovies));
                    },
                    (error) => dispatch(getListFailure(error))
                );
        } else {
            dispatch(getUsersListSuccess([]));
        }
    };
};

export const addToWatchMovieToDb = (movie) => {
    return (dispatch, getState, { getFirestore }) => {
        const authStatus = getState().firebase.profile;
        const userId = authStatus.uid;
        const firestore = getFirestore();
        const movieDoc = firestore
            .collection("to_watch_movies")
            .doc(movie.id.toString());
        const toWatchData = {
            movie,
            to_watch_user_ids: [userId],
            rated_user_ids: [],
            created_at: firestore.FieldValue.serverTimestamp(),
        };
        movieDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    
                    movieDoc.set(toWatchData);
                } else {
                    movieDoc.update({
                        to_watch_user_ids: firestore.FieldValue.arrayUnion(
                            authStatus.uid
                        ),
                    });
                }
            })
            // .then(() => dispatch(getUsersToWatchList()))
            .catch((err) => {
                
            });

        const userDoc = firestore
            .collection("users")
            .doc(authStatus.uid.toString());
        userDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    userDoc.set({ to_watch_movies: [movie.id] });
                } else {
                    userDoc.update({
                        to_watch_movies: firestore.FieldValue.arrayUnion(
                            movie.id
                        ),
                    });
                }
                return doc;
            })
            .then((doc) => {
                const movieList = doc.data().to_watch_movies;
                
            })
            .catch((err) => {
                
            });
    };
};

export const removeToWatchMovie = (movie) => {
    

    return (dispatch, getState, { getFirestore }) => {
        const authStatus = getState().firebase.profile;
        const userId = authStatus.uid;
        const firestore = getFirestore();
        const movieDoc = firestore
            .collection("to_watch_movies")
            .doc(movie.id.toString());
        movieDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("no such document!");
                } else {
                    movieDoc.update({
                        to_watch_user_ids: firestore.FieldValue.arrayRemove(
                            userId
                        ),
                    });
                }
            })
            .catch((err) => {
                console.log("Error getting document");
            });

        const userDoc = firestore
            .collection("users")
            .doc(authStatus.uid.toString());
        userDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("no such document!");
                } else {
                    userDoc.update({
                        to_watch_movies: firestore.FieldValue.arrayRemove(
                            movie.id
                        ),
                    });
                }
                return doc;
            })
            .then((doc) => {
                console.log("...");
            })
            .catch((err) => {
                console.log("Error getting document");
            });
    };
};

export const addRatedMovieToDb = (rating, movie) => {

    return (dispatch, getState, { getFirestore }) => {
        const authStatus = getState().firebase.profile;
        const firestore = getFirestore();
        const toWatchData = {
            movie,
            to_watch_user_ids: [],
            rated_user_ids: { [authStatus.uid]: rating },
            created_at: firestore.FieldValue.serverTimestamp(),
        };
        const movieDoc = firestore
            .collection("to_watch_movies")
            .doc(movie.id.toString());
        movieDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    movieDoc.set(toWatchData);
                } else {
                    movieDoc.update({
                        [`rated_user_ids.${authStatus.uid}`]: rating,
                    });
                }

            })

            .catch((err) => {
                console.log("Error getting document");
            });

        const userDoc = firestore
            .collection("users")
            .doc(authStatus.uid.toString());
        userDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    userDoc.set({ rated_movies: [movie.id] });
                } else {
                    userDoc.update({
                        [`rated_movies.${movie.id}`]: rating,
                    });
                }
                return doc;
            })
            .then((doc) => {
                console.log("...");
            })
            .catch((err) => {
                console.log("Error getting document");
            });
    };
};

export const removeRatedMovie = (movie) => {

    return (dispatch, getState, { getFirestore }) => {
        const authStatus = getState().firebase.profile;
        const userId = authStatus.uid;
        const firestore = getFirestore();
        const movieDoc = firestore
            .collection("to_watch_movies")
            .doc(movie.id.toString());
        movieDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("no such document!");
                } else {
                    const ratedUsers = doc.get("rated_user_ids");
                    delete ratedUsers[userId];
                    movieDoc.update({
                        rated_user_ids: ratedUsers,
                    });
                }
            })
            .catch((err) => {
                console.log("Error getting document");
            });

        const userDoc = firestore
            .collection("users")
            .doc(authStatus.uid.toString());
        userDoc
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("no such document!");
                } else {
                    const ratedMovies = doc.get("rated_movies");
                    delete ratedMovies[movie.id];
                    userDoc.update({
                        rated_movies: ratedMovies,
                    });
                }
                return doc;
            })
            .catch((err) => {
                console.log("Error getting document");
            });
    };
};

export const getUserRatingOfCurrentMovie = (movieID) => {
    return (dispatch, getState, { getFirestore }) => {
        var userRatingInfo = [false, null];
        const authStatus = getState().firebase.profile;
        const firestore = getFirestore();
        const userDoc = firestore
            .collection("users")
            .doc(authStatus.uid.toString());
        userDoc
            .get()
            .then((doc) => {
                const rated_movies = doc.get("rated_movies");
                if (movieID in rated_movies) {
                    const userRating = rated_movies.movieID;
                    userRatingInfo = [true, userRating];
                    dispatch(getUserRating(userRatingInfo));
                } else {
                    dispatch(getUserRating(userRatingInfo));
                }
            })
            .catch((error) => console.log("Error getting user rating"));
    };
};
