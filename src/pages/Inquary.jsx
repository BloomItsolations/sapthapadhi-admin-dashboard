import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { listInquary } from '../store/auth/userActions';

const InquiryPage = () => {
    const dispatch = useDispatch();
    const { allInquary } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(listInquary());
    }, [dispatch]);

    if (!allInquary || allInquary.length === 0) {
        return <Typography variant="h6" align="center">No inquiries found.</Typography>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                User Inquiries
            </Typography>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Name</Typography></TableCell>
                            <TableCell><Typography variant="h6">Email</Typography></TableCell>
                            <TableCell><Typography variant="h6">Phone</Typography></TableCell>
                            <TableCell><Typography variant="h6">Subject</Typography></TableCell>
                            <TableCell><Typography variant="h6">Message</Typography></TableCell>
                            <TableCell><Typography variant="h6">Date</Typography></TableCell>
                            <TableCell><Typography variant="h6">Time</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allInquary.enquiries.map((inquiry) => {
                            // Extract date and time from the createdAt field
                            const date = new Date(inquiry.createdAt).toLocaleDateString();
                            const time = new Date(inquiry.createdAt).toLocaleTimeString();

                            return (
                                <TableRow key={inquiry.id}>
                                    <TableCell>{inquiry.fullName}</TableCell>
                                    <TableCell>{inquiry.email}</TableCell>
                                    <TableCell>{inquiry.phone}</TableCell>
                                    <TableCell>{inquiry.subject}</TableCell>
                                    <TableCell>{inquiry.message}</TableCell>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>{time}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InquiryPage;
