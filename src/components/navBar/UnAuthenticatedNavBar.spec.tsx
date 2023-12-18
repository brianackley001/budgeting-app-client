

import { render, screen } from '@testing-library/react';
import {UnAuthenticatedNavBar} from "./UnAuthenticatedNavBar.jsx";
import { BrowserRouter } from 'react-router-dom';
import {SignInButton} from "../buttons/SignInButton.jsx" //button-sign-out
import {SignOutButton} from "../buttons/SignOutButton.jsx"


  describe('UnAuthenticated Navbar', () => {
      test("Renders the UnAuthenticated NavBar", () => {
        render(<BrowserRouter><UnAuthenticatedNavBar /></BrowserRouter>)
        expect(screen.getByText(/Mint Lite/)).toBeInTheDocument();
      });
      test("should contain 'Sign In' button", () => {
        render(<BrowserRouter><UnAuthenticatedNavBar><SignInButton /></UnAuthenticatedNavBar></BrowserRouter>)
        // Sign-In Button
        let signInButton = screen.queryByTestId('button-sign-in');
        expect(signInButton).toBeVisible();
        expect(signInButton).toHaveTextContent(/Log In/);
        //screen.debug();
      });
      test("should not contain 'Sign Out' button", () => {
        render(<BrowserRouter><UnAuthenticatedNavBar></UnAuthenticatedNavBar></BrowserRouter>)
        // Sign-In Button
        let signOutButton = screen.queryByTestId('button-sign-out');
        expect(signOutButton).toBeNull();
        //screen.debug();
      });
      test("should not contain 'Accounts' nav link", () => {
        render(<BrowserRouter><UnAuthenticatedNavBar /></BrowserRouter>)
        // Accounts
        let accountLink = screen.queryByTestId('navlink-accounts');
        expect(accountLink).toBeNull();
        //screen.debug();
      });
      test("should not contain 'Transactions' nav link", () => {
        render(<BrowserRouter><UnAuthenticatedNavBar /></BrowserRouter>)
        // Accounts
        let transactionsLink = screen.queryByTestId('navlink-transactions');
        expect(transactionsLink).toBeNull();
        //screen.debug();
      });
      test("should not contain 'Settings' nav link", () => {
        render(<BrowserRouter><UnAuthenticatedNavBar /></BrowserRouter>)
        // Settings
        let settingsLink = screen.queryByTestId('navlink-settings');
        expect(settingsLink).toBeNull();
        //screen.debug();
      });
    });
   