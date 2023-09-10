import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {useTranslation} from "react-i18next";

export default function ContactMessageDialog(props: any) {
  const {
     item,
     open,
     handleClickOpen,
     handleClose
    } = props;
    const { t } = useTranslation();
  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
            <Typography>
                {item.title}
            </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
                <ListItem>
                    <ListItemText primary={t("Name")} secondary={item.name?item?.name:"-"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={t("Phone")} secondary={item?.phone?item?.phone:"-"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={t("Email")} secondary={item?.email?item?.email:"-"} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={t("Message")} secondary={item?.message} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={t("Created at")} secondary={new Date(item?.created_at).toLocaleDateString('en-GB')} />
                </ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

ContactMessageDialog.propTypes = {
  item: PropTypes.object,
  handleClickOpen: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool
};
