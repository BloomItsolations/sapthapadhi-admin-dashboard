import { NavLink as RouterLink } from "react-router-dom";
import React from "react";
// @mui
import { Box, ListItemText, ListItemIcon, Typography } from "@mui/material";
// Icons from Material UI
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
// Add more icons as needed
//
import { StyledNavItem } from "./styles";

// ----------------------------------------------------------------------

export default function NavSection({ data = [], uniqueGroups }) {
  return (
    <Box>
      {uniqueGroups.map((group, index) => (
        <div key={(index + 1).toString()}>
          <Typography
            variant="caption"
            color="white" // Set group label color to white
            sx={{ textTransform: "uppercase" }}
          >
            {/* {group} */}
          </Typography>
          {data
            ?.filter((route) => route.group === group)
            ?.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
        </div>
      ))}
    </Box>
  );
}

function NavItem({ item }) {
  const { title, path, info,icon } = item;

  // Define icons for each item (you can dynamically map or assign icons as per your requirement)
  const icons = {
    home: <HomeIcon />,
    settings: <SettingsIcon />,
    // Add more icons here for other navigation items
  };

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "white", // Active link color is white
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
        padding: "4px 16px",
        margin: "8px 0px",
        display: "flex",
        alignItems: "center", // Align the icon and text horizontally
      }}
    >
      {/* Add ListItemIcon here */}
      <ListItemIcon sx={{ color: "#2065d1" }}>
      {icon}
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={title}
        sx={{
          textTransform: "uppercase",
          color: "white", // Set the color of the text to white
        }}
      />
      {info && info}
    </StyledNavItem>
  );
}
