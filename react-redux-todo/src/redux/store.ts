import { configureStore } from '@reduxjs/toolkit';
import reduxToDosSliceReducer from './reduxToDosSlice';

const store = configureStore({
  reducer: {
    reduxToDos: reduxToDosSliceReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
