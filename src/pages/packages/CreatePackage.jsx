import React, { useState, useEffect } from "react";
import Add from "../../components/createPackage/add";
import List from "../../components/createPackage/List";
import { Box, Stack, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import tripApi from "../../api/tripApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const CreatePackage = () => {
  const [tours, setTours] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  let auth = useSelector((state) => state.user?.userInfo);
  let token = auth?.token

  const submitHandler = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }

      const response = await tripApi.post("/admin/createplan", formData, config);
      if (response.status === 201) {
        toast.success(response.data.message);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateHandler = async (formData) => {
    Swal.fire({
      title: 'Cannot Update Plan',
      text: 'You can\'t update the plan feature due to some reasons. There are many features dependent on it. Please talk with the developer to update the plan.',
      icon: 'warning',
      confirmButtonText: 'Got it',
    });
    return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }

      const response = await tripApi.patch(`/admin/updatePlan/${editData.id}`, formData, config);
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsEditing(false);
        setEditData(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllDestination = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const response = await tripApi.get("/app/listplan", config);
      if (response.status === 200) {
        setTours(response.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    setTours((prevData) => prevData.filter((row) => row.id !== id));
  };

  const handleEdit = (plan) => {
    setEditData(plan);
    setIsEditing(true);
  };

  useEffect(() => {
    getAllDestination();
    return () => { };
  }, [isEditing]);

  return (
    <Box sx={{ paddingX: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography color="#B3C2D1" variant="h4" gutterBottom textTransform={"uppercase"}>
          My Plans
        </Typography>
        <Button onClick={() => setIsEditing(!isEditing)} variant="contained"
          sx={{
            backgroundColor: '#007BFF',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#0056B3',
            }
          }}
          >
          {isEditing ? "List" : "Add"}
        </Button>
      </Stack>
      {isEditing ? (
        <Add
          onCancel={() => {
            setIsEditing(false);
            setEditData(null);
          }}
          onSave={editData ? updateHandler : submitHandler}
          editData={editData}
        />
      ) : (
        <List rowData={tours} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </Box>
  );
};
