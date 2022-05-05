import { combineReducers } from "redux";

import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import movieListsReducer from "./movieListsReducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // sync redux store with firestore
    search: searchReducer,
    auth: authReducer,
    userMovieLists: movieListsReducer,
});

export default rootReducer;
