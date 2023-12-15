import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";

const useMsalEvents = () => {
  // const { instance, accounts } = useMsal();
  // const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = useState("");
  
  const { instance } = useMsal();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS  && event.payload.account) {
        setAccessToken(event.payload.accessToken);
        console.log(event.payload.accessToken);
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return accessToken;
};
export { useMsalEvents };
