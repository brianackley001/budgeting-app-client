import { createSlice } from '@reduxjs/toolkit'
import isEqual from "lodash.isequal"
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
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  sortDirection: string,
  startDate: string,
  endDate: string,
  tagSearchValue: string,
  userId: string,
  userNotesSearchValue: string
}

// Define a type for the slice state
interface TransactionState {
  activePageItems: number[],
  pagedTransactions: PagedTransactions,
  transactionPagination: TransactionPagination
}
// Define the initial state using that type
const initialState: TransactionState = {
  activePageItems: [],
  pagedTransactions: {
    pages: [
      {
        pageNumber: 1,
        items: [],
        transactionPagination: {
          accountIds: "",
          total: 0,
          pageSize: 10,
          pageNumber: 1,
          sortBy: "date",
          sortDirection: "desc",
          startDate: "",
          endDate: "",
          tagSearchValue: "",
          userId: "",
          userNotesSearchValue: "",
        },
      },
    ],
  },
  transactionPagination: {
    accountIds: "",
    total: 0,
    pageSize: 10,
    pageNumber: 1,
    sortBy: "date",
    sortDirection: "desc",
    startDate: "",
    endDate: "",
    tagSearchValue: "",
    userId: "",
    userNotesSearchValue: "",
  },
};

export const transactionSlice = createSlice({
  name: 'transactions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActivePageItems: (state, action) => {
      state.activePageItems = action.payload
    },
    setPagedTransactions: (state, action) => {
      state.transactionPagination.total = action.payload.total;
      // Look for cached page:  (TO-DO:  THUNKs for cache pull / API retrieval)
      let targetPage = state.pagedTransactions.pages.find(page => page.pageNumber === state.transactionPagination.pageNumber);
      if(targetPage && targetPage.transactionPagination && isEqual(targetPage.transactionPagination, state.transactionPagination)){
        targetPage.items = action.payload.items;
      }
      else{
        const deleteFirstItem = state.pagedTransactions.pages[0].pageNumber === 1 && state.pagedTransactions.pages[0].items.length === 0 ? 1 : 0;
        state.pagedTransactions.pages.splice(state.transactionPagination.pageNumber - 1, deleteFirstItem, 
          {items: action.payload.items, pageNumber: state.transactionPagination.pageNumber, transactionPagination: state.transactionPagination});
      }
    },
    setPaginationAccountIds: (state, action) => {
      state.transactionPagination.accountIds = action.payload
    },
    setPaginationEndDate: (state, action) => {
      state.transactionPagination.endDate = action.payload
    },
    setPaginationPageNumber: (state, action) => {
      state.transactionPagination.pageNumber = action.payload
    },
    setPaginationPageSize: (state, action) => {
      state.transactionPagination.pageSize = action.payload
    },
    setPaginationSortBy: (state, action) => {
      state.transactionPagination.sortBy = action.payload
    },
    setPaginationSortDirection: (state, action) => {
      state.transactionPagination.sortDirection = action.payload
    },
    setPaginationStartDate: (state, action) => {
      state.transactionPagination.startDate = action.payload
    },
    setPaginationTagSearchValue: (state, action) => {
      state.transactionPagination.tagSearchValue = action.payload
    },
    setPaginationTotal: (state, action) => {
      state.transactionPagination.total = action.payload
    },
    setPaginationUserId: (state, action) => {
      state.transactionPagination.userId = action.payload
    },
    setPaginationUserNotesSearchValue: (state, action) => {
      state.transactionPagination.userNotesSearchValue = action.payload
    },
  },
})

export const { 
  setActivePageItems,
  setPagedTransactions,
  setPaginationAccountIds,
  setPaginationEndDate,
  setPaginationPageNumber, 
  setPaginationPageSize,
  setPaginationSortBy, 
  setPaginationSortDirection,
  setPaginationStartDate,
  setPaginationTagSearchValue,
  setPaginationTotal,
  setPaginationUserId,
  setPaginationUserNotesSearchValue } = transactionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActivePageItems = (state: RootState) => state.transactionSlice.activePageItems
export const selectPagedTransactions = (state: RootState) => state.transactionSlice.pagedTransactions
export const selectTransactionPagination = (state: RootState) => state.transactionSlice.transactionPagination

export default transactionSlice.reducer 