import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTodoList,
  deleteTodoList,
  fetchTodoLists,
  updateTodoList,
} from "../../services/apiLists";
import type { TodoList } from "../../types/task-lists";

export const loadLists = createAsyncThunk("lists/load", async () => {
  return await fetchTodoLists();
});

export const createList = createAsyncThunk(
  "lists/create",
  async ({ title, userId }: { title: string; userId: string }) => {
    const newList = await createTodoList(title, userId);
    return newList[0];
  }
);

export const removeList = createAsyncThunk(
  "lists/delete",
  async (id: string) => {
    await deleteTodoList(id);
    return id;
  }
);

export const renameList = createAsyncThunk(
  "lists/update",
  async ({ id, title }: { id: string; title: string }) => {
    const updated = await updateTodoList(id, { title });
    return updated[0];
  }
);

interface ListState {
  lists: TodoList[];
  activeList: TodoList | null;
  loading: boolean;
}

const initialState: ListState = {
  lists: [],
  activeList: null,
  loading: false,
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setActiveList(state, action) {
      state.activeList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload);
        if (state.activeList?.id === action.payload) {
          state.activeList = null;
        }
      })
      .addCase(renameList.fulfilled, (state, action) => {
        const index = state.lists.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
        if (state.activeList && state.activeList?.id === action.payload.id) {
          state.activeList.title = action.payload.title;
        }
      });
  },
});

export const { setActiveList } = listSlice.actions;
export default listSlice.reducer;
