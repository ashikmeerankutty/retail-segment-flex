import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchTodos = createAsyncThunk("Fetch Todos", async (params) => {
  const data = await axios
    .get("https://jsonplaceholder.typicode.com/todos/")
    .then((resp) => resp.data);
  return data;
});

export const fetchPosts = createAsyncThunk("Fetch Posts", async (params) => {
  const data = await axios
    .get("https://jsonplaceholder.typicode.com/posts/")
    .then((resp) => resp.data);
  return data;
});