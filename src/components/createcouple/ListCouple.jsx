import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";
import tripApi from "../../api/tripApi";
import { color } from "chart.js/helpers";

const ListCouple = ({ rowData, onDelete, onEdit }) => {
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
      await tripApi.delete(`/admin/deleteCouple/${id}`, config);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Error deleting couple:", error);
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
      field: "groomName",
      headerName: "Groom Name",
      width: 200,
      editable: false,
    },
    {
      field: "brideName",
      headerName: "Bride Name",
      width: 200,
      editable: false,
    },
    {
      field: "story",
      headerName: "Story",
      width: 400,
      editable: false,
      renderCell: (params) => (
        <Tooltip title={params.row.aboutUs} sx={{color:'white'}}>
          <Typography sx={{color:'white'}} noWrap>{params.row.aboutUs}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <img src={`${process.env.REACT_APP_BASE_URL}/${params?.row?.image[0]?.path}`} alt="Couple" style={{ width: "100%" }} />
      ),
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Box>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onEdit(params.row);
              }}
              sx={{
                backgroundColor: "#007BFF", // Primary button background
                color: "#FFFFFF", // Text color
                '&:hover': {
                  backgroundColor: "#0056B3", // Hover effect
                },
                marginRight: 1
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(event) => handleDelete(event, params.row.id)}
              sx={{
                backgroundColor: "#FF5252", // Danger button background
                color: "#FFFFFF", // Text color
                '&:hover': {
                  backgroundColor: "#D32F2F", // Hover effect
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ];
  
    return (
      <Box sx={{ height: 400, width: "100%", background: "linear-gradient(135deg, #141E30, #243B55)",}}>
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
          }}
          disableSelectionOnClick
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            color:'white',
            '& .header-cell': {
              color: 'white', // Set header text color to white
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              color: 'white', // Set cell text color to white
            },
          }}
        />
      </Box>
    );
  };
  
  export default ListCouple;
  
