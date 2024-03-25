import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axiosInstance  from "@utils/axiosInstance";
import { logError, logEvent } from "@utils/logger";

// Define a type for the slice state
interface PlaidState {
  institutions: Object[],
  linkedItems: Object[],
  publicToken: string
}

// Define the initial state using that type
const initialState: PlaidState = {
  institutions: [],
  linkedItems: [],
  publicToken: ''
}


// Thunk function
export function getLinkedItems(userId) {
  return async function (dispatch) {
    //API Call:
    try {
      logEvent("getLinkedItems THUNK START", { userId: userId });
      const response = await axiosInstance.post(`user/linkedItems`, {
        userId: userId,
      });
      await dispatch(setLinkedItems(response.data));
    } catch (error) {
      console.log(error);
      logError(error as Error);
    } finally {
      logEvent("getLinkedItems THUNK END", { userId: userId });
    }
  };
}

export const plaidSlice = createSlice({
  name: 'plaid',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setInstitutions: (state, action) => {
      state.institutions = action.payload
    },
    setLinkedItems: (state, action) => {
      state.linkedItems = action.payload
    },
    setPublicToken: (state, action) => {
      state.publicToken = action.payload
    },
  },
})

export const { setInstitutions, setLinkedItems, setPublicToken } = plaidSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectInstitutions = (state: RootState) => state.plaidSlice.institutions
export const selectLinkedItems = (state: RootState) => state.plaidSlice.linkedItems
export const selectPublicToken = (state: RootState) => state.plaidSlice.publicToken

export default plaidSlice.reducer