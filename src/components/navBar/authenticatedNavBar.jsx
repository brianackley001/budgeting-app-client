import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink  } from 'react-router-dom';

import { SignOutButton } from "../SignOutButton";

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const AuthenticatedNavBar = () => {
  return (
    <>
      <Navbar
        variant="dark"
        collapseOnSelect
        expand="lg"
        className="bg-success"
        id="authenticatedNavBar"
      >
        <Container>
        <Navbar.Brand as={NavLink} to="/">Mint Lite</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/accounts">Accounts</Nav.Link>
              <Nav.Link as={NavLink} to="/transactions">Transactions</Nav.Link>
              <Nav.Link as={NavLink} to="/settings">Settings</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2}>
                <SignOutButton /> 
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
