import { supabase } from "./supabase";

export const fetchTodoLists = async function () {
  const { data, error } = await supabase.from("todo_lists").select("*");

  if (error) {
    throw new Error("Something went wrong with fetching lists");
  }

  return data;
};

export const createTodoList = async function (title: string, userId: string) {
  const { data, error } = await supabase
    .from("todo_lists")
    .insert([
      {
        title: title,
        user_id: userId,
      },
    ])
    .select();

  console.log(error);

  if (error) {
    throw new Error("Something went wrong with creating list");
  }
  return data;
};

export const deleteTodoList = async function (id: string) {
  const { error: taskDeleteError } = await supabase
    .from("tasks")
    .delete()
    .eq("todo_list_id", id);

  if (taskDeleteError) {
    throw new Error("Failed to delete tasks related to the list");
  }

  const { error: listDeleteError } = await supabase
    .from("todo_lists")
    .delete()
    .eq("id", id);

  if (listDeleteError) {
    throw new Error("Something went wrong with deleting the list");
  }
};

export const updateTodoList = async function (id: string, title: string) {
  const { data, error } = await supabase
    .from("todo_lists")
    .update({ title })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Something went wrong with updating the list");
  }

  console.log(data);

  return data;
};
