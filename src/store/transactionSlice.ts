import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
interface transactionItem {
  [x: string]: any
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
  userDescription: string,
  userNotes: string,
  tags: [],
  accountName: string,
  accountId: string,
}

interface PagedTransactions{
  pages: [
    {
      pageNumber: number,
      items: transactionItem[],
      transactionPagination: TransactionPagination
    }
  ]
}

interface TransactionPagination {
  accountIds: string,
  total: number,
  limit: number,
  offset: number,
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  sortDirection: string,
  startDate: string,
  endDate: string,
  tagSearchValue: string,
  userNotesSearchValue: string
}

// Define a type for the slice state
interface TransactionState {
  pagedTransactions: PagedTransactions,
  transactionPagination: TransactionPagination
}
// Define the initial state using that type
const initialState: TransactionState = {
  pagedTransactions: {
    pages: [
      {
        pageNumber: 1,
        items: [],
        transactionPagination: {
          accountIds: "",
          total: 0,
          limit: 0,
          offset: 0,
          pageSize: 10,
          pageNumber: 1,
          sortBy: "date",
          sortDirection: "desc",
          startDate: "",
          endDate: "",
          tagSearchValue: "",
          userNotesSearchValue: "",
        },
      },
    ],
  },
  transactionPagination: {
    accountIds: "",
    total: 0,
    limit: 0,
    offset: 0,
    pageSize: 10,
    pageNumber: 1,
    sortBy: "date",
    sortDirection: "desc",
    startDate: "",
    endDate: "",
    tagSearchValue: "",
    userNotesSearchValue: "",
  },
};

export const transactionSlice = createSlice({
  name: 'transactions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPagedTransactions: (state, action) => {
      state.transactionPagination.total = action.payload.total;
      // Look for cahched page:
      let targetPage = state.pagedTransactions.pages.find((page) => page.pageNumber === action.payload.pageNumber);
      if(targetPage && targetPage.transactionPagination && targetPage.transactionPagination === state.transactionPagination){
        targetPage.items = action.payload.items;
      }
      else{
        state.pagedTransactions.pages[state.transactionPagination.pageNumber - 1] = {items: action.payload.items, pageNumber: state.transactionPagination.pageNumber, transactionPagination: state.transactionPagination};
      }
    },
    setPaginationSortBy: (state, action) => {
      state.transactionPagination.sortBy = action.payload
    },
    setPaginationSortDirection: (state, action) => {
      state.transactionPagination.sortDirection = action.payload
    },
    setPaginationAccountIds: (state, action) => {
      state.transactionPagination.accountIds = action.payload
    },
    setPaginationTotal: (state, action) => {
      state.transactionPagination.total = action.payload
    },
    setPaginationPageSize: (state, action) => {
      state.transactionPagination.pageSize = action.payload
    },
    setPaginationPageNumber: (state, action) => {
      state.transactionPagination.pageNumber = action.payload
    },
    setPaginationStartDate: (state, action) => {
      state.transactionPagination.startDate = action.payload
    },
    setPaginationEndDate: (state, action) => {
      state.transactionPagination.endDate = action.payload
    },
    setPaginationTagSearchValue: (state, action) => {
      state.transactionPagination.tagSearchValue = action.payload
    },
    setPaginationUserNotesSearchValue: (state, action) => {
      state.transactionPagination.userNotesSearchValue = action.payload
    },
  },
})

export const { 
  setPaginationAccountIds,
  setPaginationEndDate,
  setPaginationPageNumber, 
  setPaginationPageSize,
  setPaginationSortBy, 
  setPaginationSortDirection,
  setPaginationStartDate,
  setPaginationTagSearchValue,
  setPaginationTotal,
  setPaginationUserNotesSearchValue,
  setPagedTransactions } = transactionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPagedTransactions = (state: RootState) => state.transactionSlice.pagedTransactions
export const selectTransactionPagination = (state: RootState) => state.transactionSlice.transactionPagination

export default transactionSlice.reducer 