import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    sessionStorage.removeItem("msal_LOGIN_SUCCESS");
    sessionStorage.removeItem("DB_USER_EXISTS");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userShortName");
    

    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <Button
      variant="light"
      className="ml-auto"
      data-testid="button-sign-out"
      onClick={() => handleLogout("popup")}
    >
      Log Out
    </Button>
  );
};
