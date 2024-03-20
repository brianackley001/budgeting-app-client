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