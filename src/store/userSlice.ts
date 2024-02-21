import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axiosInstance  from "@utils/axiosInstance";
import { logError, logEvent } from "@utils/logger";

// Define a type for the slice state
interface UserState {
  name: string,
  preferences: {
    transactionItemsPerPage: number,
  }
  userId: string,
  userName: string,
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
  transactionTags: []
}

export function setTransactionItemsPerPage(user) {
  return async function (dispatch) {
    //API Call(s):
    try { 
      logEvent('setTransactionItemsPerPage', {userId: user.id, transactionItemsPerPage: user.transactionItemsPerPage});
      //GET full User Object
      const userResponse = await axiosInstance.get(`user/${user.id}`);

      const updatedUserObject ={ 
        ...userResponse.data,
        preferences: {
          transactionItemsPerPage: user.transactionItemsPerPage
        }
      };

      const response = await axiosInstance.post(
        `user`,
        updatedUserObject
      );

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

export const { setName, setTransactionsPerPage, setTransactionTags, setUserId, setUserName } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.userSlice.name
export const selectTransactionItemsPerPage = (state: RootState) => state.userSlice.preferences.transactionItemsPerPage
export const selectTransactionTags = (state: RootState) => state.userSlice.transactionTags
export const selectUserId = (state: RootState) => state.userSlice.userId
export const selectUserName = (state: RootState) => state.userSlice.userName

export default userSlice.reducer