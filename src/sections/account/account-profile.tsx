import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const AccountProfile = (props:any) => {
  const {t} = useTranslation();
  const { name, account, username ,avatar} = props;
  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h6"
        >
          {name}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
        >
       {username}  -  {`#${account}`} 
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        {t("Upload picture")}
      </Button>
    </CardActions>
  </Card>
);
};

AccountProfile.propTypes = {
  account:PropTypes.string,
  username:PropTypes.string,
  avatar:PropTypes.string,
  name:PropTypes.string
};
