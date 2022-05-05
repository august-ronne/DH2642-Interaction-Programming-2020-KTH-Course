import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import LogIn from "./Login"; // change it to your custom component

const locationHelper = locationHelperBuilder({});
const history = require("history").createHistory;

// apply it to the component we want to protect.
export const UserIsAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: "UserIsAuthenticated",
    AuthenticatingComponent: LogIn,
    allowRedirectBack: true,
    // The url to redirect user to if they fail
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || "/login",
    // If selector is true, wrapper will not redirect
    authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
        auth.isLoaded && !auth.isEmpty,
    redirectAction: (newLoc) => (dispatch) => {
        history.replace(newLoc); // or routerActions.replace
        dispatch({ type: "UNAUTHED_REDIRECT" });
    },
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: "UserIsNotAuthenticated",
    AuthenticatingComponent: LogIn,
    allowRedirectBack: false,
    // if a user is already logged in, but navigates to the login page, we may want to send them to the home page
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || "/",
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
        auth.isLoaded && auth.isEmpty,
    redirectAction: (newLoc) => (dispatch) => {
        history.push(newLoc);
        // routerActions.replace or other redirect
        dispatch({ type: "UNAUTHED_REDIRECT" });
    },
});
