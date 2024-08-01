import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alpha, useTheme } from "@mui/material/styles";
import Swal from "sweetalert2";

import {
  Box,
  Card,
  Stack,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";

import axios from "axios";

import { Helmet } from "react-helmet-async";

export default function RegisterPage() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required(" Name is required"),
      email: Yup.string().email("Invalid email address"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          /^[6-9]\d{9}$/,
          "Phone number must be exactly 10 digits and start with 6, 7, 8, or 9"
        ),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: (values) => {
      const handleregister = async () => {
        try {
          setLoading(true);
          const response = await axios.post(`${process.env.REACT_APP_BaseURL}/auth/user/create`, 
             values,
            {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (response.data) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Registeration Successful",
            });
            navigate('/login');
          }
    
        } catch (error) {
          console.error("There was a problem with the fetch operation", error);
          if (error.response) {
            setError(error.response.data.message);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          } else {
            setError(error.message)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "error occured while registering user. Please try again later.",
            });
          }
    
        } finally {
          setLoading(false);
        }
      
    }
    handleregister()
  }
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  return (
    <>
      <Helmet>
        <title> Register | Tours and Travels </title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingY: 3,
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ width: 1, height: 1 }}
        >
          <Card
            sx={{
              p: 4,
              width: 1,
              maxWidth: 1024,
            }}
          >
            <Box sx={{ textAlign: "center", margin: 0, padding: 0 }}>
            </Box>

            <Typography
              variant="h4"
              paddingY={1}
              textAlign={"center"}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              Start Your Journey with Al-Hashmi Wal Sultan Tours & Travels
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                py: 1,
              }}
            >
              <Typography variant="body2" textAlign="center">
                Already have an Account?{" "}
              </Typography>
              <Link to="/login" variant="subtitle2" className="text-red-600">
                Login here.
              </Link>
            </Box>
            <Box component="form" sx={{ py: 2 }} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    name="name"
                    label="Name"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    name="email"
                    label={"Email"}
                    autoComplete="current-email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    name="phone"
                    label={"Phone Number"}
                    autoComplete="current-mobile-number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    name="password"
                    label={"Password"}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    sx={{
                      input: { color: theme.palette.text.primary },
                      color: theme.palette.text.primary,
                    }}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                    type={showPassword ? "Text" : "password"}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                sx={{
                  color: theme.palette.common.white,
                  marginTop:'18px',
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                disabled={loading}
              >
                {loading ? "loading ..." : "Join Now"}
              </Button>
            </Box>

            {error ? (
              <Typography
                variant="body1"
                color="error"
                sx={{ my: 2 }}
                textAlign="center"
              >
                Error : {error}
              </Typography>
            ) : success ? (
              <Typography
                variant="body1"
                color="primary"
                sx={{ my: 2 }}
                textAlign="center"
              >
                {success}.
              </Typography>
            ) : null}
          </Card>
        </Stack>
      </Box>
    </>
  );
}
