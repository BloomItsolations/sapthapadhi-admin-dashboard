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
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.03)",
        },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
