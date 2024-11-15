// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import { Menu } from "@mui/icons-material";
//
import AccountPopover from "./AccountPopover";

const NAV_WIDTH = 240;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 64;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  background:'linear-gradient(135deg, #141E30, #243B55)',
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 3),
  },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "none",
  boxShadow: " 0 0 2px 0 rgba(0, 0, 0, 0.4)",
  borderColor: "linear-gradient(135deg, #141E30, #243B55)",
}));

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            display: { lg: "none" },
          }}
          color="primary"
        >
          <Menu fontSize="medium" />
        </IconButton>

        <Box sx={{ flexGrow: { xs: 0, lg: 1 } }}>
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              height: { xs: "30px", md: "40px" },
            }}
          >
            <Typography
              color="#FFFFFF"
              variant="h4"
              noWrap
              sx={{ textTransform: "uppercase" }}
            >
             SAPTHAPADHI
            </Typography>
          </Box>
        </Box>

        <Stack
          direction="row"
          justifyContent={"end"}
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
