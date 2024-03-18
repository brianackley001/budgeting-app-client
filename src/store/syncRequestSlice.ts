import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'


// Define a type for the slice state
interface SyncRequestState {
  syncRequestItems: string[]
}

// Define the initial state using that type
const initialState: SyncRequestState = {
  syncRequestItems: []
}

export const syncRequestSlice = createSlice({
  name: 'syncRequest',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSyncRequestItems: (state, action) => {
      state.syncRequestItems = action.payload;
    },
  },
})

export const { setSyncRequestItems} = syncRequestSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSyncRequestItems = (state: RootState) => state.syncRequestSlice.syncRequestItems

export default syncRequestSlice.reducer