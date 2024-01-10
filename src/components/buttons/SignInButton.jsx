import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";
import Button from "react-bootstrap/Button";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
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
