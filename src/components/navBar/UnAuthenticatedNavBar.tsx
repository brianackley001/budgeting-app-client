import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { SignInButton } from "../buttons/SignInButton";

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const UnAuthenticatedNavBar = () => {
  return (
    <>
      <Navbar
        variant="dark"
        collapseOnSelect
        expand="lg"
        className="bg-success"
        id="nonAuthenticatedNavBar"
      >
        <Container>
          <Navbar.Brand>Mint Lite</Navbar.Brand>
            <SignInButton className="justify-content-end" />
        </Container>
      </Navbar>
    </>
  );
};
