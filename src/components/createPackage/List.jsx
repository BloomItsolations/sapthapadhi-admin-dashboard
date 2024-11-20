import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import tripApi from "../../api/tripApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ListComponent = ({ rowData, onDelete, onEdit }) => {
  let auth = useSelector((state) => state.user?.userInfo);
  let token = auth?.token;

  const handleDelete = async (event, id) => {
    event.stopPropagation();
    Swal.fire({
      title: 'Unable to Delete Plan',
      text: 'You cannot delete this plan as there are several features dependent on it. Please contact the developer to make necessary updates before deleting.',
      icon: 'error',
      confirmButtonText: 'Okay',
    })
    return;
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await tripApi.delete(`/admin/deleteplan/${id}`, config);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const columns = [
    {
      field: "s.no",
      width: 60,
      headerName: "S.No.",
      filterable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: "name",
      headerName: "Plan Name",
      width: 200,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Price",
      width: 120,
      editable: false,
    },
    {
      field: "planValidity",
      headerName: "Validity",
      width: 150,
      editable: false,
    },
    {
      field: "planType",
      headerName: "Plan Type",
      width: 150,
      editable: false,
    },
    {
      field: "features",
      headerName: "Features",
      width: 300,
      renderCell: (params) => {
        let featuresData;
        try {
          featuresData =
            typeof params.row.features === "string"
              ? JSON.parse(params.row.features)
              : params.row.features;
        } catch (error) {
          console.error("Error parsing features:", error);
          featuresData = [];
        }
        return (
          <Tooltip
            title={
              <Box>
                {Array.isArray(featuresData) ? (
                  featuresData.map((feature, index) => (
                    <Box key={index} sx={{ mb: 1, color: "#FFFFFF" }}>
                      <Typography variant="subtitle2">
                        {feature.desc}
                      </Typography>
                      <Typography variant="body2">
                        {feature.value ? "Enabled" : "Disabled"}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No features available</Typography>
                )}
              </Box>
            }
          >
            <Typography sx={{ color: "#FFFFFF" }}>Hover to see details</Typography>
          </Tooltip>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <Typography sx={{ color: "#FFFFFF" }}>
            {new Date(params.row?.createdAt).toLocaleDateString()}
          </Typography>
        );
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
              backgroundColor: "#007BFF",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#0056B3" },
            }}
            onClick={() => onEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#FF5252",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#D32F2F" },
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
        background: "linear-gradient(135deg, #141E30, #243B55)",
        color: "#FFFFFF",
        padding: 2,
        borderRadius: 2,
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
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: false }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1E88E5",
              color: "#FFFFFF",
            },
            "& .MuiDataGrid-cell": {
              color: "#FFFFFF",
            },
          }}
        />
      )}
    </Box>
  );
};

export default ListComponent;
