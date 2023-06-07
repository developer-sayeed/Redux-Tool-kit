import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  GEt All User data

export const featchAllUser = createAsyncThunk(
  "user/featchAllUser",
  async () => {
    const response = await axios.get("http://localhost:5050/api/v1/user");
    return response.data;
  }
);

//  Delate   User data

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`http://localhost:5050/api/v1/user/${id}`);
  return id;
});

//  Create  User data

export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/user/`,
      data
    );
    console.log(response.data);
  } catch (error) {
    return error.response.data.message;
  }
});
