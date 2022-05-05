import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NavbarPresentation from "../components/navbarPresentation";
import { signUp, signOut, signIn } from "../actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => {
        return state.firebase.profile;
    });

    const logOut = (event) => {
        event.preventDefault();

        dispatch(signOut());
    };

    const logIn = (event, email, password) => {
        event.preventDefault();

        dispatch(signIn(email, password));
    };

    const createAccount = (event, email, password, firstName, lastName) => {
        event.preventDefault();

        dispatch(signUp({ email, password, firstName, lastName }));
    };

    return (
        <NavbarPresentation
            authStatus={authStatus}
            createAccount={createAccount}
            logOut={logOut}
            logIn={logIn}
        />
    );
};

export default Navbar;
