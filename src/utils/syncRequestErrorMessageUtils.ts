export  const getPlaidGeneralErrorMessage = (errors) => {
  let message = "";

  errors.forEach((error) => {
    if (error.error_message) {
      if (message.indexOf(error.error_message) === -1) {
        message += error.error_message +  " ";
      }
    }
  });
  return message.lastIndexOf(" ") === message.length - 1 ? message.slice(0,-1): message;
};

export const isPlaidLoginError = (errors) => {
  return errors.some((error) => {
    return error.error_code && error.error_code === "ITEM_LOGIN_REQUIRED";
  });
};


export  const isPlaidOtherError = (errors) => {
  return errors.some((error) => {
    return error.error_type && error.error_code !== "ITEM_LOGIN_REQUIRED";
  });
};

export const getSyncRequestErrorDetails = (
  syncUserRequestErrors,
  syncAccountRequestErrors,
  syncTransactionRequestErrors
) => {
  let plaidLoginError = false;
  let plaidOtherError = false;
  let message = "";
  let headerText = "";
  
  if (syncUserRequestErrors.length > 0) {
    headerText = "Error syncing your user account...";
    message = syncUserRequestErrors.join(", ");
  } else {
    const errorsCollection = syncAccountRequestErrors.length > 0 ? syncAccountRequestErrors : syncTransactionRequestErrors;
    plaidLoginError = isPlaidLoginError(errorsCollection);
    plaidOtherError = isPlaidOtherError(errorsCollection);

    const headerErrorType = syncAccountRequestErrors.length > 0 ? "accounts" : "transactions";
    headerText = `Error syncing your ${headerErrorType}...`;

    if(plaidLoginError){
      message = "One or more of your account credentials needs to be reviewed. Please visit the Accounts page to update your credentials.";
    }
    if(plaidOtherError){
      message = getPlaidGeneralErrorMessage(errorsCollection);
    }
    if(!plaidLoginError && !plaidOtherError){
      message = errorsCollection.join(", ");
    }
  }
  return { headerText, message, plaidLoginError };
};