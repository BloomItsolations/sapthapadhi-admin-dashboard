import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";
import tripApi from "../../api/tripApi";

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
        <Tooltip title={params.row.aboutUs}>
          <Typography noWrap>{params.row.aboutUs}</Typography>
        </Tooltip>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <img src={`https://sapthapadhi.bloomitsolutions.co.in/${params?.row?.image[0]?.path}`} alt="Couple" style={{ width: "100%" }} />
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
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(event) => handleDelete(event, params.row.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ];
  
    return (
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
          }}
          disableSelectionOnClick
        />
      </Box>
    );
  };
  
  export default ListCouple;
  
