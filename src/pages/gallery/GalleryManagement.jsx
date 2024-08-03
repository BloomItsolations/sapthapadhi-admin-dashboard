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
  IconButton
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";
import { deleteImage, listGalleryImage } from "../../store/auth/userActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import tripApi from "../../api/tripApi";

const GalleryManagement = () => {
  const dispatch = useDispatch();
  const [galleryImages, setGalleryImages] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [update, setUpdate] = useState(false);
  const { gallery } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(listGalleryImage());
  }, [update, dispatch]);

  useEffect(() => {
    if (gallery) {
      setGalleryImages(gallery);
    }
  }, [gallery,update]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // i will update this code, after some time.
  let token=JSON.parse(sessionStorage.getItem('userInfo'));
 
  const handleUploadImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await tripApi.post('/admin/addGallery', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.token}`,
        },
      });
      Swal.fire("Uploaded!", "Image has been uploaded.", "success");
      setUpdate(!update);
      handleCloseDialog();
    } catch (error) {
      console.error("Error", error);
      Swal.fire("Error", "Failed to upload image.", "error");
    }
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedFile(null);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      dispatch(deleteImage(imageId));
      Swal.fire("Deleted!", "Image has been deleted.", "success");
      setUpdate(!update)
    } catch (error) {
      Swal.fire("Error", "Failed to delete image.", "error");
    }
  };

  if (!galleryImages) {
    return <div>Loading....</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gallery Management
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog}>
        Add Image
      </Button>
      <Grid container spacing={2} marginTop={2}>
        {galleryImages.map((image, index) => (
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
                src={`https://sapthapadhi.bloomitsolutions.co.in/${image?.photos[0]?.path}`}
                alt={`Gallery Image ${index + 1}`}
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
                onClick={() => handleDeleteImage(image.id)} 
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Image to Gallery</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUploadImage} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GalleryManagement;
