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
      await dispatch(deleteBanner(id));
      setUpdate(!update);
      Swal.fire("Deleted!", "Banner has been deleted.", "success");
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
      console.log("Error",error);
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
      <Typography variant="h4" gutterBottom>
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
                src={`https://sapthapadhi.bloomitsolutions.co.in/${banner.imageUrls[0]?.path}`}
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
        <DialogTitle>Add Banner</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" alignItems="center">
            <InputLabel htmlFor="banner-upload" sx={{ marginBottom: 2 }}>
              Upload Banner Image
            </InputLabel>
            <Button
              variant="contained"
              component="label"
              color="primary"
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
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Selected File: {bannerFile.name}
              </Typography>
            )}
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUploadBanner} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BannerDisplay;
