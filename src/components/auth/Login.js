import React from "react";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";

import { UserIsNotAuthenticated } from "../../containers/routeProtection";

const Login = ({ firebase }) => (
    <div>
        <button onClick={() => firebase.login({ provider: "google" })}>
            Google Login
        </button>
    </div>
);

export default Login;
// compose(
//   UserIsNotAuthenticated, // redirects to '/' if user is logged in
//   withFirebase // adds this.props.firebase
// )(Login)
