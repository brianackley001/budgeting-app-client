import React, { useState } from "react";
import { useEffect } from "react";
import { EventType } from "@azure/msal-browser";
import "./scss/App.scss";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { loginRequest } from "./config/authConfig";
import { callMsGraph } from "./graph";
import Image from 'react-bootstrap/Image';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import { Accounts } from './pages/Accounts';
import { Transactions } from './pages/Transactions';
import { Settings } from './pages/Settings';
import { Dashboard } from './pages/Dashboard';
import AlertDismissible from './components/notifications/progressAlert';

import {UnAuthenticatedNavBar} from './components/navBar/UnAuthenticatedNavBar';
import {AuthenticatedNavBar} from './components/navBar/AuthenticatedNavBar';

import { useMsalEvents } from "./hooks/useMsalEvents";

export default function App() {
  useMsalEvents();  // ensure that AccessToken is directed towards the App Redux Store
  return (
    <>
      <div className="App">
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
          <Image id="homePageLogo" src="/icon-3.png" fluid />
        </UnauthenticatedTemplate>
      </div>
    </>
  );
}
