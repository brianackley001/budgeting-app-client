import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface AlertState {
  headerText: string,
  icon?: {iconType: string, isVisible: boolean, iconSize: string, iconColor: string},
  inProgress: boolean,
  messageText: string,
  showAlert: boolean,
  variantStyle: string
}
interface IconItem {
  iconColor: string,
  iconSize: string,
  iconType: string,
  isVisible: boolean
}

// Define the initial state using that type
const initialState: AlertState = {
  headerText: '',
  icon: {iconColor: '', iconSize: '', iconType: '', isVisible: false},
  inProgress: false,
  messageText: '',
  showAlert: false,
  variantStyle: 'dark'
}

export const alertSlice = createSlice({
  name: 'alert',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAlertState: (state, action: PayloadAction<AlertState>) => {
      state.headerText = action.payload.headerText
      state.icon = action.payload.icon ? action.payload.icon : state.icon
      state.inProgress = action.payload.inProgress
      state.messageText = action.payload.messageText
      state.showAlert = action.payload.showAlert
      state.variantStyle = action.payload.variantStyle
    },
    setIcon: (state, action: PayloadAction<IconItem>) => {
      state.icon = action.payload
    },
    setInProgress: (state, action: PayloadAction<boolean>) => {
      state.inProgress = action.payload
    },
    setHeaderText: (state, action: PayloadAction<string>) => {
      state.headerText = action.payload
    },
    setMessageText: (state, action: PayloadAction<string>) => {
      state.messageText = action.payload
    },
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload
    },
    setVariantStyle: (state, action: PayloadAction<string>) => {
      state.variantStyle = action.payload
    },
  },
})

export const { setAlertState, setHeaderText, setIcon, setInProgress, setMessageText, setShowAlert, setVariantStyle } = alertSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIcon = (state: RootState) => (state as RootState).alertSlice.icon
export const selectInProgress = (state: RootState) => state.alertSlice.inProgress
export const selectHeaderText= (state: RootState) => state.alertSlice.headerText
export const selectMessageText = (state: RootState) => state.alertSlice.messageText
export const selectShowAlert = (state: RootState) => state.alertSlice.showAlert
export const selectVariantStyle = (state: RootState) => state.alertSlice.variantStyle

export default alertSlice.reducer