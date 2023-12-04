/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { useIsAuthenticated } from "@azure/msal-react";
import { AuthenticatedNavBar } from "./authenticatedNavBar";
import { UnAuthenticatedNavBar } from "./unAuthenticatedNavBar";

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const NavBar = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
    {isAuthenticated ? <AuthenticatedNavBar /> : <UnAuthenticatedNavBar />}
</>
  );
};
