import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
const Add = ({ onSave, onCancel }) => {
  const [imageData, setImageData] = useState(null);
  const [InclusionsFields, setInclusionsFields] = useState([{ desc: "" }]);
  const [exclusionFields, setExclusionFields] = useState([{ desc: "" }]);
  const [facilityFields, setFacilityFields] = useState([{ desc: "" }]);
  const [termsFields, setTermsFields] = useState([{ desc: "" }]);

  const handleFormChange = (event, index, fieldState, setFieldState) => {
    const updatedFields = [...fieldState];
    updatedFields[index][event.target.name] = event.target.value;
    setFieldState(updatedFields);
  };

  const addField = (setFieldState) => {
    setFieldState((prevFields) => [...prevFields, { desc: "" }]);
  };

  const removeField = (index, setFieldState) => {
    setFieldState((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const renderFields = (fieldState, setFieldState, labelText) => {
    return (
      <Box
        sx={{
          marginY: 2,
          backgroundColor: "#fff",
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
          <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
            {labelText}
          </Typography>
          <Button variant="contained" onClick={() => addField(setFieldState)}>
            Add More
          </Button>
        </Box>
        {fieldState.map((form, index) => (
          <Grid container spacing={2} key={index} marginBottom={2}>
            <Grid item xs={9} sm={11}>
              <TextField
                InputLabelProps={{ shrink: true }}
                size="small"
                required
                id={`desc-${index}`}
                name="desc"
                label={`${labelText} Description`}
                fullWidth
                variant="outlined"
                onChange={(event) =>
                  handleFormChange(event, index, fieldState, setFieldState)
                }
                value={form.desc}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={() => removeField(index, setFieldState)}
                variant="contained"
                color="error"
              >
                <Delete />
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('carType', e.target.carType.value);
    formData.append('distanceCategories', e.target.distanceCategories.value);
    formData.append('rates', e.target.rideFare.value);
    formData.append('discount', e.target.discount.value);
    formData.append('image', imageData); // assuming imageData is already set in the component state
  
    formData.append('inclusionsData', JSON.stringify(InclusionsFields));
    formData.append('exclusionsData', JSON.stringify(exclusionFields));
    formData.append('facilitiesData', JSON.stringify(facilityFields));
    formData.append('tnc_Data', JSON.stringify(termsFields));
  
    console.log(formData);
    onSave(formData);
  };
  
  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginBottom: 2,
          backgroundColor: "#F4F6F8",
          boxShadow: 1,
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              InputLabelProps={{ shrink: true }}
              required
              type="text"
              name="carType"
              id="carType"
              label="Cab Type"
              fullWidth
              autoComplete="carType"
              placeholder="eg. SUV"
              defaultValue={""}
            >
              <MenuItem value="Hatchback">Hatchback</MenuItem>
              <MenuItem value="Sedan">Sedan</MenuItem>
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="SUV Luxury">SUV Luxury</MenuItem>
              <MenuItem value="Sedan-Electric">Sedan-Electric</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              select
              type="text"
              name="distanceCategories"
              id="distanceCategories"
              label="Select distance"
              fullWidth
              defaultValue={""}
              autoComplete="distanceCategories"
            >
              <MenuItem value="">Select Distance Categories</MenuItem>
              <MenuItem value="4hrs and 40 km">4hrs and 40km</MenuItem>
              <MenuItem value="8hrs and 80 km">8hrs and 80km</MenuItem>
              <MenuItem value="12hrs and 120 km">12hrs and 120km</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              type="text"
              name="rideFare"
              id="rideFare"
              label="Ride Fare"
              fullWidth
              autoComplete="rideFare"
              placeholder="eg. 1230"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              type="text"
              name="discount"
              id="discount"
              label="Discount"
              fullWidth
              autoComplete="discount"
              placeholder="eg. 10%"
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                e.preventDefault();
                e.target.files[0] === undefined
                  ? setImageData(imageData)
                  : setImageData(e.target.files[0]);
              }}
              id="coverImage"
              label="Cover Image"
              fullWidth
              autoComplete="Cover Image"
              variant="outlined"
            />
          </Grid>
        </Grid>
        {/* Render Inclusions fields */}

        {renderFields(InclusionsFields, setInclusionsFields, "Inclusions")}

        {/* Render exclusion fields */}
        {renderFields(exclusionFields, setExclusionFields, "Exclusions")}

        {/* Render facility fields */}
        {renderFields(facilityFields, setFacilityFields, "Facilities")}

        {/* Render terms fields */}
        {renderFields(termsFields, setTermsFields, "Terms and Conditions")}

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
    </React.Fragment>
  );
};

export default Add;
