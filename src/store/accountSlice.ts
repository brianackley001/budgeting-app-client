import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axiosInstance  from "@utils/axiosInstance";
import { getPagedTransactions, setPaginationAccountIds, setPaginationUserId, syncTransactions } from "@store/transactionSlice";

interface accountItem {
  [x: string]: unknown;
  id: string,
  balances: {available: number, current: number, limit: number, isoCurrencyCode: string, unofficialCurrencyCode: string},
  mask: string,
  name: string,
  customName: string,
  type: string,
  subtype: string,
  institutionId: string,
  institutionName: string,
  userId: string
}
interface institutionItem {
  id: string,
  name: string
}

// Define a type for the slice state
interface AccountState {
  accounts: accountItem[],
  institutions: institutionItem[]
}
// Define the initial state using that type
const initialState: AccountState = {
  accounts: [],
  institutions: []
}

// Thunk function
export function getAccountBalances(userId) {
  return async function (dispatch) {
      //API Call:
      try {
        const response = await axiosInstance.post(`accountbalance`, {userId: userId});
        await dispatch(setAccounts(response.data));
      } catch (error) {
        console.log(error);
      }
  };
}

// Thunk function
export function upsertAccount(userId, account) {
  return async function (dispatch) {
      //API Call:
      try {
        const response = await axiosInstance.post("account", {
          userId: userId,
          account: account,
        });

        dispatch(setAccounts(response.data.accounts));
      } catch (error) {
        console.log(error);
      }
  };
}

// Thunk function
export function getItemAccounts(userId, itemId) {
  return async function (dispatch, getState) {
      //API Call:
      try {
        const response = await axiosInstance.post('item/accounts', {
          userId: userId,
          itemId: itemId,
        });

        // Given this represents a new item (institution)and a reset of the user.accounts, reflect the latest accounts
        //  in the transactionPagination context
        const itemAccountIds = response.data.map((account) => account.accountId);
        const tranPagination = getState().transactionSlice.transactionPagination; 

        if (tranPagination.accountIds && tranPagination.accountIds.length > 0) {
          const newAccountIdSet = new Set([...tranPagination.accountIds.split(","), ...itemAccountIds]);
          const accountIds = Array.from(newAccountIdSet).sort().join(",");
          await dispatch(setPaginationAccountIds(accountIds));
        } else {
          const accountIds = itemAccountIds;
          await dispatch(setPaginationAccountIds(accountIds.toString()));
        }
        if(tranPagination.userId !== userId) {
          dispatch(setPaginationUserId(userId));
        }

        // Check accountIds - if any map to type "Investment" then call API for investments for the specified itemId

        // Reflect the latest accounts in the user.accounts context
        await dispatch(setAccounts(response.data));
        // Refresh the transactions as well...
        const institution = {
          institutionId: response.data[0].institutionId, 
          institutionName: response.data[0].institutionName
        }
        await syncTransactions(userId, itemId, institution, true);
      } catch (error) {
        console.log(error);
      }
  };
}

export const accountSlice = createSlice({
  name: 'accounts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setInstitutions: (state, action) => {
      state.institutions = action.payload;
    },
  },
})

export const { setAccounts, setInstitutions } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAccounts = (state: RootState) => state.accountSlice.accounts
export const selectInstitutions = (state: RootState) => state.accountSlice.institutions

export default accountSlice.reducer 