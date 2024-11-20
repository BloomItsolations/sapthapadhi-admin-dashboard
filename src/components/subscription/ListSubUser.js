import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const ListSubUser = ({ rowData, onEdit }) => {
   
    let column = [
        {
            field: "s.no",
            width: 60,
            headerName: "S.No",
            filterable: false,
            renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
        }, {
            field: "name",
            headerName: "firstName",
            width: 120,
            editable: false,
            renderCell: (params) => `${params.row.User.firstName} ${params.row.User.lastName}`
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            editable: false,
            renderCell: (params) => params.row.User.email
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 200,
            renderCell: (params) => params.row.User.phone
        },
        {
            field: "PlanName",
            headerName: "Plan Name",
            width: 200,
            renderCell: (params) => params.row.Plan.name
        },
        {
            field: "PlanPrice",
            headerName: "Plan Price",
            width: 200,
            renderCell: (params) => params.row.Plan.amount
        },
        {
            field:"startDate",
            headerName:"Plan Purchase Date",
            width:200,
            renderCell: (params) => {
                const date = new Date(params.row.startDate);
                return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            },
        },
        {
            field:"endDate",
            headerName:"Plan Expiry Date",
            width:200,
            renderCell: (params) => {
                const date = new Date(params.row.endDate);
                return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            },
        },
        // {
        //     field: "actions",
        //     headerName: "Actions",
        //     width: 150,
        //     renderCell: (params) => {
        //      return   <Box>
        //             <IconButton
        //                 sx={{
        //                     backgroundColor: '#007BFF',
        //                     color: 'white',
        //                     "&:hover": { backgroundColor: "#0056B3" },
        //                 }}
        //                 onClick={() => onEdit(params.row)}
        //             >
        //                 <EditIcon />
        //             </IconButton>
        //         </Box>
        //     }
        // }
    ]


    return (
        <>
            <Box
                sx={{
                    background: "linear-gradient(135deg, #141E30, #243B55)",
                    color: "#FFFFFF",
                    padding: 2,
                    borderRadius: 2,
                }}
            >
                {
                    rowData ?
                        <>
                            <DataGrid
                                getRowId={(row) => row.id}
                                rows={[...rowData].reverse()}
                                density="standard"
                                autoHeight
                                columns={column}
                                pageSize={10}
                                pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
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
                        </> : null
                }

            </Box>
        </>
    )
}
export default ListSubUser;