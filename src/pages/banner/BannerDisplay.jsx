import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputLabel,
  TextField
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  createBanner,
  deleteBanner,
  listBanner,
} from "../../store/auth/userActions";

const BannerDisplay = () => {
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.user);
  const [update, setUpdate] = useState(false);
  const [banners, setBanners] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);

  useEffect(() => {
    if (banner) {
      setBanners(banner);
    }
  }, [banner]);

  useEffect(() => {
    dispatch(listBanner());
  }, [update, dispatch]);

  const handleFileChange = (event) => {
    setBannerFile(event.target.files[0]);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });
    if(result.isConfirmed){
     let response= await dispatch(deleteBanner(id));
       if(response.payload.message=="Banner deleted successfully"){
        setUpdate(!update);
        Swal.fire("Deleted!", "Banner has been deleted.", "success");
       }else{
        Swal.fire("Error", "Failed to delete banner.", "error");
       }
     }
       } catch (err) {
      Swal.fire("Error", "Failed to delete banner.", "error");
    }
  };

  const handleUploadBanner = async () => {
    if (!bannerFile) return;

    const formData = new FormData();
    formData.append("banner", bannerFile);
    formData.append("title", "image");
    formData.append("position", "Middle");

    try {
      await dispatch(createBanner(formData));
      setUpdate(!update);
      Swal.fire("Uploaded!", "Banner has been uploaded.", "success");
      handleCloseDialog();
    } catch (error) {
      console.log("Error", error);
      Swal.fire("Error", "Failed to upload banner.", "error");
    }
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setBannerFile(null);
  };

  if (!banners) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ color: 'white' }} gutterBottom>
        Banner Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpenDialog}
      >
        Add Banner
      </Button>
      <Grid container spacing={2} marginTop={2}>
        {banners.map((banner, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: 200,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${banner.imageUrls[0]?.path}`}
                alt={`Banner ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "white",
                  backgroundColor: "red",
                }}
                onClick={() => handleDelete(banner?.id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: "linear-gradient(135deg, #141E30, #243B55)", color: '#FFFFFF' }}>Add Banner</DialogTitle>
        <DialogContent dividers sx={{ background: "linear-gradient(135deg, #141E30, #243B55)", color: '#FFFFFF' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <InputLabel htmlFor="banner-upload" sx={{ marginBottom: 2, color: '#FFFFFF' }}>
              Upload Banner Image
            </InputLabel>
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: '#007BFF', 
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#0056B3', 
                },
              }}
            >
              Choose File
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {bannerFile && (
              <Typography variant="body2" sx={{ marginTop: 2, color: '#FFFFFF' }}>
                Selected File: {bannerFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ background: "linear-gradient(135deg, #141E30, #243B55)" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: '#FF5252', 
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#D32F2F',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadBanner}
            sx={{
              backgroundColor: '#00C853', 
              color: '#FFFFFF', 
              '&:hover': {
                backgroundColor: '#009624',
              },
            }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default BannerDisplay;
