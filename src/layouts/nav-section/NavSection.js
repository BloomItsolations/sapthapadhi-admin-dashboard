import { NavLink as RouterLink } from "react-router-dom";
import React from "react";
// @mui
import { Box, ListItemText, Typography } from "@mui/material";
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
            color="primary"
            sx={{ textTransform: "uppercase" }}
          >
            {group}
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
  const { title, path, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
        padding: "4px 16px",
        margin: "8px  0px",
      }}
    >
      <ListItemText
        disableTypography
        primary={title}
        sx={{ textTransform: "uppercase", color: "text.primary" }}
      />
      {info && info}
    </StyledNavItem>
  );
}
