
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

const AddTeam = ({ onSave, onCancel, editData }) => {
  const [memberData, setMemberData] = useState({
    name: "",
    position: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMemberData({ ...memberData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", memberData.name);
    formData.append("position", memberData.position);
    if(memberData.image){
      formData.append("image", memberData.image);
    }


    onSave(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ marginBottom: 2, background: "linear-gradient(135deg, #141E30, #243B55)", boxShadow: 1, padding: 2, borderRadius: 1, color: "#FFFFFF" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="name"
            id="groomName"
            label="Name"
            value={memberData.name}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="position"
            id="brideName"
            label="Post"
            value={memberData.position}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
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
              sx={{
                backgroundColor: "#007BFF", // Primary button color
                color: "#FFFFFF", // Text color for primary button
                '&:hover': {
                  backgroundColor: "#0056B3", // Hover color for primary button
                },
              }}
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
        <Button color="error" onClick={onCancel} variant="contained"
          sx={{
            backgroundColor: "#FF5252", // Danger button color
            color: "#FFFFFF", // Text color for danger button
            '&:hover': {
              backgroundColor: "#D32F2F", // Hover color for danger button
            },
          }}
        >
          Close
        </Button>
        <Button type="submit" variant="contained"
            sx={{
              backgroundColor: "#00C853", // Accent button color
              color: "#FFFFFF", // Text color for accent button
              '&:hover': {
                backgroundColor: "#009624", // Hover color for accent button
              },
            }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddTeam;
