import { configureStore } from '@reduxjs/toolkit'
import msalSlice from './msalSlice';
import plaidSlice from './plaidSlice';

export const store = configureStore({
  reducer: {
    msalSlice: msalSlice,
    plaidSlice: plaidSlice
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store