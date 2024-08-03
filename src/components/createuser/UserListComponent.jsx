import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import tripApi from "../../api/tripApi";

const UserListComponent = ({ rowData, onDelete, onEdit }) => {
 
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
      valueGetter: (params) => params.row.currentPlan || 'N/A',
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      valueGetter: (params) => params.row.details?.gender || 'N/A',
    },
    {
      field: "profilePhoto",
      headerName: "Profile Picture",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.details?.profilePhoto ? params.row.details?.profilePhoto : "https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png"}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: '50%' }}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          
          <IconButton
            color="secondary"
            onClick={(event) => handleDelete(event, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
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
          disableSelectionOnClick
        />
      )}
    </Box>
  );
};

export default UserListComponent;
