import { configureStore } from '@reduxjs/toolkit'
import msalSlice from './msalSlice';
import plaidSlice from './plaidSlice';
import userSlice from './userSlice';
import accountSlice from './accountSlice';
import alertSlice from './alertSlice';
import transactionSlice from './transactionSlice';

export const store = configureStore({
  reducer: {
    accountSlice: accountSlice,
    alertSlice: alertSlice,
    msalSlice: msalSlice,
    plaidSlice: plaidSlice,
    transactionSlice: transactionSlice,
    userSlice: userSlice
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store