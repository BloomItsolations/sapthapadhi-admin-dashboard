import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
const List = ({ rowData }) => {
  const columns = [
    {
      field: "s.no",
      width: 100,
      headerName: "S.No.",
      filterable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: "carType",
      headerName: "Car Type",
      width: 250,
      editable: false,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 120,
      editable: false,
    },
    {
      field: "rates",
      headerName: "Rates",
      width: 120,
      editable: false,
    },
    {
      field: "discountedrates",
      headerName: "Discounted Rates",
      width: 150,
      editable: false,
    },
    {
      field: "distanceCategories",
      headerName: "Distance Categories",
      width: 150,
      editable: false,
    },
    {
      field: "inclusions",
      headerName: "Inclusions",
      width: 150,
      editable: false,
      renderCell: (params) => {
        // Assuming inclusions is an array of objects with a desc property
        return params.row.inclusions.map((inc) => (
          <Typography key={inc.desc}>{inc.desc}</Typography>
        ));
      },
    },
    {
      field: "exclusions",
      headerName: "Exclusions",
      width: 150,
      editable: false,
      renderCell: (params) => {
        // Assuming exclusions is an array of objects with a desc property
        return params.row.exclusions.map((exc) => (
          <Typography key={exc.desc}>{exc.desc}</Typography>
        ));
      },
    },
    {
      field: "facilities",
      headerName: "Facilities",
      width: 150,
      editable: false,
      renderCell: (params) => {
        // Assuming facilities is an array of objects with a desc property
        return params.row.facilities.map((fac) => (
          <Typography key={fac.desc}>{fac.desc}</Typography>
        ));
      },
    },
    {
      field: "tncData",
      headerName: "TNC Data",
      width: 150,
      editable: false,
    },
    {
      field: "carImage",
      headerName: "Car Image",
      width: 150,
      editable: false,
    },
   
  ];
  

  return (
    <Box>
      {rowData === null ? null : (
        <Box sx={{ height: "65vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={[...rowData].reverse()}
            density="standard"
            autoHeight
            columns={columns}
            initialState={{
              ...rowData.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
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
    </Box>
  );
};

export default List;
