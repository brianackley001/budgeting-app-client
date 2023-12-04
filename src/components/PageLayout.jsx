/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { useIsAuthenticated } from "@azure/msal-react";
import { AuthenticatedNavBar } from "./navBar/authenticatedNavBar";
import { UnAuthenticatedNavBar } from "./navBar/unAuthenticatedNavBar";

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
    {isAuthenticated ? <AuthenticatedNavBar /> : <UnAuthenticatedNavBar />}
    <br />
    {props.children}
</>
  );
};
