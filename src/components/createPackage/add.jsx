import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const Add = ({ onSave, onCancel, editData }) => {
  const [basicData, setBasicData] = useState({
    name: "",
    amount: "",
    planValidity: "",
    planType: "",
  });

  const [features, setFeatures] = useState([
    { desc: "", value: false },
  ]);

  useEffect(() => {
    if (editData) {
      setBasicData({
        name: editData.name,
        amount: editData.amount,
        planValidity: editData.planValidity,
        planType: editData.planType,
      });
      setFeatures(typeof editData.features === "string" ? JSON.parse(editData.features) : editData.features);
    }
  }, [editData]);

  const handleFeatureChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFeatures = [...features];
    if (name === "desc") {
      updatedFeatures[index][name] = value;
    } else if (name === "value") {
      updatedFeatures[index][name] = value === "true";
    }
    setFeatures(updatedFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, { desc: "", value: false }]);
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...basicData,
      features,
    };
    onSave(data);
    console.log("data", data);
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginBottom: 2,
          backgroundColor: "linear-gradient(135deg, #141E30, #243B55)",
          boxShadow: 1,
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              size="small"
              type="text"
              name="name"
              id="name"
              label="Plan Name"
              value={basicData.name}
              onChange={(e) =>
                setBasicData({ ...basicData, name: e.target.value })
              }
              fullWidth
              autoComplete="name"
              placeholder="e.g. Basic Plan"
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
              type="number"
              name="amount"
              id="amount"
              label="Plan Price"
              value={basicData.amount}
              onChange={(e) =>
                setBasicData({ ...basicData, amount: e.target.value })
              }
              fullWidth
              autoComplete="amount"
              placeholder="e.g. 99.99"
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
              name="planValidity"
              id="planValidity"
              label="Plan Validity"
              value={basicData.planValidity}
              onChange={(e) =>
                setBasicData({ ...basicData, planValidity: e.target.value })
              }
              fullWidth
              autoComplete="planValidity"
              placeholder="e.g. 6 months"
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
              name="planType"
              id="planType"
              label="Plan Type"
              value={basicData.planType}
              onChange={(e) =>
                setBasicData({ ...basicData, planType: e.target.value })
              }
              fullWidth
              autoComplete="planType"
              placeholder="e.g. Basic"
              sx={{

                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#007BFF',
                  },
                  '&:hover fieldset': {
                    borderColor: '#0056B3',
                  },
                  '& input': {
                    color: 'white', 
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            marginY: 2,
            backgroundColor: "linear-gradient(135deg, #141E30, #243B55)",
            boxShadow: 1,
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginY: 2,
              gap: 1,
            }}
          >
            <Typography variant="h6" gutterBottom textTransform={"uppercase"} color="#FFFFFF">
              Plan Features
            </Typography>
            <Button variant="contained" onClick={addFeature}
               sx={{
                backgroundColor: "#00C853", // Accent button background
                color: "#FFFFFF", // White text
                "&:hover": {
                  backgroundColor: "#009624", // Hover background for accent button
                },
              }}
            >
              Add Feature
            </Button>
          </Box>
          {features.map((feature, index) => (
            <Grid container spacing={2} key={index} marginBottom={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  name="desc"
                  required
                  label="Feature Description"
                  fullWidth
                  autoComplete="desc"
                  placeholder="e.g. Your profile is visible"
                  variant="outlined"
                  onChange={(event) => handleFeatureChange(event, index)}
                  value={feature.desc}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& input': {
                        color: '#FFFFFF', // Text color in the input box
                      },
                      '& fieldset': {
                        borderColor: '#007BFF', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#0056B3', // Border color on hover
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#B3C2D1', // Label color
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#B3C2D1', // Placeholder color
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  select
                  name="value"
                  required
                  label="Enabled"
                  fullWidth
                  variant="outlined"
                  onChange={(event) => handleFeatureChange(event, index)}
                  value={String(feature.value)}
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
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  onClick={() => removeFeature(index)}
                  variant="contained"
                  color="error"
                >
                  <Delete />
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>
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
          <Button type="submit"  variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Add;
