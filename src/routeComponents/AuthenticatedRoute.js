import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function UnauthenticatedRoute({
    component: C,
    componentProps,
    ...rest
}) {

    return (
        <Route
            {...rest}
            render={(props) =>
                componentProps.authStatus.isLoaded ? (
                    <Redirect to={`/`} />
                ) : (
                    <C {...props} {...componentProps} />
                )
            }
        />
    );
}
