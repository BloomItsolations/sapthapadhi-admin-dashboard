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
  }, [gallery, update]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // i will update this code, after some time.
  let token = JSON.parse(sessionStorage.getItem('userInfo'));

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
        let response=await dispatch(deleteImage(imageId));
        if(response?.payload?.message=="Gallery Image deleted successfully"){
          setUpdate(!update)
  
          Swal.fire("Deleted!", "Image has been deleted.", "success");
        }
        else{
          Swal.fire("Error", "Failed to delete image.", "error");
        }
        
      }
   
    } catch (error) {
      Swal.fire("Error", "Failed to delete image.", "error");
    }
  };

  if (!galleryImages) {
    return <div>Loading....</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" color="white" gutterBottom>
        Gallery Management
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog}
        sx={{
          backgroundColor: "#007BFF", 
          color: "#FFFFFF",
          '&:hover': {
            backgroundColor: "#0056B3", 
          },
        }}
      >
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
                src={`${process.env.REACT_APP_BASE_URL}/${image?.photos[0]?.path}`}
                alt={`Gallery Image ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "white",
                  backgroundColor: "#FF5252",
                  '&:hover': {
                    backgroundColor: "#D32F2F",
                  },
                }}
                onClick={() => handleDeleteImage(image.id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={handleCloseDialog} sx={{
        backdropFilter: 'blur(10px)',
      }}>
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #141E30, #243B55)',
            color: '#FFFFFF',
            padding: '16px 24px',
            fontSize: '1.2rem',
            fontWeight: 600,
            borderRadius: '8px 8px 0 0',
          }}
        >
          Add Image to Gallery
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: '#243B55', // Consistent background color with the dialog
            padding: '24px 24px 16px', // More spacing for content
            color: '#B3C2D1', // Light text color for the content
            borderRadius: '0 0 8px 8px',
            textAlign: 'center', // Centering the content
          }}
        >
          {/* Custom Image Upload Design */}
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: '#1E88E5', // Matching button color to your theme
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              '&:hover': {
                backgroundColor: '#1565C0', // Darker hover effect
              },
              display: 'inline-flex', // Ensures the label behaves like a button
              cursor: 'pointer',
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hides the default input
            />
            Select Image
          </Button>
          <p style={{ color: '#B3C2D1', marginTop: '12px' }}>
            Click the button to select an image to upload.
          </p>
        </DialogContent>

        <DialogActions
          sx={{
            padding: '16px 24px',
            justifyContent: 'flex-end',
            backgroundColor: '#141E30', // Dark background for actions
            borderRadius: '0 0 8px 8px',
          }}
        >
          {/* Cancel Button (Styled as Danger) */}
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: '#FF5252',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#D32F2F',
              },
              marginRight: '12px',
            }}
          >
            Cancel
          </Button>

          {/* Upload Button (Styled as Primary) */}
          <Button
            onClick={handleUploadImage}
            sx={{
              backgroundColor: '#007BFF',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#0056B3',
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

export default GalleryManagement;
