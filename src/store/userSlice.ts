import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axiosInstance  from "@utils/axiosInstance";
import { logError, logEvent } from "@utils/logger";import {
  setHeaderText,
  setMessageText,
  setInProgress,
  setShowAlert,
  setVariantStyle,
} from "@store/alertSlice";


// Define a type for the slice state
interface UserState {
  name: string,
  preferences: {
    transactionItemsPerPage: number,
  }
  userId: string,
  userName: string,
  syncUserRequest: {
    inProgress: boolean,
    errors:string [],
    standAloneRequest: boolean,
  },
  transactionTags: string[]
}

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  preferences: {
    transactionItemsPerPage: 10
  },
  userId: '',
  userName: '',
  syncUserRequest:{
    inProgress: false,
    errors: [],
    standAloneRequest: false,
  },
  transactionTags: []
}

export function createTransactionTag(userId, tag, tags) {
  return async function (dispatch) {
    //API Call(s):
    try { 
      logEvent('createTransactionTag', {userId: userId, tag});
      
      dispatch(setInProgress(true));
      dispatch(setHeaderText("Creating Tag..."));
      dispatch(setMessageText("Please wait while this tag is created..."));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("info"));
      
      //Update User Transaction Tags
      const result = await axiosInstance.post(`user/tags`, {
        userId: userId,
        action: "add",
        tag: tag,
        tags: tags,
        modifiedTag: {originalTagValue: tag, modifiedTagValue: tag}
      });

      await dispatch(setTransactionTags(result.data));
      
      dispatch(setInProgress(false));
      dispatch(setHeaderText("Tag created!"));
      dispatch(setMessageText(`The tag "${tag}" has been created.`));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("success"));
    } catch (error) {
      console.log(error);
      logError(error as Error);

      dispatch(setInProgress(false));
      dispatch(setHeaderText("Error creating tag..."));
      dispatch(setMessageText(`The attempt to create the tag "${tag}" resulted in the error "${error}."`));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("danger"));
    }
  };
}

export function deleteTransactionTag(userId, tag, tags) {
  return async function (dispatch) {
    //API Call(s):
    try { 
      logEvent('deleteTransactionTag', {userId: userId, tag});

      dispatch(setInProgress(true));
      dispatch(setHeaderText("Deleting Tag..."));
      dispatch(setMessageText("Please wait while this tag is deleted..."));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("info"));
      
      //Update User Transaction Tags
      const result = await axiosInstance.post(`user/tags`, {
        userId: userId,
        action: "remove",
        tag: tag,
        tags: tags,
        modifiedTag: {originalTagValue: tag, modifiedTagValue: tag}
      });

      await dispatch(setTransactionTags(result.data));
      
      dispatch(setInProgress(false));
      dispatch(setHeaderText("Tag deleted!"));
      dispatch(setMessageText(`The tag "${tag}" has been deleted.`));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("success"));
    } catch (error) {
      console.log(error);
      logError(error as Error);
      
      dispatch(setInProgress(false));
      dispatch(setHeaderText("Error deleting tag..."));
      dispatch(setMessageText(`The attempt to delete the tag "${tag}" resulted in the error "${error}."`));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("danger"));
    }
  };
}

