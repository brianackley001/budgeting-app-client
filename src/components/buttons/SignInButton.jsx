import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";
import Button from "react-bootstrap/Button";
import { logError, logEvent } from "../../utils/logger";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      logEvent("login", "popup");
      instance
        .loginPopup(loginRequest)
        .then((loginResponse) => {
          instance.setActiveAccount(loginResponse.account);
          // sessionStorage.setItem("_msalAccount", JSON.stringify(loginResponse.account));
          // console.log(loginResponse);
        })
        .catch((e) => {
          console.log(e);
          logError(error);
        });
    } else if (loginType === "redirect") {
      logEvent("login", "redirect");
      instance
        .loginRedirect(loginRequest)
        .then((loginResponse) => {
          instance.setActiveAccount(loginResponse.account);
          // sessionStorage.setItem("_msalAccount", JSON.stringify(loginResponse.account));
          // console.log(loginResponse);
        })
        .catch((e) => {
          console.log(e);
          logError(error);
        });
    }
  };
  return (
    <Button
      variant="light"
      className="ml-auto"
      data-testid="button-sign-in"
      onClick={() => handleLogin("popup")}
    >
      Log In
    </Button>
  );
};
