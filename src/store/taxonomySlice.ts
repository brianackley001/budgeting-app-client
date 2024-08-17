import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import taxonomyData from "@/data/plaid_category_taxonomy.json" 


// interface TaxonomyItem {
//     primary: string,
//     detailed: string,
//     description: string
//   }
  // Define a type for the slice state
  interface TaxonomyState {
    items: []
  }
  // Define the initial state using that type
  const initialState = {
    items: taxonomyData.sort((a, b) => a.primary.localeCompare(b.primary))
  }

   
  export const trendSlice = createSlice({
    name: 'taxonomy',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: { },
  })
  // Other code such as selectors can use the imported `RootState` type
  export const selectTaxonomyItems = (state: RootState) => state.taxonomySlice.items
  
  export default trendSlice.reducer