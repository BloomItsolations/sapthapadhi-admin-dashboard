import { createAsyncThunk } from "@reduxjs/toolkit";
import tripApi from "../../api/tripApi";

export const userLogin = createAsyncThunk(
  "userLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await tripApi.post(
        "/auth/admin/login",
        formData,
        config
      );

      console.log("after login return data",data);
      sessionStorage.setItem("userInfo", JSON.stringify(data?.userDetails));
      return data?.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
