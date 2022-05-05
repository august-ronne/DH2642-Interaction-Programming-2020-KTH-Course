import {
    AUTH_REQUEST,
    AUTH_FAILURE,
    SIGNUP_SUCCESS,
    SIGNIN_SUCCESS,
    SIGNOUT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    successfullyRegistered: false,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                successfullyRegistered: true,
                error: null,
            };

        case SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case SIGNOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message,
            };

        default:
            return state;
    }
};

export default authReducer;
