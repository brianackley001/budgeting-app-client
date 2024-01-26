import { AxiosRequestHeaders } from 'axios';
import { axiosInstance } from '../utils/axiosInstance'; // Make sure to import your Axios instance
import React from 'react';
import { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { InteractionRequiredAuthError } from '@azure/msal-common';
import { useAcquireAccessToken } from "./useAcquireAccessToken";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";

export const useAxiosInterceptor = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = useState("");
  useAcquireAccessToken();
  const stateAccessToken = useAppSelector(state => state.msalSlice.accessToken); 
  // Fetch the token refresh function and access token from your application
  // const { testToken } = useLogIn(); // You need to implement this
  // const accessToken = useAuthStore((state) => state.accessToken);


  // Define request/response and error interceptors
  const reqResInterceptor = (config) => {
    // await useAcquireAccessToken().then((response) => {
    //   if (response) {
    //     config.headers = {
    //       Authorization: `Bearer ${response.accessToken}`
    //     };
    //     setAccessToken(response.accessToken);
    //     return config;
    //   }
    // });
    config.headers = {
      Authorization: `Bearer ${stateAccessToken}`
    };
    return config;
  }

  const reqErrInterceptor = async (error) => Promise.reject(error);

  const resResInterceptor = async (response) => {
    // Handle successful responses as needed
    return response;
  }

  const resErrInterceptor = async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      let newAccessToken = '';
      console.log(`(resErrInterceptor) Attempt - Refreshing token... Error: ${error.response.status}`);
      try {
        //const newAccessToken = await testToken();
        if (account) {
          const tokenResponse = await instance
            .acquireTokenSilent({
              scopes: loginRequest.scopes,
              account: account,
            })
            .then((response) => {
              if (response) {
                newAccessToken = response.accessToken;
                setAccessToken(response.accessToken);
              }
            })
            .catch(async (error) => {
              if (error instanceof InteractionRequiredAuthError) {
                  // fallback to interaction when silent call fails
                  return await instance.acquireTokenPopup(loginRequest).catch(error => {
                      if (error instanceof InteractionRequiredAuthError) {
                          // fallback to interaction when silent call fails
                          return instance.acquireTokenRedirect(loginRequest)
                      }
                  });
              }
          });
        }

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        // Update the instance header
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error('Token refresh failed', error);
      }
    }
    else 
    {
      console.log(`(resErrInterceptor) Error: ${error}`);
    }
    return Promise.reject(error);
  }

  // Set up the interceptors with useEffect
  React.useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      reqResInterceptor,
      reqErrInterceptor,
    );

    const resInterceptor = axiosInstance.interceptors.response.use(
      resResInterceptor,
      resErrInterceptor,
    );

    // Cleanup function
    return () => {

   axiosInstance.interceptors.request.eject(reqInterceptor);

   axiosInstance.interceptors.response.eject(resInterceptor);
    }
  }, [accessToken]);

  return { axBe: axiosInstance };
}