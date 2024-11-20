import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const genderOptions = ["male", "female", "others"];
const lookingForOptions = ["men", "women", "All"];
const religionOptions = [
  "Hinduism",
  "Sikhism",
  "Christianity",
  "Jainism",
  "Islam",
  "Judaism",
  "Buddhism",
  "Shinto",
  "Confucianism",
  "Zoroastrianism",
  "Others",
];

const AddUser = ({ onSave, onCancel, editData }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    lookingFor: "",
    dateOfBirth: "",
    religion: "",
    gender: "",
    country: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (editData) {
      setUserData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2, background: "linear-gradient(135deg, #141E30, #243B55)",  boxShadow: 1, padding: 2, borderRadius: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="firstName"
            id="firstName"
            label="First Name"
            value={userData.firstName}
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
            name="lastName"
            id="lastName"
            label="Last Name"
            value={userData.lastName}
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
            type="email"
            name="email"
            id="email"
            label="Email"
            value={userData.email}
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
            name="phone"
            id="phone"
            label="Phone"
            value={userData.phone}
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
            select
            name="gender"
            id="gender"
            label="Gender"
            value={userData.gender}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& input': {
                  color: 'white', // Text color in the select input
                },
                '& fieldset': {
                  borderColor: '#007BFF', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3', // Border color on hover
                },
                '& .MuiInputBase-input': {
  color: '#FFFFFF', // Ensures text color for the input
},
              },
              '& .MuiInputLabel-root': {
                color: '#B3C2D1', // Label color
              },
              '& .MuiInputBase-input': {
                paddingLeft: '16px', // Padding for input text
              },
              '& .MuiSelect-icon': {
                color: '#FFFFFF', // Color of the dropdown icon
              },
            }}
          
          >
            {genderOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            select
            name="lookingFor"
            id="lookingFor"
            label="Looking For"
            value={userData.lookingFor}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& input': {
                  color: 'white', // Text color in the select input
                },
                '& fieldset': {
                  borderColor: '#007BFF', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3', // Border color on hover
                },
                '& .MuiInputBase-input': {
  color: '#FFFFFF', // Ensures text color for the input
},
              },
              '& .MuiInputLabel-root': {
                color: '#B3C2D1', // Label color
              },
              '& .MuiInputBase-input': {
                paddingLeft: '16px', // Padding for input text
              },
              '& .MuiSelect-icon': {
                color: '#FFFFFF', // Color of the dropdown icon
              },
            }}
          
          >
            {lookingForOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            label="Date of Birth"
            value={userData.dateOfBirth}
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
            select
            name="religion"
            id="religion"
            label="Religion"
            value={userData.religion}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& input': {
                  color: 'white', // Text color in the select input
                },
                '& fieldset': {
                  borderColor: '#007BFF', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3', // Border color on hover
                },
                '& .MuiInputBase-input': {
  color: '#FFFFFF', // Ensures text color for the input
},
              },
              '& .MuiInputLabel-root': {
                color: '#B3C2D1', // Label color
              },
              '& .MuiInputBase-input': {
                paddingLeft: '16px', // Padding for input text
              },
              '& .MuiSelect-icon': {
                color: '#FFFFFF', // Color of the dropdown icon
              },
            }}
          
          >
            {religionOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="country"
            id="country"
            label="Country"
            value={userData.country}
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
            type="password"
            name="password"
            id="password"
            label="Password"
            value={userData.password}
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
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", margin: "10px 0px", gap: 2 }}>
        <Button color="error" onClick={onCancel} variant="contained">
          Close
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>1
      </Box>
    </Box>
  );
};

export default AddUser;
