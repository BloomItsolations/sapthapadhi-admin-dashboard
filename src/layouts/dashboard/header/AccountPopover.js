import { useState } from "react";
// @mui
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Divider,
  Typography,
  IconButton,
  Popover,
  Button,
} from "@mui/material";
import { logout } from "../../../store/auth/userSlice";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
    navigate("/", { replace: true });
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
            },
          }),
        }}
      >
        <AccountCircleIcon color="primary" fontSize="large" />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 300,
            color:'#B3C2D1',
            backgroundImage: 'linear-gradient(135deg, #141E30, #243B55)', // Corrected gradient syntax
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5, gap: 4 }}>
          <Typography variant="subtitle2" noWrap>
            {/* Name: {userInfo?.username} */}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            Admin Id: {userInfo?.phone}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {/* Email: {userInfo?.email} */}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Button
          onClick={logoutHandler}
          sx={{ padding: 1, margin: 1, width: "280px",background:'#2065d1' }}
          variant="contained"
          startIcon={<LogoutIcon />}
        >
          <Typography variant="body2" noWrap sx={{color:'white'}}>
            Logout
          </Typography>
        </Button>
      </Popover>
    </>
  );
}
