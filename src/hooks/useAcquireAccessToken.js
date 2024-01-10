import { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";

const useAcquireAccessToken = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: loginRequest.scopes,
          account: account,
        })
        .then((response) => {
          if (response) {
            setAccessToken(response.accessToken);
          }
        });
    }
  }, [account, instance]);

  return accessToken;
};
export { useAcquireAccessToken };
