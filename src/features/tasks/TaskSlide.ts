import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../../services/apiTasks";
import type { Task } from "../../types/tasks";

export const loadTasks = createAsyncThunk(
  "tasks/load",
  async (listId: string) => {
    return await fetchTasks(listId);
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async ({ title, listId }: { title: string; listId: string }) => {
    const created = await addTask(title, "", listId);
    return created[0];
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggle",
  async ({ id, is_completed }: { id: string; is_completed: boolean }) => {
    const updated = await updateTask(id, is_completed);
    return updated[0];
  }
);

export const removeTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        return state.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      });
  },
});

export default taskSlice.reducer;
