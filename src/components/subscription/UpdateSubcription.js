import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const UpdateSubscription=({onCancel,onSave, editData})=>{
      const [user_sub_data,setUserSubData]=useState({
        startDate:"",
        endDate:"",
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        plan_name:"",
        amount:""
      })
      const handleSubmit = (e) => {
        e.preventDefault();
        onSave({name:"shivam"});
      }
         console.log("editData",editData);
      const handleChange=()=>{
        console.log("hello")
      }
      useEffect(()=>{
         if(editData){
            setUserSubData({...user_sub_data,startDate:editData.startDate,endDate:editData.editData,firstName:editData?.User.firstName,lastName:editData.User.lastName,phone:editData.User.phone,email:editData.User.email,plan_name:editData.Plan.name,amount:editData.Plan.amount })
         }
      },[editData])


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2, background: "linear-gradient(135deg, #141E30, #243B55)",  boxShadow: 1, padding: 2, borderRadius: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="firstName"
            id="firstName"
            label="First Name"
            value={user_sub_data.firstName}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="lastName"
            id="lastName"
            label="Last Name"
            value={user_sub_data.lastName}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="email"
            name="email"
            id="email"
            label="Email"
            value={user_sub_data.email}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="phone"
            id="phone"
            label="Phone"
            value={user_sub_data.phone}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="date"
            name="startDate"
            id="startDate"
            label="Start Date"
            value={user_sub_data.startDate}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="date"
            name="startDate"
            id="startDate"
            label="Start Date"
            value={user_sub_data.endDate}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="plan_name"
            id="plan_name"
            label="Plan Name"
            value={user_sub_data.plan_name}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', // Set text color to white
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            size="small"
            type="text"
            name="amount"
            id="amount"
            label="Amount"
            value={user_sub_data.amount}
            onChange={handleChange}
            fullWidth
            sx={{

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#007BFF',
                },
                '&:hover fieldset': {
                  borderColor: '#0056B3',
                },
                '& input': {
                  color: 'white', 
                },
              },
            }}
          />
        </Grid>
       
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", margin: "10px 0px", gap: 2 }}>
        <Button color="error" onClick={onCancel} variant="contained">
          Close
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
    )
}
export default UpdateSubscription;