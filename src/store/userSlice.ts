import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface UserState {
  name: string,
  userId: string,
  userName: string
}

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  userId: '',
  userName: ''
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
  },
})

export const { setName, setUserId, setUserName } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.userSlice.name
export const selectUserId = (state: RootState) => state.userSlice.userId
export const selectUserName = (state: RootState) => state.userSlice.userName

export default userSlice.reducer