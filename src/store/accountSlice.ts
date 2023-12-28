import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
interface accountItem {
  id: string,
  userId: string,
  name: string,
  mask: string,
  type: string,
  subtype: string,
  institutionId: string,
  institutionName: string,
  balance: {}
}

// Define a type for the slice state
interface AccountState {
  accounts: accountItem[]
}
// Define the initial state using that type
const initialState: AccountState = {
  accounts: []
}

export const accountSlice = createSlice({
  name: 'accounts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAccounts: (state, action) => {
      state.accounts = action.payload
    },
  },
})

export const { setAccounts } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAccounts = (state: RootState) => state.accountSlice.accounts

export default accountSlice.reducer 