import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { signUp } from "../actions";
import RegisterPresentation from "../components/RegisterPresentation";
import RegistrationSuccessful from "../components/RegistrationSuccessful";

const Login = () => {
    const dispatch = useDispatch();

    const userHasSuccessfullyRegistered = useSelector(
        (state) => state.auth.successfullyRegistered
    );

    const createAccount = (event, email, password) => {
        event.preventDefault();

        dispatch(signUp(email, password));
    };

    return userHasSuccessfullyRegistered ? (
        <RegistrationSuccessful />
    ) : (
        <RegisterPresentation createAccount={createAccount} />
    );
};

export default Login;
