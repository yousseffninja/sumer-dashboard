import PropTypes from "prop-types";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

export const OrderStepper = (props: any) => {
    const {currentStatus, statuses} = props;
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {statuses.map((status: any, index: number) => (
          <Step key={index}>
            <StepLabel>{status.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
OrderStepper.prototype = {
  currentStatus: PropTypes.string,
  statuses: PropTypes.array
}
