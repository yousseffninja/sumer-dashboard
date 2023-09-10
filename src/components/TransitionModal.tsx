import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 543,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 1
};

type TransitionModalProps = {
  children: React.ReactNode;
  state: boolean
  handleClose?: () => void;
  openModalButton?:any;
}

export default function TransitionModal({
  children,
  state,
  handleClose,
  openModalButton
}: TransitionModalProps): JSX.Element {

  return (

    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={state}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={state}>
        <Box sx={style}>
          <CloseIcon onClick={handleClose} sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 2,
            fontSize: 20,
            color: 'grey.500',
            '&:hover': {
              color: 'black'
            }

          }}/>
          {children}
        </Box>
      </Fade>
    </Modal>

  );
}