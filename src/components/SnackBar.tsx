import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
type Props = {
  message: string;
  open: boolean;
  handleClose: () => void;
  color:any;
  duration:number;
};

const SnackBar: React.FC<Props> = ({ message, open, handleClose, color , duration}) => {
  return (
    
      <Snackbar sx={{ width: '300px' }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={duration}
      bg-color={color}
      
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