// Thunk function
export function getUser(userId) {
  return async function (dispatch) {
    let sessionUser = {
      id: "",
      userName: "",
      userShortName: "",
      transactionTags: ["Verify"],
      preferences: { transactionItemsPerPage: 10 },
      dateCreated: new Date().toUTCString(),
      dateUpdated: new Date().toUTCString(),
    };

    //API Call (Get User from DB):
    const response = await axiosInstance.get(`/user/${userId}`);

    //User Exists:
    if (response.data && response.data.id.length > 0) {
      sessionUser = response.data;
      dispatch(setUserId(sessionUser.id));
      dispatch(setUserName(sessionUser.userName));
      dispatch(setName(sessionUser.userShortName));
      dispatch(setTransactionTags(sessionUser.transactionTags));
      dispatch(setTransactionsPerPage(sessionUser.preferences.transactionItemsPerPage));

      return sessionUser;
    }
  };
}
// Thunk function
export function createUser(sessionUser) {
  return async function (dispatch) {
    //API Call (Create New User in DB):
    await axiosInstance.post(`user`, sessionUser).then((response) => {
      sessionStorage.removeItem("msal_LOGIN_SUCCESS");
      sessionUser = response.data;
      logEvent("user-login", {
        type: "END save new user to DB",
        userId: sessionUser.id || "unknown",
      });

      if (response.data && response.data.id.length > 0) {
        dispatch(setUserId(sessionUser.id));
        dispatch(setUserName(sessionUser.userName));
        dispatch(setName(sessionUser.userShortName));
        dispatch(setTransactionTags(sessionUser.transactionTags));
        dispatch(
          setTransactionsPerPage(
            sessionUser.preferences.transactionItemsPerPage
          )
        );
      }
    });
    return sessionUser;
  };
}

export function updateTransactionTag(userId, modifiedTag, tags) {
  return async function (dispatch) {
    //API Call(s):
    try { 
      logEvent('updateTransactionTag', {
        userId: userId, 
        originalTagValue: modifiedTag.originalTagValue, 
        modifiedTagValue: modifiedTag.modifiedTagValue
      });

      dispatch(setInProgress(true));
      dispatch(setHeaderText("Updating Tag..."));
      dispatch(setMessageText("Please wait while this tag is updated..."));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("info"));
      
      //Update User Transaction Tags
      const result = await axiosInstance.post(`user/tags`, {
        userId: userId,
        action: "update",
        tag: modifiedTag.originalTagValue,
        tags: tags,
        modifiedTag: {originalTagValue: modifiedTag.originalTagValue, modifiedTagValue: modifiedTag.modifiedTagValue}
      });

      dispatch(setTransactionTags(result.data));
      
      dispatch(setInProgress(false));
      dispatch(setHeaderText("Tag updated!"));
      dispatch(setMessageText(`The tag "${modifiedTag.originalTagValue}" has been updated to "${modifiedTag.modifiedTagValue}".`));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("success"));
    } catch (error) {
      console.log(error);
      logError(error as Error);

      dispatch(setInProgress(false));
      dispatch(setHeaderText("Error updating tag..."));
      dispatch(setMessageText(`The attempt to update the tag "${modifiedTag.originalTagValue}" resulted in the error "${error}."`));
      dispatch(setShowAlert(true));
      dispatch(setVariantStyle("danger"));
    }
  };
}

export function setTransactionItemsPerPage(user) {
  return async function (dispatch) {
    //API Call(s):
    try { 
      logEvent('setTransactionItemsPerPage', {userId: user.id, transactionItemsPerPage: user.transactionItemsPerPage});
      
      //Update User Preferences
      await axiosInstance.post(`user/preferences`, {
        userId: user.id,
        preferences: {
          transactionItemsPerPage: user.transactionItemsPerPage,
        },
      });

      dispatch(setTransactionsPerPage(user.transactionItemsPerPage));
    } catch (error) {
      console.log(error);
      logError(error as Error);
    }
  };
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setSyncUserRequest: (state, action) => {
      state.syncUserRequest = action.payload;
    },
    setTransactionsPerPage: (state, action: PayloadAction<number>) => {
      state.preferences.transactionItemsPerPage = action.payload
    },
    setTransactionTags: (state, action: PayloadAction<string[]>) => {
      state.transactionTags = action.payload
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
  },
})

export const { setName, setSyncUserRequest, setTransactionsPerPage, setTransactionTags, setUserId, setUserName } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.userSlice.name
export const selectSyncUserRequest = (state: RootState) => state.userSlice.syncUserRequest
export const selectTransactionItemsPerPage = (state: RootState) => state.userSlice.preferences.transactionItemsPerPage
export const selectTransactionTags = (state: RootState) => state.userSlice.transactionTags
export const selectUserId = (state: RootState) => state.userSlice.userId
export const selectUserName = (state: RootState) => state.userSlice.userName

export default userSlice.reducer