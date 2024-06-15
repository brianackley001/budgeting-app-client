import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axiosInstance  from "@utils/axiosInstance";
import { logError, logEvent } from "@utils/logger";


// Define a type for the slice state
interface NetIncomeSummaryItem {
    amount: number,
    month: number,
    year:  string
  };
  interface MonthOverMonthSummaryItem {
    amount: number,
    month: number,
    day:  string
  }
  interface TrendState {
    isLoading: boolean,
    netIncomeSummary: NetIncomeSummaryItem[],
    monthOverMonthSummary: MonthOverMonthSummaryItem[]
  }
  
  // Define the initial state using that type
  const initialState: TrendState = {
    isLoading: false,
    netIncomeSummary: [],
    monthOverMonthSummary: []
  }

  
export function getNetIncomeSummary(accountIds, startDate, endDate) {
    return async function (dispatch) {
        //API Call:
        try {
          dispatch(setIsLoading(true));
          logEvent("getNetIncomeSummary", {
            accountIds: accountIds.join(","),
            startDate: startDate,
            endDate: endDate,
          });

          const response = await axiosInstance.post("trends/overview", {
            accountIds: accountIds,
            startDate: startDate,
            endDate: endDate,
          });
          //console.log(response.data);
          dispatch(setNetIncomeSummaryItems(response.data));
        } catch (error) {
          console.log(error);
          logError(error as Error);
        } finally {
          dispatch(setIsLoading(false));
        }
    }
  };
  export function getMonthOverMonthSummary(accountIds, startDate, endDate) {
      return async function (dispatch) {
          //API Call:
          try {
            dispatch(setIsLoading(true));
            logEvent("getMonthOverMonthSummary", {
              accountIds: accountIds.join(","),
              startDate: startDate,
              endDate: endDate,
            });
  
            const response = await axiosInstance.post("trends/monthlyTotal", {
              accountIds: accountIds,
              startDate: startDate,
              endDate: endDate,
            });
            //console.log(response.data);
            dispatch(setMonthOverMonthSummaryItems(response.data));
          } catch (error) {
            console.log(error);
            logError(error as Error);
          } finally {
            dispatch(setIsLoading(false));
          }
      }
    };
  
  export const trendSlice = createSlice({
    name: 'trend',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      setIsLoading: (state, action) => {
        state.isLoading = action.payload;
      },
      setNetIncomeSummaryItems: (state, action) => {
        state.netIncomeSummary = action.payload;
      },
      setMonthOverMonthSummaryItems: (state, action) => {
        state.monthOverMonthSummary = action.payload;
      },
    },
  })
  
  export const { setIsLoading, setNetIncomeSummaryItems, setMonthOverMonthSummaryItems} = trendSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  export const selectNetIncomeSummaryItems = (state: RootState) => state.trendSlice.netIncomeSummary
  export const selectMonthOverMonthSummaryItems = (state: RootState) => state.trendSlice.monthOverMonthSummary
  
  export default trendSlice.reducer