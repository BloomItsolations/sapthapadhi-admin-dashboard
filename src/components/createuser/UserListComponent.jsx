import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import tripApi from "../../api/tripApi";

const UserListComponent = ({ rowData, onDelete, onEdit }) => {
  console.log("Rowdata",rowData);
  let auth = useSelector((state) => state.user?.userInfo);
  let token = auth?.token;

  const handleDelete = async (event, id) => {
    event.stopPropagation();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await tripApi.delete(`/admin/deleteUser/${id}`, config);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "currentPlan",
      headerName: "Current Plan",
      width: 150,
      valueGetter: (params) => params?.row?.currentPlan?.Plan?.name || "N/A",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      valueGetter: (params) => params.row.details?.gender || "N/A",
    },
    {
      field: "profilePhoto",
      headerName: "Profile Picture",
      width: 100,
      renderCell: (params) => {
        const baseUrl = process.env.REACT_APP_BASE_URL || ""; // Fetch base URL from environment variable
    const profilePhotoPath = params.row.details?.profilePhoto?.path;
    const profilePhotoUrl = profilePhotoPath
      ? `${baseUrl}/${profilePhotoPath}`
      : "https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png"; // Default profile picture

        return <img
          src={profilePhotoUrl}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
        },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            sx={{
              backgroundColor: "#FF5252", // Danger Button
              color: "#FFFFFF", // Text color
              "&:hover": {
                backgroundColor: "#D32F2F", // Hover background
              },
            }}
            onClick={(event) => handleDelete(event, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #141E30, #243B55)", // Background gradient
        borderRadius: 2,
        padding: 2,
        boxShadow: 3,
      }}
    >
      {rowData === null ? null : (
        <DataGrid
          getRowId={(row) => row.id}
          rows={[...rowData].reverse()}
          density="standard"
          autoHeight
          columns={columns}
          pageSize={10}
          pageSizeOptions={[5, 10, 20, 30, 40, 50, 75, 100]}
          slots={{
            toolbar: GridToolbar,
          }}
          sx={{
            "& .MuiDataGrid-root": {
              background: "linear-gradient(135deg, #141E30, #243B55)",
              color: "#FFFFFF",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#37474F", // Subtle Button background
              color: "#B3C2D1", // Subtle text color
            },
            "& .MuiDataGrid-cell": {
              color: "#FFFFFF",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#37474F", // Subtle Button background
            },
          }}
          disableSelectionOnClick
        />
      )}
    </Box>
  );
};

export default UserListComponent;
