import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // For Line Chart
import { appRoutes } from "../../routes/config";

// Sample chart data, customize as needed
const sampleChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Performance',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
    },
  ],
};

const Dashboard = () => {
  return (
    <Box
      sx={{
        padding: 3,
        background: 'linear-gradient(135deg, #141E30, #243B55)',
        minHeight: '100vh',
        color: '#FFFFFF',
      }}
    >
      <Grid container spacing={4}>
        {appRoutes.map((route) => (
          <Grid item xs={12} sm={6} md={3} key={route.title}>
            <Link to={route.path} style={{ textDecoration: "none" }}>
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
                {/* Icon Section */}
                <CardContent sx={{ textAlign: "center", marginBottom: 2 }}>
                  {route.icon && (
                    <Box sx={{ fontSize: 40, color: "#1abc9c", marginBottom: 2 }}>
                      {route.icon}
                    </Box>
                  )}
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {route.title}
                  </Typography>
                </CardContent>

                {/* Chart Section */}
                <CardContent sx={{ textAlign: "center" }}>
                  <Line data={sampleChartData} options={{ responsive: true }} height={100} />
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
