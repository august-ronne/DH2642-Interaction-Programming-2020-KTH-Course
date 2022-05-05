import {
    USER_MOVIES_LIST_REQUEST,
    GET_LIST_SUCCESS,
    GET_LIST_FAILURE,
    HAS_USER_RATED_CURRENT_MOVIE,
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    isRateList: null,
    hasUserRatedCurrentMovie: false,
    userRatingOfCurrentMovie: null,
    movies: [],
    error: "",
};

const movieListsReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_MOVIES_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_LIST_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                loading: false,
            };
        case GET_LIST_FAILURE:
            return {
                ...state,
                movies: [],
                error: action.payload,
            };
        case HAS_USER_RATED_CURRENT_MOVIE:
            return {
                ...state,
                hasUserRatedCurrentMovie: action.payload[0],
                userRatingOfCurrentMovie: action.payload[1],
            };
        default:
            return state;
    }
};

export default movieListsReducer;
