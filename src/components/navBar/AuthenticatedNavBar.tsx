import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink  } from 'react-router-dom';

import { SignOutButton } from "@components/buttons/SignOutButton";
import { StoreRefreshButton } from "@components/buttons/StoreRefreshButton";
// import { TestingButton} from "../buttons/TestingButton.jsx";

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
        data-testid="authenticatedNavBar"
      >
        <Container>
        <Navbar.Brand as={NavLink} to="/">Mini Mint</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse" data-testid="navbar-collapse">
            <Nav className="me-auto" id="topNav">
              <Nav.Link as={NavLink} eventKey={1} to="/accounts" data-testid="navlink-accounts">Accounts</Nav.Link>
              <Nav.Link as={NavLink} eventKey={2} to="/transactions" data-testid="navlink-transactions">Transactions</Nav.Link>
              <Nav.Link as={NavLink} eventKey={3} to="/trends" data-testid="navlink-trends">Trends</Nav.Link>
              <Nav.Link as={NavLink} eventKey={4} to="/settings" data-testid="navlink-settings">Settings</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={5}>
                <StoreRefreshButton /> 
              </Nav.Link>
              <Nav.Link eventKey={6}>
                <SignOutButton /> 
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
};
