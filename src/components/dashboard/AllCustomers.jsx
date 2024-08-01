import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Dialog,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import DetailsModel from "./DetailsModel";
import { RemoveRedEyeRounded } from "@mui/icons-material";
const AllCustomers = ({ rowData, onSearch, onSync }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setselectedId] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    onSearch(formData);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    setselectedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "view",
      headerName: "View",
      width: 100,
      editable: false,

      renderCell: (params) => {
        return (
          <Button
            size="small"
            color="secondary"
            onClick={() => handleClickOpen(params.row.id)}
          >
            <RemoveRedEyeRounded />
          </Button>
        );
      },
    },
    {
      field: "s.no",
      width: 100,
      headerName: "S.No.",
      filterable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 200,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>
              {new Date(params.row?.createdAt).toLocaleDateString()}
            </Typography>
          </>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive ? (
              <Box sx={{ color: "green" }}>
                <Typography>Active</Typography>
              </Box>
            ) : (
              <Box sx={{ color: "red" }}>
                <Typography>Inactive</Typography>
              </Box>
            )}
          </>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F4F6F8",
        boxShadow: 1,
        padding: 2,
        borderRadius: 1,
      }}
    >
      <Box component="form" onSubmit={searchHandler}>
        <Typography variant="h5" gutterBottom textTransform={"uppercase"}>
          Customer
        </Typography>
        <Grid container spacing={3}>
          {/* select Group */}
          <Grid item xs={12} sm={8}>
            <TextField
              size="small"
              name="keyword"
              required
              label="Search"
              fullWidth
              autoComplete="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                margin: "10px 0px",
                gap: 2,
              }}
            >
              <Button color="info" onClick={onSync} variant="contained">
                sync
              </Button>
              <Button type="submit" variant="contained">
                Search
              </Button>
            </Box>
          </Grid>
          {/* select Hands */}
        </Grid>
      </Box>
      <Box>
        {rowData === null ? null : (
          <Box sx={{ height: "40vh", width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.id}
              rows={[...rowData].reverse()}
              density="standard"
              columns={columns}
              initialState={{
                ...rowData.initialState,
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 20, 30, 40, 50, 75, 100]}
              slots={{
                toolbar: GridToolbar,
              }}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: false }}
            />
          </Box>
        )}
        <Dialog maxWidth={"lg"} fullWidth open={open} onClose={handleClose}>
          <DetailsModel
            onClose={handleClose}
            selectedId={selectedId}
            allCustomerList={rowData}
          />
        </Dialog>
      </Box>
    </Box>
  );
};

export default AllCustomers;
