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

import {UnAuthenticatedNavBar} from './components/navBar/UnAuthenticatedNavBar';
import {AuthenticatedNavBar} from './components/navBar/AuthenticatedNavBar';

import { useMsalEvents } from "./hooks/useMsalEvents";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
// const ProfileContent = () => {
//   const { instance, accounts } = useMsal();
//   const [graphData, setGraphData] = useState(null);

//   function RequestProfileData() {
//     // Silently acquires an access token which is then attached to a request for MS Graph data
//     instance
//       .acquireTokenSilent({
//         ...loginRequest,
//         account: accounts[0],
//       })
//       .then((response) => {
//         callMsGraph(response.accessToken).then((response) =>
//           setGraphData(response)
//         );
//       });
//   }

//   return (
//     <>
//       <h5 className="card-title">Welcome {accounts[0].name}</h5>
//       {/* {graphData ? (
//         <ProfileData graphData={graphData} />
//       ) : (
//         <Button variant="secondary" onClick={RequestProfileData}>
//           Request Profile Information
//         </Button>
//       )} */}
//     </>
//   );
// };


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
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <UnAuthenticatedNavBar />
          <Image id="homePageLogo" src="/icon-3.png" fluid />
        </UnauthenticatedTemplate>
      </div>
    </>
  );
}
