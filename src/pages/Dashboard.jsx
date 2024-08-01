import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import ReportCard from "../components/dashboard/ReportCard";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/plan-management" style={{ textDecoration: "none" }}>
            <ReportCard title="Plan Management" value="Go to Page" />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/user-management" style={{ textDecoration: "none" }}>
            <ReportCard title="User Management" value="Go to Page" />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/gallery-management" style={{ textDecoration: "none" }}>
            <ReportCard title="Gallery Management" value="Go to Page" />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/banner-management" style={{ textDecoration: "none" }}>
            <ReportCard title="Banner Management" value="Go to Page" />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
