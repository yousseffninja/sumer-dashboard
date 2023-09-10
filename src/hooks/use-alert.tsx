import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useTranslation } from "react-i18next";
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { forwardRef, useState } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function useAlert() {
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>('info');
    const { t } = useTranslation();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const showAlert = (
        alertMessage: string,
        severity: AlertColor = 'info',
        autoHideDuration: number = 3000
    ) => {
        setAlertMessage(alertMessage);
        setAlertSeverity(severity);
        setOpen(true);
    };

    const renderForAlert = (
        autoHideDuration: number = 3000
    ) => {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                        {t(alertMessage)}
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
