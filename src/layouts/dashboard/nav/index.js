import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography } from "@mui/material";

// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Scrollbar from "../../scrollbar";
import NavSection from "../../nav-section";
//
import { appRoutes } from "../../../routes/config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 240;

const StyledAccount = styled("div")(({ theme }) => ({
  alignItems: "center",
  padding: theme.spacing(2, 1),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundImage: 'linear-gradient(135deg, #141E30, #243B55)', // Correctly using backgroundImage for gradient
}));

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const { userInfo } = useSelector((state) => state.user);
  const sidebarData = userInfo !== null && appRoutes;
  const { pathname } = useLocation();
  const uniqueGroups = [...new Set(appRoutes?.map((route) => route.group))];

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
    sx={{
      height: "100vh", // Full viewport height
      overflowY: "auto", // Enable vertical scrolling
      "& .simplebar-content": {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
    }}
    >
      <Box sx={{ margin: 2 }}>
        <Link underline="none">
          <StyledAccount>
            <Box>
              <Typography
                variant="h4"
                color="white"
                sx={{
                  textTransform: "uppercase",
                  textAlign:'center'
                }}
              >
               SAPTHAPDHI
               
              </Typography>
            </Box>
            <Box sx={{ paddingTop: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "primary", textTransform: "uppercase" }}
              >
                {/* {userInfo?.username} */}
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "text.primary", textTransform: "lowercase" }}
              >
                {/* {userInfo?.email} */}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
        <NavSection data={sidebarData} uniqueGroups={uniqueGroups} />
      </Box>
    </Scrollbar>
  );
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        background: 'linear-gradient(135deg, #141E30, #243B55)', // Set gradient background for Box
      }}
    >
      {isDesktop ? (
  <Drawer
    open
    variant="permanent"
    PaperProps={{
      sx: {
        width: NAV_WIDTH,
        borderColor: "white",
        boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.4)",
        border: "none",
        height: "100vh", 
        overflowY: "auto", 
        background: 'linear-gradient(135deg, #141E30, #243B55)', 
        color: 'white', 
      },
    }}
  >
    {renderContent}
  </Drawer>
) : (
  <Drawer
    open={openNav}
    onClose={onCloseNav}
    ModalProps={{
      keepMounted: true,
    }}
    PaperProps={{
      sx: { 
        width: NAV_WIDTH, 
        background: 'linear-gradient(135deg, #141E30, #243B55)', // Apply gradient here for mobile view
      },
    }}
  >
    {renderContent}
  </Drawer>
)}

    </Box>
  );
}
