import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
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
      await tripApi.delete(`/admin/deleteuser/${id}`, config);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => onEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
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
