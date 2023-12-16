import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface MsalState {
  uid: string,
  accessToken: string
}

// Define the initial state using that type
const initialState: MsalState = {
  uid: '',
  accessToken: ''
}

export const msalSlice = createSlice({
  name: 'msal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload
    },
  },
})

export const { setAccessToken, setUid } = msalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUid = (state: RootState) => state.msalSlice.uid
export const selectAccessToken = (state: RootState) => state.msalSlice.accessToken

export default msalSlice.reducer