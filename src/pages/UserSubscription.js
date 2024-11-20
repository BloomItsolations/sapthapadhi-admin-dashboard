import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import tripApi from "../api/tripApi";
import UpdateSubscription from "../components/subscription/UpdateSubcription";
import ListSubUser from "../components/subscription/ListSubUser";

const UserSubscription=()=>{
     const [subscription,setSubscription]=useState(null);
    const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  let auth = useSelector((state) => state.user?.userInfo);
  let token = auth?.token;

  const updateHandler = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
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

  const getAllUserAndPlan = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await tripApi.get("/admin/user-suscription", config);
      if (response.status === 200) {
        setSubscription(response?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleEdit = (user_plan_details) => {
    console.log('hellow this is edit data is calling',user_plan_details)
    setEditData(user_plan_details);
    setIsEditing(true);
  };

  useEffect(() => {
    getAllUserAndPlan();
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
          User Purchase Plan
        </Typography>
       
      </Stack>
      {isEditing ? (
        <UpdateSubscription  onCancel={() => { setIsEditing(false); setEditData(null); }}
          onSave={ updateHandler }
          editData={editData}
        /> 
       ) : 
       subscription && <ListSubUser rowData={subscription?.user_sub}  onEdit={handleEdit} /> 
      } 
    </Box>
    )
}
export default UserSubscription;