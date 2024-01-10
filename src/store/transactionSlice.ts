import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
interface transactionItem {
  id: string,
  transactionId: string,
  institutionId: string,
  institutionName: string,
  amount: number,
  authorizedDate: string,
  date: string,
  isoCurrencyCode: string,
  pending: boolean,
  pendingTransactionId: string,
  checkNumber: string,
  transactionType: string,
  name: string,
  merchantName: string,
  paymentChannel: string,
  transactionCode: string,
  personalFinanceCategory: {
      confidence_level: string,
      detailed: string,
      primary: string
  },
}

// Define a type for the slice state
interface TransactionState {
  transactions: transactionItem[]
}
// Define the initial state using that type
const initialState: TransactionState = {
  transactions: []
}

export const transactionSlice = createSlice({
  name: 'transactions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTransactions: (state, action) => {
      state.transactions = action.payload
    },
  },
})

export const { setTransactions } = transactionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTransactions = (state: RootState) => state.transactionSlice.transactions

export default transactionSlice.reducer 