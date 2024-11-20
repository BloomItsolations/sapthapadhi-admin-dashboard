import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "../../components/createuser/AddUser";
import UserListComponent from "../../components/createuser/UserListComponent";
import { createNewUser, getAllUsers } from "../../store/auth/userActions";

const CreateUserPage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const auth = useSelector((state) => state.user?.userInfo);
  const allusers = useSelector((state) => state.user?.allusers);
  const token = auth?.token;
  const dispatch = useDispatch();

  useEffect(() => {
    if (allusers) {
      setUsers(allusers);
    }
  }, [allusers]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [update]);

  const handleSave = async (userData) => {
    try {
      dispatch(createNewUser(userData));
      setUpdate(!update);
    } catch (error) {
      console.error("Error creating user:", error);
    }
    setOpenModal(false);
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
      {/* Add User Button with custom color */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#007BFF", // Primary button background
          color: "#FFFFFF", // Primary button text
          "&:hover": {
            backgroundColor: "#0056B3", // Hover state background
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        Add User
      </Button>

      {/* User List Component */}
      <UserListComponent rowData={users} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Modal for adding or editing user */}
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
            backgroundColor: '#141E30', // Background color matching the theme
            boxShadow: 1,
            padding: 4,
            borderRadius: 1,
            margin: 'auto',
            color: '#FFFFFF', // Text color inside modal
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
