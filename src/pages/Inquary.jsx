import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    IconButton,
    Button,
} from '@mui/material';
import { Email, Phone, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInquary, listInquary } from '../store/auth/userActions';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InquiryPage = () => {
    const dispatch = useDispatch();
    const { allInquary, success, error } = useSelector((state) => state.user);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        dispatch(listInquary());
    }, [dispatch, update]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                let respo = await dispatch(deleteInquary(id));
                if (respo?.payload?.message === "Inquiry deleted successfully.") {
                    Swal.fire(
                        'Deleted!',
                        'The inquiry has been deleted successfully.',
                        'success'
                    );
                    setUpdate(!update);
                } else {
                    Swal.fire(
                        'Error!',
                        'Failed to delete the inquiry. Please try again later.',
                        'error'
                    );
                }
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                'Failed to delete the inquiry. Please try again later.',
                'error'
            );
            console.error('Error deleting inquiry:', error);
        }
    };

    const handleExport = () => {
        const doc = new jsPDF();

        // Add a title
        doc.text('User Inquiries', 14, 10);

        // Prepare data for PDF table
        const tableData = allInquary.enquiries.map((inquiry) => [
            inquiry.fullName,
            inquiry.email,
            inquiry.phone,
            inquiry.subject,
            inquiry.message,
            new Date(inquiry.createdAt).toLocaleDateString(),
            new Date(inquiry.createdAt).toLocaleTimeString(),
        ]);

        // Add table to the PDF
        doc.autoTable({
            head: [['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Time']],
            body: tableData,
            startY: 20,
        });

        // Save the PDF
        doc.save('inquiries.pdf');
    };

    if (!allInquary || allInquary.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: 'linear-gradient(135deg, #141E30, #243B55)',
                    color: '#FFFFFF',
                }}
            >
                <Typography variant="h6" align="center">
                    No inquiries found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: 4,
                background: 'linear-gradient(135deg, #141E30, #243B55)',
                minHeight: '80vh',
                color: '#FFFFFF',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 3 }}
            >
                User Inquiries
            </Typography>

            <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                    backgroundColor: '#1E293B',
                    borderRadius: 2,
                    overflowX: 'auto',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    padding: 2,
                }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: '#37474F' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Subject</TableCell>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Message</TableCell>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Time</TableCell>
                            <TableCell sx={{ color: '#B3C2D1', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allInquary.enquiries.map((inquiry) => {
                            const date = new Date(inquiry.createdAt).toLocaleDateString();
                            const time = new Date(inquiry.createdAt).toLocaleTimeString();

                            return (
                                <TableRow
                                    key={inquiry.id}
                                    sx={{
                                        borderBottom: '1px solid white',
                                        '&:hover': { backgroundColor: '#2E3B4E' },
                                    }}
                                >
                                    <TableCell sx={{ color: '#FFFFFF', minWidth: '150px', borderBottom: 'none' }}>
                                        {inquiry.fullName}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: '#B3C2D1',
                                            minWidth: '250px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderBottom: 'none',
                                        }}
                                    >
                                        {inquiry.email}
                                        <IconButton
                                            size="small"
                                            sx={{ marginLeft: 1, color: '#1E88E5' }}
                                            onClick={() => window.open(`mailto:${inquiry.email}`, '_blank')}
                                        >
                                            <Email />
                                        </IconButton>
                                    </TableCell>

                                    <TableCell sx={{ color: '#B3C2D1', minWidth: '150px', borderBottom: 'none' }}>
                                        {inquiry.phone}
                                    </TableCell>
                                    <TableCell sx={{ color: '#B3C2D1', minWidth: '150px', borderBottom: 'none' }}>
                                        {inquiry.subject}
                                    </TableCell>
                                    <TableCell sx={{ color: '#B3C2D1', minWidth: '400px', borderBottom: 'none' }}>
                                        {inquiry.message}
                                    </TableCell>
                                    <TableCell sx={{ color: '#B3C2D1', minWidth: '120px', borderBottom: 'none' }}>
                                        {date}
                                    </TableCell>
                                    <TableCell sx={{ color: '#B3C2D1', minWidth: '120px', borderBottom: 'none' }}>
                                        {time}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: '#B3C2D1',
                                            minWidth: '120px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderBottom: 'none',
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{ color: '#FF5252' }}
                                            onClick={() => handleDelete(inquiry.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#00C853',
                        '&:hover': { backgroundColor: '#009624' },
                        color: '#FFFFFF',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                    }}
                    onClick={handleExport}
                >
                    Export Inquiries
                </Button>
            </Box>
        </Box>
    );
};

export default InquiryPage;
