import { createSlice } from "@reduxjs/toolkit";
import { allInquary, createBanner, createGalleryImage, deleteBanner, deleteImage, deleteInquary, getAllUsers, listBanner, listGalleryImage, listInquary, listPlan, userLogin } from "./userActions";

const initialState = {
  loading: false,
  userInfo: sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null,
  error: null,
  success: false,
  banner:null,
  gallery:null,
  plan:null,
  myInquary:null,
  banner:null,
  gallery:null,
  allusers:null,
  allInquary:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("userInfo"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
    clearmsg:(state)=>{
      state.error=null;
      state.success=false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allusers = payload;
        state.success = true;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      //All Enquaries 
      .addCase(listInquary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listInquary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allInquary = payload;
        state.success = true;
      })
      .addCase(listInquary.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      //Banner Delete 
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
      })
      .addCase(deleteBanner.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //image Delete 
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
      })
      .addCase(deleteImage.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //Create new Banner
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
      })
      .addCase(createBanner.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //Banner 
      //Create new image
      .addCase(createGalleryImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGalleryImage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
      })
      .addCase(createGalleryImage.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //Banner 
      .addCase(listBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listBanner.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.banner = payload;
        state.success = true;
      })
      .addCase(listBanner.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      //galllery
      .addCase(listGalleryImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listGalleryImage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.gallery = payload;
        state.success = true;
      })
      .addCase(listGalleryImage.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      //All Inquaries 
      .addCase(allInquary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allInquary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.myInquary = payload;
        state.success = true;
      })
      .addCase(allInquary.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteInquary.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(deleteInquary.fulfilled,(state,{payload})=>{
         state.loading=true;
         state.status=payload;
      })
      .addCase(deleteInquary.rejected,(state,{payload})=>{
         state.loading=true;
         state.error=payload;

      })
      //get all plan
      .addCase(listPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listPlan.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.listPlan = payload;
        state.success = true;
      })
      .addCase(listPlan.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
    // You can add more cases for other actions here...
  },
});
// export actions
export const { logout, clearmsg } = userSlice.actions;
export default userSlice.reducer;
