import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/tasks/TaskSlide";
import listReducer from "./features/lists/ListSlide";

const store = configureStore({
  reducer: {
    lists: listReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
