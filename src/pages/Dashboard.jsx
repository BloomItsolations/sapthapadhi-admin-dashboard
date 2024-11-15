import React from "react";
import { Box, Grid, Typography, Card, CardContent, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ReportCard from "../components/dashboard/ReportCard";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // for Line & Pie Charts

const Dashboard = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Registrations',
        data: [30, 50, 70, 90, 60, 110],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const topUsers = [
    { name: "John Doe", activity: "Logged in 3 times today", status: "Active" },
    { name: "Jane Smith", activity: "Updated profile picture", status: "Active" },
    { name: "Chris Rock", activity: "Registered", status: "New" },
    { name: "Maggie", activity: "Deleted account", status: "Inactive" },
  ];

  const salesData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [5000, 7000, 8000, 12000],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

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
        {/* Left Column: Quick Stats */}
        <Grid item xs={12} sm={6} md={3} >
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
          <Link to="/banner-management" style={{ textDecoration: "none" ,}}>
            <ReportCard  title="Banner Management" value="Go to Page" />
          </Link>
        </Grid>

        {/* Right Column: Detailed Analytics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: '#2c3e50', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                User Registrations Over Time
              </Typography>
              <Line data={lineChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: '#2c3e50', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                User Activity Distribution
              </Typography>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bottom Section: System Health and Alerts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: '#2c3e50', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                System Health
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#B3C2D1' }}>
                - Server Status: <strong>Operational</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#B3C2D1' }}>
                - Active Database Connections: <strong>150</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#B3C2D1' }}>
                - Recent Errors: <strong>None</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* User Insights and Activity */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: '#2c3e50', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                Latest User Activity
              </Typography>
              {topUsers.map((user, index) => (
                <Typography variant="body2" key={index} sx={{ mb: 1, color: user.status === 'Active' ? '#32CD32' : '#FF6B6B' }}>
                  - {user.name} ({user.status}): {user.activity}
                </Typography>
              ))}
              <Divider sx={{ my: 2, backgroundColor: '#B3C2D1' }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Analytics */}
        <Grid item xs={12}>
          <Card sx={{ height: '100%', background: '#2c3e50', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                Sales Analytics (Quarterly)
              </Typography>
              <Line data={salesData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
