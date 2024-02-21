import { useRouteError } from "react-router-dom";
import {logError, logTrace} from "@utils/logger";

export default function ErrorPage() {
  logTrace('ErrorPage.jsx');
  
  const error = useRouteError();
  console.error(error);
  logError(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}