import {
    SIGNUP_SUCCESS,
    SIGNIN_SUCCESS,
    AUTH_FAILURE,
    SIGNOUT_SUCCESS,
} from "./actionTypes";

const getInitials = (user) => {
    if (user.firstName && user.lastName) {
        return user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
    }
    return user.email[0].toUpperCase();
};

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((userCredential) => {
                const userDoc = firestore
                    .collection("users")
                    .doc(userCredential.user.uid);
                userDoc.get().then((doc) => {
                    userDoc
                        .set({
                            email: newUser.email,
                            uid: userCredential.user.uid.toString(),
                            firstName: newUser.firstName || "",
                            lastNmae: newUser.lastName || "",
                            rated_movies: {},
                            to_watch_movies: [],
                            initials: getInitials(newUser),
                        })
                        .then(() => {
                            
                        });
                });
            })
            .then(() => {
                
                dispatch({ type: SIGNUP_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: AUTH_FAILURE, payload: err });
            });
    };
};

export const signOut = () => {
    
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signOut()
            .then(() => {
                
                dispatch({ type: SIGNOUT_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: AUTH_FAILURE, payload: err });
            });
    };
};

export const signIn = (email, password) => {
    
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                dispatch({ type: SIGNIN_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: AUTH_FAILURE, payload: err });
            });
    };
};
