import {
    SEARCH_REQUEST,
    SEARCH_MOVIES_SUCCESS,
    SEARCH_MOVIES_FAILURE,
    SEARCH_GENRES_SUCCESS,
    SEARCH_GENRES_FAILURE,
    GET_MOVIE_SUCCESS,
    GET_MOVIE_FAILURE,
    PROMISE_FAILURE,
    GET_CREDITS_SUCCESS,
    GET_POPULAR_SUCCESS,
    GET_LATEST_SUCCESS,
} from "../actions/actionTypes.js";

const initialState = {
    loading: false,
    searchResult: {
        page: 0,
        total_pages: 1,
        movies: [],
    },
    genres: [],
    currentMovie: null,
    credits: {},
    popularMovies: [],
    error: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:

            return {
                ...state,
                loading: true,
            };
        case SEARCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                searchResult: {
                    page: action.payload.page,
                    total_pages: action.payload.total_pages,
                    movies:
                        action.payload.page !== 1
                            ? [
                                  ...state.searchResult.movies,
                                  ...action.payload.results,
                              ]
                            : [...action.payload.results],
                },
                error: null,
            };
        case SEARCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                movies: [],
                error: action.payload,
            };
        case SEARCH_GENRES_SUCCESS:
            return {
                ...state,
                loading: false,
                genres: action.payload,
                error: null,
            };
        case SEARCH_GENRES_FAILURE:
            return {
                ...state,
                loading: false,
                genres: [],
                error: action.payload,
            };
        case GET_MOVIE_SUCCESS:
            return {
                ...state,
                currentMovie: action.payload,
                loading: false,
                error: null,
            };
        case GET_MOVIE_FAILURE:
            return {
                ...state,
                loading: false,
                currentMovie: null,
                error: action.payload,
            };
        case GET_CREDITS_SUCCESS:
            return {
                ...state,
                credits: action.payload,
                loading: false,
            };
        case GET_POPULAR_SUCCESS:
            return {
                ...state,
                popularMovies: action.payload,
                loading: false,
            };
        case GET_LATEST_SUCCESS:
            return {
                ...state,
                latestMovie: action.payload,
                loading: false,
            };
        case PROMISE_FAILURE:
            return {
                ...state,
                loading: false,
                currentMovie: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
