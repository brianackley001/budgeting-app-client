import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@config/authConfig";
import Button from "react-bootstrap/Button";
import { logError, logEvent } from "@utils/logger";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      logEvent("login", { loginType: "popup" });
      instance
        .loginPopup(loginRequest)
        .then((loginResponse) => {
          instance.setActiveAccount(loginResponse.account);
        })
        .catch((e) => {
          console.log(e);
          logError(e);
        });
    } else if (loginType === "redirect") {
      logEvent("login", { loginType: "redirect" });
      instance
        .loginRedirect(loginRequest)
        // .then((loginResponse) => {
        //   instance.setActiveAccount(loginResponse.account);
        // })
        .catch((e) => {
          console.log(e);
          logError(e);
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
