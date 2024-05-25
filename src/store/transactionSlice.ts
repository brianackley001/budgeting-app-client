import { createSlice  } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";
import type { RootState } from "./store";
import axiosInstance  from "@utils/axiosInstance";
import { paginationLinkSet } from "@utils/transactionUtils";
import { logError, logEvent } from "@utils/logger";

interface TransactionItem {
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
      items: TransactionItem[],
      transactionPagination: TransactionPagination
    }
  ]
}

interface TransactionPagination {
  accountIds: string[],
  amountFrom: number,
  amountTo: number,
  categorySearchValue: string,
  total: number,
  merchantNameSearchValue: string,
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
  syncTransactionRequest: {
    inProgress: false,
    errors: [],
    standAloneRequest: false,
  },
  transactionPagination: TransactionPagination,
  transactionViewIsFiltered: boolean,
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
          accountIds: [],
          amountFrom: 0,
          amountTo: 0,
          categorySearchValue: "",
          total: 0,
          merchantNameSearchValue: "",
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
  syncTransactionRequest: {
    inProgress: false,
    errors: [],
    standAloneRequest: false,
  },
  transactionPagination: {
    accountIds: [],
    amountFrom: 0,
    amountTo: 0,
    categorySearchValue: "",
    total: 0,
    merchantNameSearchValue: "",
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
  transactionViewIsFiltered: false,
};

export const isNewSearchRequest = (requestedTransactionPagination: TransactionPagination, prevTransactionPagination: TransactionPagination) => {
  return !isEqual(requestedTransactionPagination, prevTransactionPagination) && requestedTransactionPagination.pageNumber === 1; 
};

// Thunk function(s)
export function getExportedTransactions(transactionPagination: TransactionPagination) {
  return async function (dispatch, getState) {
    const userId = getState().userSlice.userId;
    // Using data from redux (slice, RTK Query whatever) can cause problems as the values are immutable - clone the object to manipulate it
    const requestPagination = JSON.parse(JSON.stringify(transactionPagination));
    requestPagination.pageSize = transactionPagination.total;
    requestPagination.pageNumber = 1;
    

      //API Call:
      try {
        logEvent("exportFilteredTransactions", 
        {
          pageNumber: "1", 
          pageSize: transactionPagination.total.toString(), 
          sortBy: transactionPagination.sortBy, 
          sortDirection: transactionPagination.sortDirection,
          merchantNameSearchValue: transactionPagination.merchantNameSearchValue,
          userNotesSearchValue: transactionPagination.userNotesSearchValue,
          accountIds: transactionPagination.accountIds.join(","),
          categorySearchValue: transactionPagination.categorySearchValue,
          tagSearchValue: transactionPagination.tagSearchValue,
          amountFrom: transactionPagination.amountFrom.toString(),
          amountTo: transactionPagination.amountTo.toString(),
          startDate: transactionPagination.startDate,
          endDate: transactionPagination.endDate,
          userId: transactionPagination.userId
        });
        const response = await axiosInstance.post(
          "transactions",
          requestPagination
        );

        const csvData = response.data.items.map((item) => {
          return {
            Date: item.date,
            Merchant: item.merchantName,
            Amount: item.amount,
            Category: item.personalFinanceCategory.primary,
            Description: item.userDescription,
            Tags: item.tags.join(" - "),
            Notes: item.userNotes,
          }
        });
        return csvData;
        
      } catch (error) {
        console.log(error);
        logError(error as Error);
      } finally {
        dispatch(setIsLoading(false));
      }
  }
};

export function getPagedTransactions(
  transactionPagination: TransactionPagination
) {
  return async function (dispatch, getState) {
    const userId = getState().userSlice.userId;
    // Using data from redux (slice, RTK Query whatever) can cause problems as the values are immutable - clone the object to manipulate it
    const requestPagination = JSON.parse(JSON.stringify(transactionPagination));
    
    let targetPage = getState().transactionSlice.pagedTransactions.pages.find(
      (page) => page.pageNumber === transactionPagination.pageNumber
    );
    if (
      !targetPage?.transactionPagination ||
      targetPage?.items.length === 0 ||
      !isEqual(targetPage.transactionPagination, transactionPagination)
    ) {
      dispatch(setIsLoading(true));

      // ensure accountIds are hydrated - if not present in transactionPagination, check accountSlice
      if (transactionPagination.accountIds.length ===0) {
        const accountIds = getState().accountSlice.accounts.map(account => account.accountId).map(accountId => accountId.toString());
        dispatch(setTransactionPagination({
          ...transactionPagination,
          accountIds: accountIds,
          userId: userId
        }));
        requestPagination.accountIds = accountIds;
        requestPagination.userId = userId;
      }

      //API Call:
      try {
        logEvent("getPagedTransactions", 
        {
          pageNumber: transactionPagination.pageNumber.toString(), 
          pageSize: transactionPagination.pageSize.toString(), 
          sortBy: transactionPagination.sortBy, 
          sortDirection: transactionPagination.sortDirection,
          merchantNameSearchValue: transactionPagination.merchantNameSearchValue,
          userNotesSearchValue: transactionPagination.userNotesSearchValue,
          accountIds: transactionPagination.accountIds.join(","),
          categorySearchValue: transactionPagination.categorySearchValue,
          tagSearchValue: transactionPagination.tagSearchValue,
          amountFrom: transactionPagination.amountFrom.toString(),
          amountTo: transactionPagination.amountTo.toString(),
          startDate: transactionPagination.startDate,
          endDate: transactionPagination.endDate,
          userId: transactionPagination.userId
        });
        const response = await axiosInstance.post(
          "transactions",
          requestPagination
        );

        dispatch(setPagedTransactions(response.data));
        if(isNewSearchRequest(transactionPagination, getState().transactionSlice.transactionPagination)){
          const pageRequestSize = Number(import.meta.env.VITE_TRANSACTION_PAGINATION_SET_SIZE) || 5;
          const pages = Math.ceil(response.data.total / getState().userSlice.preferences.transactionItemsPerPage);
          const paginationLinks = paginationLinkSet(1,-1,pageRequestSize, pages, false, false);
          dispatch(setActivePageItems(paginationLinks));
        }
        
      } catch (error) {
        console.log(error);
        logError(error as Error);
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      //console.log("Cached page found");
    }
  };
}

export function syncTransactions(userId: string) {
  return async function (dispatch, getState) {
    let requestErrors = [];
    //API Call:
    try {
      logEvent("syncTransactions THUNK STARTED", { userId: userId});
      const response = await axiosInstance.post("transactionsSync", { userId: userId });
      if(response.data.errors && response.data.errors.length > 0){
        console.error(`transactionSlice - syncTransactions: loginFailed = true`);
        requestErrors = response.data.errors;
      }
      const currentSyncRequest = getState().transactionSlice.syncTransactionRequest;
      dispatch(setSyncTransactionRequest({inProgress: false, standAloneRequest: currentSyncRequest.standAloneRequest, errors: requestErrors}));
      //hydrate 1st page of pagedTransactions...
      dispatch(getPagedTransactions(getState().transactionSlice.transactionPagination));

    } catch (error) {
      console.log(error);
      logError(error as Error);
    } finally {
      logEvent("syncTransactions THUNK COMPLETED", { userId: userId });
    }
    return requestErrors;
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
      if(targetPage?.transactionPagination && isEqual(targetPage.transactionPagination, state.transactionPagination)){
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
    setSyncTransactionRequest: (state, action) => {
      state.syncTransactionRequest = action.payload
    },
    setTransactionPagination: (state, action) => {
      state.transactionPagination = action.payload
    },
    setTransactionViewIsFiltered: (state, action) => {
      state.transactionViewIsFiltered = action.payload
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
  setSyncTransactionRequest,
  setTransactionPagination,
  setTransactionViewIsFiltered,
  setUpdatedTransactionItem } = transactionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActivePageItems = (state: RootState) => state.transactionSlice.activePageItems
export const selectPagedTransactions = (state: RootState) => state.transactionSlice.pagedTransactions
export const selectSyncTransactionRequest = (state: RootState) => state.transactionSlice.syncTransactionRequest
export const selectTransactionPagination = (state: RootState) => state.transactionSlice.transactionPagination

export default transactionSlice.reducer 