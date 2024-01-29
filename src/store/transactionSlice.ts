import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";
import type { RootState } from "./store";
import axiosInstance  from "@utils/axiosInstance";

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
  amountFrom: number,
  amountTo: number,
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
  isLoading: boolean,
  pagedTransactions: PagedTransactions,
  transactionPagination: TransactionPagination
}
// Define the initial state using that type
const initialState: TransactionState = {
  activePageItems: [],
  isLoading: false,
  pagedTransactions: {
    pages: [
      {
        pageNumber: 1,
        items: [],
        transactionPagination: {
          accountIds: "",
          amountFrom: 0,
          amountTo: 0,
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
    amountFrom: 0,
    amountTo: 0,
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

// Thunk function
export function getPagedTransactions(
  transactionPagination: TransactionPagination
) {
  return async function (dispatch, getState) {
    let targetPage = getState().transactionSlice.pagedTransactions.pages.find(
      (page) => page.pageNumber === transactionPagination.pageNumber
    );
    if (
      !targetPage || targetPage == undefined ||
      !targetPage.transactionPagination || targetPage.transactionPagination == undefined ||
      !targetPage.items || targetPage.items == undefined || targetPage.items.length === 0 ||
      !isEqual(targetPage.transactionPagination, transactionPagination)
    ) {
      console.log("No cached page found - Call the API");
      dispatch(setIsLoading(true));
      //API Call:
      try {
        const response = await axiosInstance.post(
          "transactions",
          transactionPagination
        );

        dispatch(setPagedTransactions(response.data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      console.log("Cached page found");
    }
  };
}

export const transactionSlice = createSlice({
  name: "transactions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActivePageItems: (state, action) => {
      state.activePageItems = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
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
    setPaginationPageSize: (state, action) => {
      state.transactionPagination.pageSize = action.payload
    },
    setPaginationSortBy: (state, action) => {
      state.transactionPagination.sortBy = action.payload
    },
    setPaginationSortDirection: (state, action) => {
      state.transactionPagination.sortDirection = action.payload
    },
    setPaginationTotal: (state, action) => {
      state.transactionPagination.total = action.payload
    },
    setPaginationUserId: (state, action) => {
      state.transactionPagination.userId = action.payload
    },
    setTransactionPagination: (state, action) => {
      state.transactionPagination = action.payload
    },
    setUpdatedTransactionItem: (state, action) => {
      state.pagedTransactions.pages.forEach((page, pageIndex) => {
        let targetItemIndex = page.items.findIndex((item) => item.id === action.payload.id);
        if(targetItemIndex > -1){
          state.pagedTransactions.pages[pageIndex].items[targetItemIndex] = {
            ...page.items[targetItemIndex],
            userNotes: action.payload.userNotes,
            tags: action.payload.tags,
            userDescription: action.payload.userDescription,
          } 
        }
      });
    },
  },
})

export const { 
  setActivePageItems,
  setIsLoading,
  setPagedTransactions,
  setPaginationAccountIds,
  setPaginationPageSize,
  setPaginationSortBy, 
  setPaginationSortDirection,
  setPaginationTotal,
  setPaginationUserId,
  setTransactionPagination,
  setUpdatedTransactionItem } = transactionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActivePageItems = (state: RootState) => state.transactionSlice.activePageItems
export const selectPagedTransactions = (state: RootState) => state.transactionSlice.pagedTransactions
export const selectTransactionPagination = (state: RootState) => state.transactionSlice.transactionPagination

export default transactionSlice.reducer 