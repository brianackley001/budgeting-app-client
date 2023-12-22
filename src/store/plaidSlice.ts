import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface PlaidState {
  publicToken: string
}

// Define the initial state using that type
const initialState: PlaidState = {
  publicToken: ''
}

export const plaidSlice = createSlice({
  name: 'plaid',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPublicToken: (state, action) => {
      state.publicToken = action.payload
    },
  },
})

export const { setPublicToken } = plaidSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPublicToken = (state: RootState) => state.plaidSlice.publicToken

export default plaidSlice.reducer