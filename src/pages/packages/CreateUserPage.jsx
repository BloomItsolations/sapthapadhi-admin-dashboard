import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AddUser from "../../components/createuser/AddUser";
import UserListComponent from "../../components/createuser/UserListComponent";
import tripApi from "../../api/tripApi";

const CreateUserPage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const auth = useSelector((state) => state.user?.userInfo);
  const token = auth?.token;

  const fetchUsers = async () => {
    try {
      const response = await tripApi.get("/admin/allusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (editUser) {
      try {
        await tripApi.put(`/admin/updateuser/${editUser.id}`, userData, config);
        setEditUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        await tripApi.post("/admin/createuser", userData, config);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
    setOpenModal(false);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleCancel = () => {
    setEditUser(null);
    setOpenModal(false);
  };

  return (
    <Box sx={{ paddingX: 2 }}>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add User
      </Button>
      <UserListComponent rowData={users} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal
        open={openModal}
        onClose={handleCancel}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#FFFFFF',
            boxShadow: 1,
            padding: 4,
            borderRadius: 1,
            margin: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editUser ? 'Edit User' : 'Add User'}
          </Typography>
          <AddUser
            onSave={handleSave}
            onCancel={handleCancel}
            editData={editUser}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateUserPage;
