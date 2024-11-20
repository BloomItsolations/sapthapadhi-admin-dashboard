import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ListCouple from "../components/createcouple/ListCouple";
import AddCouple from "../components/createcouple/AddCouple";
import tripApi from "../api/tripApi";

const CreateCouple = () => {
  const [couples, setCouples] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  let auth = useSelector((state) => state.user?.userInfo);
  let token = auth?.token;

  const submitHandler = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("formdata",formData)

      const response = await tripApi.post("/admin/addCouplesData", formData, config);
      if (response.status === 201) {
        toast.success(response.data.message);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateHandler = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await tripApi.patch(`/admin/updateCouple/${editData.id}`, formData, config);
      if (response.status === 200){
        toast.success(response?.data?.message);
        setIsEditing(false);
        setEditData(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getAllCouples = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await tripApi.get("/admin/couples", config);
      if (response.status === 200) {
        console.log("Respons",response)
        setCouples(response?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
         console.log("couples",couples);
         let updatecouple=couples.couples?.filter((row) => row.id !== id)
    setCouples({...couples, couples:updatecouple});
  };

  const handleEdit = (couple) => {
    setEditData(couple);
    setIsEditing(true);
  };

  useEffect(() => {
    getAllCouples();
    return () => {};
  }, [isEditing]);

  return (
    <Box sx={{ paddingX: 2, background: "linear-gradient(135deg, #141E30, #243B55)", }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" color={'white'} gutterBottom textTransform={"uppercase"}>
          Couples
        </Typography>
        <Button onClick={() => setIsEditing(!isEditing)} variant="contained"
           sx={{
            backgroundColor: "#007BFF", // Primary Button Color
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#0056B3", // Hover Background
            },
          }}
          >
          {isEditing ? "List" : "Add"}
        </Button>
      </Stack>
      {isEditing ? (
        <AddCouple
          onCancel={() => {
            setIsEditing(false);
            setEditData(null);
          }}
          onSave={editData ? updateHandler : submitHandler}
          editData={editData}
        />
      ) : 
       couples &&  <ListCouple rowData={couples?.couples} onDelete={handleDelete} onEdit={handleEdit} />
      }
    </Box>
  );
};

export default CreateCouple;
