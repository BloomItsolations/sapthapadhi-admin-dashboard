import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Stack, Button } from "@mui/material";

const DetailsModel = ({ onClose, selectedId, allCustomerList }) => {
  const [pageSize, setpageSize] = useState(10);
  const filteredCustomer = allCustomerList?.find(
    (item) => item.id === selectedId
  );
  const rowData = filteredCustomer?.CustomerBeedingEntries;
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
      field: "groupName",
      headerName: "Group Number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>{params.row?.Group.groupName || "N/A"}</Typography>
          </>
        );
      },
    },
    {
      field: "handnumber",
      headerName: "Hand Number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>{params.row?.Hand.handnumber || "N/A"}</Typography>
          </>
        );
      },
    },
    {
      field: "beedDate",
      headerName: "Beeding  date",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>{new Date(params.row?.beedDate).toLocaleDateString()}</Typography>
          </>
        );
      },
    },
    {
      field: "taken_loan",
      headerName: "Taken Loan",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>{params.row?.Group.taken_loan || "N/A"}</Typography>
          </>
        );
      },
    },

    {
      field: "payable_amount",
      headerName: "Payable Amount",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>{params.row?.payable_amount || "N/A"}</Typography>
          </>
        );
      },
    },
    {
      field: "due_amount",
      headerName: "Due Amount",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography>
              {params.row?.due_amount !== null
                ? parseFloat(params.row?.due_amount).toFixed(3)
                : "0"}
            </Typography>
          </>
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
          <>
            <Typography>
              {new Date(params.row?.createdAt).toLocaleDateString()}
            </Typography>
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" gutterBottom textTransform={"uppercase"}>
          Customer
        </Typography>
        <Button color="error" onClick={onClose} variant="contained">
          Close
        </Button>
      </Stack>
      {rowData === null ? null : (
        <Box sx={{ height: "65vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={rowData}
            density="standard"
            columns={columns}
            pageSize={pageSize}
            pagination
            onPageSizeChange={(params) => setpageSize(params.pageSize)}
            rowsPerPageOptions={[10, 20, 30, 40, 50, 75, 100]}
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

export default DetailsModel;
