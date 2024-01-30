import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axiosInstance  from "@utils/axiosInstance";

interface accountItem {
  [x: string]: unknown;
  id: string,
  balances: {available: number, current: number, limit: number, isoCurrencyCode: string, unofficialCurrencyCode: string},
  mask: string,
  name: string,
  customName: string,
  type: string,
  subtype: string,
  institutionId: string,
  institutionName: string,
  userId: string
}
interface institutionItem {
  id: string,
  name: string
}

// Define a type for the slice state
interface AccountState {
  accounts: accountItem[],
  institutions: institutionItem[]
}
// Define the initial state using that type
const initialState: AccountState = {
  accounts: [],
  institutions: []
}


// Thunk function
export function upsertAccount(userId, account) {
  return async function (dispatch) {
      //API Call:
      try {
        const response = await axiosInstance.post("account", {
          userId: userId,
          account: account,
        });

        dispatch(setAccounts(response.data.accounts));
      } catch (error) {
        console.log(error);
      }
  };
}

export const accountSlice = createSlice({
  name: 'accounts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setInstitutions: (state, action) => {
      state.institutions = action.payload;
    },
  },
})

export const { setAccounts, setInstitutions } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAccounts = (state: RootState) => state.accountSlice.accounts
export const selectInstitutions = (state: RootState) => state.accountSlice.institutions

export default accountSlice.reducer 