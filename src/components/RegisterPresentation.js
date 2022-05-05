import React, { useState } from "react";

const RegisterPresentation = ({ createAccount, logOut, logIn, title }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <div>
            <h1>Create Account</h1>
            <input
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email address"
            ></input>
            <input
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Enter your password"
            ></input>
            <button onClick={(e) => createAccount(e, userEmail, userPassword)}>
                Create Account
            </button>
        </div>
    );
};

export default RegisterPresentation;
