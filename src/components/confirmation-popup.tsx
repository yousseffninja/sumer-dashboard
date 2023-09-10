import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationPopup(props: any) {
  const { message, confirmFuntion, open, setOpen } = props;
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert"
      >
        <DialogTitle>{t("Are you sure ?")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            {t("Cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={(event: any) => {
              confirmFuntion(event);
            }}
          >
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
