import { supabase } from "./supabase";

export const fetchTasks = async function (listId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("todo_list_id", listId);

  if (error) {
    throw new Error("Something went wrong with fetching tasks");
  }

  return data;
};

export const addTask = async function (
  title: string,
  description: string,
  listId: string
) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, description, is_completed: false, todo_list_id: listId }])
    .select();

  if (error) {
    throw new Error("Something went wrong with add task");
  }

  return data;
};

export const updateTask = async function (id: string, is_completed: boolean) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ is_completed })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Something went wrong with update task");
  }
  return data;
};

export const deleteTask = async function (id: string) {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Something went wrong with delete task");
  }
  return data;
};
