


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


const BannerDisplay = () => {
  const [banners, setBanners] = useState([{imageUrl:'https://static.vecteezy.com/system/resources/previews/001/308/284/original/gradient-web-banner-template-for-corporate-business-vector.jpg'},{imageUrl:'https://static.vecteezy.com/system/resources/previews/001/308/284/original/gradient-web-banner-template-for-corporate-business-vector.jpg'},{imageUrl:'https://static.vecteezy.com/system/resources/previews/001/308/284/original/gradient-web-banner-template-for-corporate-business-vector.jpg'}]);
  const [showDialog, setShowDialog] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);

 
  const handleFileChange = (event) => {
    setBannerFile(event.target.files[0]);
  };

  const handleUploadBanner = async () => {
    if (!bannerFile) return;
    
    const formData = new FormData();
    formData.append("banner", bannerFile);
    
   
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setBannerFile(null);
  };

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
                src={banner.imageUrl} // Adjust according to your API response
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
                onClick={() => console.log("Delete banner")} // Add delete functionality if needed
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Banner</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
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

