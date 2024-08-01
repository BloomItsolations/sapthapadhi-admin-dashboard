import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios'; // Make sure axios is installed
import tripApi from '../api/tripApi';

const InquiryPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await tripApi.get('/v1/tours/list-enquire');
                setInquiries(response.data.enquiries);
                setLoading(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load inquiries. Please try again later.',
                });
                setLoading(false);
            }
        };

        fetchInquiries();
    }, []);

    if (loading) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
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
                            <TableCell><Typography variant="h6">Message</Typography></TableCell>
                            <TableCell><Typography variant="h6">Date</Typography></TableCell>
                            <TableCell><Typography variant="h6">Time</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inquiries.map((inquiry) => {
                            // Extract date and time from the createdAt field
                            const date = new Date(inquiry.createdAt).toLocaleDateString();
                            const time = new Date(inquiry.createdAt).toLocaleTimeString();

                            return (
                                <TableRow key={inquiry.id}>
                                    <TableCell>{inquiry.name}</TableCell>
                                    <TableCell>{inquiry.email}</TableCell>
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
