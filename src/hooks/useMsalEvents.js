import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { setAccessToken, setUid } from "../store/msalSlice";

const useMsalEvents = () => {
  const [token, setToken] = useState("");
  
  const { instance } = useMsal();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS  && event.payload.account) {
        setToken(event.payload.accessToken);
        dispatch(setAccessToken(event.payload.accessToken));
        dispatch(setUid(event.payload.uniqueId));
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);


  return token;
};
export { useMsalEvents };
