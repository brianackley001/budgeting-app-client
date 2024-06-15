import "./scss/app.scss";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import Image from 'react-bootstrap/Image';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorPage from '@pages/ErrorPage';
import { Accounts } from '@pages/Accounts';
import { Transactions } from '@pages/Transactions';
import { Settings } from '@pages/Settings';
import { Dashboard } from '@pages/Dashboard';
import { Trends } from '@pages//Trends';
import AlertDismissible from '@components/notifications/progressAlert';

import { UnAuthenticatedNavBar } from '@components/navBar/UnAuthenticatedNavBar';
import { AuthenticatedNavBar } from '@components/navBar/AuthenticatedNavBar';

import { useMsalEvents } from "@hooks/useMsalEvents";

export default function App() {
  useMsalEvents();  // ensure that AccessToken is directed towards the App Redux Store
  return (
    <>
      <AuthenticatedTemplate>
        <Router>
          <AuthenticatedNavBar />
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
              errorElement={ErrorPage}
            />
            <Route
              path="/accounts"
              element={<Accounts />}
              errorElement={ErrorPage}
            />
            <Route
              path="/transactions"
              element={<Transactions />}
              errorElement={ErrorPage}
            />
            <Route
              path="/trends"
              element={<Trends />}
              errorElement={ErrorPage}
            />
            <Route
              path="/settings"
              element={<Settings />}
              errorElement={ErrorPage}
            />
          </Routes>
        </Router>

        <AlertDismissible />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <UnAuthenticatedNavBar />
        <Image id="homePageLogo" src="/landing_icon_bg.png" alt="Mint Lite Logo" className='landingPageImage' fluid/>
      </UnauthenticatedTemplate>
    </>
  );
}
