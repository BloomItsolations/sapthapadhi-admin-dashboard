import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const AddCouple = ({ onSave, onCancel, editData }) => {
  const [coupleData, setCoupleData] = useState({
    groomName: "",
    brideName: "",
    aboutUs: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editData) {
      setCoupleData(editData);
      setImagePreview(editData.image);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupleData({ ...coupleData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoupleData({ ...coupleData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("groomName", coupleData.groomName);
    formData.append("brideName", coupleData.brideName);
    formData.append("aboutUs", coupleData.aboutUs);
    if (coupleData.image) {
      formData.append("image", coupleData.image);
    }
    onSave(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ marginBottom: 2, backgroundColor: "#F4F6F8", boxShadow: 1, padding: 2, borderRadius: 1 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="groomName"
            id="groomName"
            label="Groom Name"
            value={coupleData.groomName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="brideName"
            id="brideName"
            label="Bride Name"
            value={coupleData.brideName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="aboutUs"
            id="story"
            label="Story"
            value={coupleData.aboutUs}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="image-upload">
            <Input
              accept="image/*"
              id="image-upload"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Upload Image
            </Button>
          </label>
          {imagePreview && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2">Image Preview:</Typography>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "4px" }}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          margin: "10px 0px",
          gap: 2,
        }}
      >
        <Button color="error" onClick={onCancel} variant="contained">
          Close
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddCouple;
