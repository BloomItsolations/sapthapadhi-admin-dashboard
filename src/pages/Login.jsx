import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Stack,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../store/auth/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { clearmsg } from "../store/auth/userSlice";
import Swal from "sweetalert2";

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "space-between",
    background: "linear-gradient(135deg, #141E30, #243B55)",
    color: '#FFFFFF'
  },
}));

const StyledContent = styled("div")(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(4, 2),
}));

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, userInfo, loading, success } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data.entries());
    if (formData.phone !== "" && formData.password !== "") {
      dispatch(userLogin(formData));
    } else {
      toast.warn("Please fill all the fields");
    }
  };
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
      dispatch(clearmsg());
    }
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login Successful',
      });
      dispatch(clearmsg());
    }

    if (userInfo !== null) {
      // navigate("/app", { replace: true });
      window.location.replace('/app');

    }
  }, [dispatch, error, userInfo, navigate, success]);
  return (
    <>
      <Helmet>
        <title> Login | SAPTHAPDHI</title>
      </Helmet>

      <StyledRoot>
        <StyledContent>
          <Box sx={{ px: 5, mt: 10, mb: 5 }}>
            <Typography variant="h3" textAlign={"center"}>
              Hi, Welcome Back
            </Typography>
          </Box>

          <Typography
            variant="h4"
            gutterBottom
            textTransform="uppercase"
            textAlign={"center"}
          >
            Login to your Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              InputProps={{
                style: {
                  color: '#FFFFFF', // Input text color (white for contrast)
                }
              }}
              name="phone"
              autoComplete="phone"
              autoFocus
              InputLabelProps={{
                style: { color: "#B3C2D1" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              autoComplete="current-password"
              name="password"
              label="Password"
              
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon color="primary" fontSize="small" />
                      ) : (
                        <VisibilityOffIcon color="info" fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  color: '#FFFFFF', // Input text color (white for contrast)
                }

              }

              }
              InputLabelProps={{
                style: { color: "#B3C2D1" }, // Secondary text color
              }}
              
            />
            <Button
              sx={{
                marginTop: 2,
                backgroundColor: '#007BFF',  // Primary blue color
                color: '#FFFFFF',            // White text color
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: '#0056B3', // Darker blue on hover
                },
                padding: '10px 20px',         // Padding for the button
                textTransform: 'capitalize',  // Keeps the text capitalization
                boxShadow: 'none',            // Optional: Remove shadow on hover
              }}
              disabled={loading ? true : false}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
            >
              <Typography variant="h6">
                Login
              </Typography>
            </Button>

          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            display={"none"}
            sx={{ my: 2 }}
          >
            <Link to="/login " variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 2 }}
          >

          </Stack>
        </StyledContent>
      </StyledRoot>
    </>
  );
}
