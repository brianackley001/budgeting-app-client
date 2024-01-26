import { axiosInstance } from "./axiosInstance";
import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@config/authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-common";

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();
const activeAccount = msalInstance.getActiveAccount();
const axiosProvider = Object.assign({}, axiosInstance );

const acquireAccessToken = async (msalInstance) => {
  const accounts = msalInstance.getAllAccounts();

  if (!activeAccount && accounts.length === 0) {
    /*
     * User is not signed in. Throw error or wait for user to login.
     * Do not attempt to log a user in outside of the context of MsalProvider
     */
  }
  const request = {
    scopes: loginRequest.scopes,
    account: activeAccount || accounts[0],
  };

  const authResult = await msalInstance.acquireTokenSilent(request);

  return authResult.accessToken;
};

// Define request/response and error interceptors
const reqResInterceptor = async (config) => {
  const accessToken = await acquireAccessToken(msalInstance);
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return config;
};

const reqErrInterceptor = async (error) => Promise.reject(error);

const resResInterceptor = async (response) => {
  // Handle successful responses as needed
  return response;
};

const resErrInterceptor = async (error) => {
  const originalRequest = error.config;
  console.log(`(resErrInterceptor) Error: ${error}`); // Error: Request failed with status code 401
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    let newAccessToken = "";
    console.log(
      `(resErrInterceptor) Attempt - Refreshing token... Error: ${error.response.status}`
    );
    try {
      if (activeAccount) {
        const tokenResponse = await msalInstance
          .acquireTokenSilent({
            scopes: loginRequest.scopes,
            account: activeAccount,
          })
          .then((response) => {
            if (response) {
              newAccessToken = response.accessToken;
              //setAccessToken(response.accessToken);
            }
          })
          .catch(async (error) => {
            if (error instanceof InteractionRequiredAuthError) {
              // fallback to interaction when silent call fails
              return await msalInstance
                .acquireTokenPopup(loginRequest)
                .catch((error) => {
                  if (error instanceof InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    return msalInstance.acquireTokenRedirect(loginRequest);
                  }
                });
            }
          });
      }

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      // Update the instance header
      return axiosInstance(originalRequest);
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  } else {
    console.log(`(resErrInterceptor) Error: ${error}`);
  }
  return Promise.reject(error);
};

axiosProvider.interceptors.request.use(reqResInterceptor, reqErrInterceptor);
axiosProvider.interceptors.response.use(resResInterceptor, resErrInterceptor);

export const axiosStoreProvider = axiosProvider;
