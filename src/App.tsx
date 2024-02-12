import * as React from 'react';
import { EventType } from "@azure/msal-browser";
import "./scss/app.scss";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import Image from 'react-bootstrap/Image';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorPage from '@pages/ErrorPage';
import { Accounts } from '@pages/Accounts';
import { Transactions } from '@pages/Transactions';
import { Settings } from '@pages/Settings';
import { Dashboard } from '@pages/Dashboard';
import AlertDismissible from '@components/notifications/progressAlert';

import { UnAuthenticatedNavBar } from '@components/navBar/UnAuthenticatedNavBar';
import { AuthenticatedNavBar } from '@components/navBar/AuthenticatedNavBar';

import { useMsalEvents } from "@hooks/useMsalEvents";

export default function App() {
  console.log("App.tsx");
  useMsalEvents();  // ensure that AccessToken is directed towards the App Redux Store
  const msalClientId:string = import.meta.env.VITE_MSAL_CLIENT_ID || "MSAL_Cient_ID";
  const msalAuthority:string =  import.meta.env.VITE_MSAL_AUTHORITY || "MSAL_Authority";
  const v1 = process.env.APPSETTING_VITE_MSAL_AUTHORITY || "V1";
  const v2 = process.env.APPSETTING_VITE_MSAL_CLIENT_ID || "V2";
  console.table({msalClientId, msalAuthority});
  console.table({v1, v2});
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
