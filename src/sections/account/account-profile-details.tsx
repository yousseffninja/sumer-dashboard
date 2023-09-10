import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Stack, SvgIcon } from '@mui/material';
import { IndexedList } from "@/components/indexed-list";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';


export const AccountProfileDetails = (props:any) => {
    const { t } = useTranslation();
  const router = useRouter();
const {id,email,updated_at,created_at,phone} = props;

const handleRoute = () => {
  router.push(`/admins/update-admin/${id}`);
};

  const UserInfoList = [
    
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: t("Phone"),
      value: phone,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EmailIcon />
        </SvgIcon>
      ),
      label: t("Email"),
      value: email,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <CalendarTodayIcon />
        </SvgIcon>
      ),
      label: t("Created at"),
      value:new Date(created_at).toLocaleDateString('en-GB')  ,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <CalendarTodayIcon />
        </SvgIcon>
      ),
      label: t("Updated at"),
      value:new Date(updated_at).toLocaleDateString('en-GB')  ,
    },
    


  ];

  return (
      <Card>
        <CardHeader
          subheader={`${t("The information can be edited")}`}
          title={`${t("Account Details")}`}
        />
        <CardContent sx={{ pt: 0 , m: -5}} >
            <Grid container spacing={4} wrap="wrap">
              <Grid xs={12} sm={6} md={4}>
                <Stack spacing={1}>
                  <IndexedList items={UserInfoList} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={()=>handleRoute()}>
            {t("Edit")}
          </Button>
        </CardActions>
      </Card>
  );
};
