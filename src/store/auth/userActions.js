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



export const createPlan = createAsyncThunk(
  "plan/create",
  async (formdata, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.post("/admin/createplan",formdata, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const listPlan = createAsyncThunk(
  "list/plan",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.get("/app/listplan", config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const updatePlan = createAsyncThunk(
  "list/plan",
  async ({id,formdata}, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.put(`/admin/updatePlan/${id}`,formdata, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const listUser = createAsyncThunk(
  "list/user",
  async ({id,formdata}, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.get(`/admin/allusers`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const creatNewUser = createAsyncThunk(
  "user/newUser",
  async ({id,formdata}, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.post(`/admin/createuser`,formdata,config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const updateUser = createAsyncThunk(
  "user/UPdateUser",
  async ({id,formdata}, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.put(`/admin/updateuser/${id}`,formdata,);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const listCouple = createAsyncThunk(
  "all/coupleList",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.get(`/admin/couples`,config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const createCouple = createAsyncThunk(
  "new/couple",
  async (formdata, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.post(`/admin/createCouple`,formdata,config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const updateCouple = createAsyncThunk(
  "update/couple",
  async ({id,formData}, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.patch(`/admin/updateCouple/${id}`, formData, config)
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const creatNewCouple = createAsyncThunk(
  "user/newCouple",
  async ({formdata}, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.post(`/admin/createCouple`,formdata,config);
      console.log("Data",data)
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const deleteCouple = createAsyncThunk(
  "delete/couple",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { authInfo } = getState().auth;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };
      const { data } = await tripApi.delete(`/admin/deleteCouple/${id}`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const allInquary = createAsyncThunk(
  "all/inquaries",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await tripApi.get(`/admin/list-enquiry`,);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);
export const deleteInquary = createAsyncThunk(
  'delete/Inquary',
  async (id, { getState, rejectWithValue }) => {
    console.log('ID of inquiry:', id);

    try {
      // Retrieve authentication info from state
      const  {userInfo}  = getState().user;
      console.log("authInfo,",userInfo);

      // Configure headers for the request
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log('Making API call...');
      
      const response = await tripApi.delete(`/admin/deleteInquary/${id}`, config);

      console.log('Response from API:', response);

      // Return the response data upon success
      return response.data;
    } catch (error) {
      console.error('Error during API call:', error);

      // Handle known errors (e.g., with response and data)
      if (error.response && error.response.data?.error) {
        return rejectWithValue(error.response.data.error);
      }

      // Handle unknown errors
      return rejectWithValue(error.message || 'An unknown error occurred.');
    }
  }
);



export const createBanner = createAsyncThunk(
  "create/banner",
  async (formData, { getState, rejectWithValue }) => {
    console.log("Formdata",formData)
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await tripApi.post(`/admin/create-banner`,formData,config);
     
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const deleteBanner = createAsyncThunk(
  "delete/banner",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { data } = await tripApi.delete(`/admin/delete-banner/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const listBanner = createAsyncThunk(
  "list/banner",
  async (_, { getState, rejectWithValue }) => {
    try {   
      const { data } = await tripApi.get("/admin/listBanner");
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createGalleryImage = createAsyncThunk(
  "add/galleryimage",
  async (formData, { getState, rejectWithValue }) => {
    console.log("Formdata", formData);
    const { authInfo } = getState().auth;

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authInfo.token}`,
        },
      };

      const { data } = await tripApi.post(`/admin/addGallery`, formData, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Error response from server:", error.response.data.error);
        return rejectWithValue(error.response.data.error);
      }

      console.error("General error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);


export const listGalleryImage = createAsyncThunk(
  "list/gallery",
  async (_, { getState, rejectWithValue }) => {
    try {   
      const { data } = await tripApi.get("/admin/getGallery");
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const deleteImage = createAsyncThunk(
  "delete/image",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { data } = await tripApi.delete(`/admin/deleteGallery/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);



export const getAllUsers = createAsyncThunk(
  "all/users",
  async (_, { getState, rejectWithValue }) => {
    try {
      const  {userInfo}  = getState().user;  
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await tripApi.get("/admin/getUserDetails", config);
      return data;
    } catch (error) {
      console.log("Error",error);
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);


export const createNewUser = createAsyncThunk(
  "create/users",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const  {userInfo}  = getState().user;  
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await tripApi.post("/auth/user/create",userData, config);
      return data;
    } catch (error) {
      console.log("Error",error);
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);



export const listInquary = createAsyncThunk(
  "all/enquaries",
  async (_, { getState, rejectWithValue }) => {
    try {
      const  {userInfo}  = getState().user;  
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await tripApi.get("/admin/list-enquiry", config);
      return data;
    } catch (error) {
      console.log("Error",error);
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);
