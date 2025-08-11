import type { User } from "../types/users";
import { supabase } from "./supabase";

export const createUser = async function (user: User) {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
      },
    },
  });

  if (error) {
    throw new Error("Something went wrong with signup new user");
  }

  alert("Check your email for verification link");
  console.log(data, error);
  return data;
};

export const loginUser = async function (user: User) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  if (error) {
    throw new Error("Something went wrong with login user");
  }

  console.log(data, error);
  return data;
};
