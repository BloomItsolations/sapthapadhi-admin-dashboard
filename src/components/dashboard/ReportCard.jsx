import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ReportCard = ({ title, value }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        background: "#34495E", // Dark background color
        color: "#ECF0F1", // Light text color
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.03)",
          background: "#2C3E50", // Darker shade on hover
        },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="inherit" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
