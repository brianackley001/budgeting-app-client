import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, afterAll, vitest, afterEach } from 'vitest';
import {AuthenticatedNavBar} from "./AuthenticatedNavBar.jsx";
import { BrowserRouter } from 'react-router-dom';
// import {SignOutButton} from "../buttons/SignOutButton.jsx"

// vi.mock("@utils/logger");
// vi.mock("@config/authConfig");
// vi.mock("@config/authConfig");
// vi.mock("@azure/msal-react");
// vi.mock("@azure/msal-browser", () => ({
//   PublicClientApplication: vi.fn(),
// }));
// vi.mock('@utils/axiosInstance');
// vi.mock('@store/store');


// beforeEach(() => {
//   vi.spyOn('react-redux', 'useSelector');
//   vi.spyOn('react-redux', 'useDispatch');
// });

  describe.skip('Auth Navbar', () => {
    // beforeEach(() => {
    //   useNavigationMock.mockImplementation(() => ({
    //     ...navigationState,
    //     state: 'idle',
    //   }));
    // });
      test("Renders the Authenticated NavBar", () => {
        render(<BrowserRouter><AuthenticatedNavBar /></BrowserRouter>)
        expect(screen.getByText('Mint Lite')).toBeInTheDocument();
        // expect(screen.findByText('Accounts')).toBeTruthy();
        //screen.debug();
      });
      test("should contain 'Accounts' nav link", () => {
        render(<BrowserRouter><AuthenticatedNavBar /></BrowserRouter>)
        // Accounts
        let accountLink = screen.getByTestId('navlink-accounts');
        expect(accountLink).toBeInTheDocument();
        expect(accountLink).toHaveClass('nav-link');
        expect(accountLink).toHaveTextContent(/Accounts/);
        //screen.debug();
      });
      test("should contain 'Transactions' nav link", () => {
        render(<BrowserRouter><AuthenticatedNavBar /></BrowserRouter>)
        // Transactions
        let transactionsLink = screen.getByTestId('navlink-transactions');
        expect(transactionsLink).toBeInTheDocument();
        expect(transactionsLink).toHaveClass('nav-link');
        expect(transactionsLink).toHaveTextContent(/Transactions/);
        //screen.debug();
      });
      test("should contain 'Settings' nav link", () => {
        render(<BrowserRouter><AuthenticatedNavBar /></BrowserRouter>)
        // Settings
        let settingsLink = screen.getByTestId('navlink-settings');
        expect(settingsLink).toBeInTheDocument();
        expect(settingsLink).toHaveClass('nav-link');
        expect(settingsLink).toHaveTextContent(/Settings/);
        //screen.debug();
      });
      // test("should contain 'Sign Out' button", () => {
      //   render(<BrowserRouter><AuthenticatedNavBar><SignOutButton /></AuthenticatedNavBar></BrowserRouter>)
      //   // Sign-Out Button
      //   let signOutButton = screen.queryByTestId('button-sign-out');
      //   expect(signOutButton).toBeVisible();
      //   expect(signOutButton).toHaveTextContent(/Log Out/);
      //   //screen.debug();
      // });
      test("should not contain 'Sign In' button", () => {
        render(<BrowserRouter><AuthenticatedNavBar></AuthenticatedNavBar></BrowserRouter>)
        // Sign-In Button
        let signInButton = screen.queryByTestId('button-sign-in');
        expect(signInButton).toBeNull();
        //screen.debug();
      });
    });
   