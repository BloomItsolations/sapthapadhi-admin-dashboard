import React from "react";
import { Box, CircularProgress, Typography, Backdrop } from "@mui/material";

const Loading = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <CircularProgress sx={{ color: "primary" }}></CircularProgress>
        <Typography color={"white"}>Loading...</Typography>
      </Box>
    </Backdrop>
  );
};

export default Loading;
