import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";

const GalleryManagement = () => {
  const [galleryImages, setGalleryImages] = useState([{url:"https://th.bing.com/th/id/OIP.jHvTOSF7924Ah63W7mozxQHaEo?rs=1&pid=ImgDetMain"},{url:"https://th.bing.com/th/id/OIP.jHvTOSF7924Ah63W7mozxQHaEo?rs=1&pid=ImgDetMain"},{url:"https://th.bing.com/th/id/OIP.jHvTOSF7924Ah63W7mozxQHaEo?rs=1&pid=ImgDetMain"},{url:"https://th.bing.com/th/id/OIP.jHvTOSF7924Ah63W7mozxQHaEo?rs=1&pid=ImgDetMain"}]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

 

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("images", file);
    });
    
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedFiles([]);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`$}/admin/deleteGalleryImage/${imageId}`, {
        headers: {
          "Authorization": `Bearer your-token`, // Replace with actual token if needed
        },
      });
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gallery Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpenDialog}
      >
        Add Images
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
                src={image.url} // Adjust according to your API response
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
                onClick={() => handleDeleteImage(image.id)} // Adjust based on your image ID property
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Images to Gallery</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUploadImages} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GalleryManagement;
