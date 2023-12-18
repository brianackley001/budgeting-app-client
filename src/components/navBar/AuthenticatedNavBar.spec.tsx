

//import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import useLocation from 'react-router-dom'; 
//import '@testing-library/jest-dom'
//import * as React from 'react'
import {AuthenticatedNavBar} from "./AuthenticatedNavBar.jsx";
import { BrowserRouter } from 'react-router-dom';
  describe('Auth Navbar', () => {
    // beforeEach(() => {
    //   useNavigationMock.mockImplementation(() => ({
    //     ...navigationState,
    //     state: 'idle',
    //   }));
    // });
      test("Renders the Authenticated NavBar", () => {
        render(<BrowserRouter><AuthenticatedNavBar /></BrowserRouter>)
        expect(screen.getByText('Mint Lite')).toBeTruthy();
        // expect(screen.findByText('Accounts')).toBeTruthy();
        //screen.debug();
      });
      // it('DEMO', async () => {
      //   expect(true).toBe(true)
      // });
    });
   