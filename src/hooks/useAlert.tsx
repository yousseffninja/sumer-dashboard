import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useTranslation } from "react-i18next";
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import React, { forwardRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import DoneIcon from '@/assets/icons/done-icon';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function useAlert() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | React.ReactElement>('');
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('info');
  const { t } = useTranslation();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const showAlert = (
    alertMessage: string | React.ReactElement,
    severity: AlertColor = 'info',
    autoHideDuration: number = 3000
  ) => {
    setAlertMessage(alertMessage);
    setAlertSeverity(severity);
    setOpen(true);
  };

  const ApprovedIcon = () => {
    return (
      <Box>
        <Typography sx={{
          bgcolor: "#ecf8ef",
          color: "#0AA630",
          px: 1.1,
          py: 0.7,
          borderRadius: 8
        }}
        >
          <DoneIcon scale={1} />
        </Typography>
      </Box>
    );
  }

  const renderForAlert = (
    autoHideDuration: number = 3000
  ) => {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            sx={handleSx(alertSeverity)}
            iconMapping={{
              success: ApprovedIcon(),
              error: <ErrorOutlineIcon />,
            }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  return {
    showAlert,
    renderForAlert
  }
}


const handleSx = (severity: AlertColor) => {
  switch (severity) {
    case 'success':
      return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'Center',
        height: 70,
        bgcolor: '#FFFFFF'
      }
    case 'error':
      return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'Center',
        height: 70,
        bgcolor: '#FFFFFF',
        color: '#FF0000'
      }
  }
}