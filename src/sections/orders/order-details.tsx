import { useCallback } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Stack,
  SvgIcon,
  Unstable_Grid2 as Grid
} from '@mui/material';
import React from 'react';
import { IndexedList } from '@/components/indexed-list';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from "@mui/icons-material/Email";
import FaceIcon from "@mui/icons-material/Face";
import TranslateIcon from "@mui/icons-material/Translate";
import MapIcon from '@mui/icons-material/Map';
import PropTypes from "prop-types";

import { useTranslation } from 'react-i18next';
import { red } from '@mui/material/colors';
import { items } from '@/layouts/dashboard/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const OrderDetails = (props:any) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { order } = props;

  const orderInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: `${t("created_at")} : ${order.created_at}`,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: `${t("payee")} : ${order.payee}`,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: `${t("collect_amount")} : ${order.collect_amount}`,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: `${t("shipping_amount")} : ${order.shipping_amount}`,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: `${t("total_amount")} : ${order.total_amount}`,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: `${t("total_weight")} : ${order.total_weight}`,
    },
  ];

  const addressesList = order.__addresses__ ? order.__addresses__.map((address: any, index: number) => {
        return {
          icon: index + 1,
          label: address.name,
          value: address.address,
        };
      })
    : [];
  const driver = order.driver? order.driver : null;
  const driverList = driver? [
    {
      icon: (
        <SvgIcon fontSize="small">
          <FaceIcon />
        </SvgIcon>
      ),
      label: `${t("name")} : ${driver.name}`,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <FaceIcon />
        </SvgIcon>
      ),
      label: `${t("phone")} : ${driver.phone}`,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <FaceIcon />
        </SvgIcon>
      ),
      label: `${t("address")} : ${driver.address}`,
      value: driver.address,
      link: `https://maps.google.com/?q=${driver.latitude},${driver.longitude}`
    },

  ] : [];
    
  //mapping order.addresses to addresses list

  return (
    <div>
      <Card>
        <CardHeader subheader={"# " + order.number} title={"# " + order.number} />
        <Divider />
        <CardContent>
          <Grid container wrap="wrap">
            <Grid xs={12} sm={12} md={12}>
              <Stack spacing={1}>
                <IndexedList items={orderInfoList} />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
      <Grid container spacing={4} wrap="wrap">
        {order?.addresses?.map((item: any, index: number) => {
          const list = [
            {
              icon: (
                <SvgIcon fontSize="small">
                  <FaceIcon />
                </SvgIcon>
              ),
              label: t("Name"),
              value: item.name,
            },
            {
              account: item.account,
              icon: (
                <SvgIcon fontSize="small">
                  <PhoneIcon />
                </SvgIcon>
              ),
              label: t("Phone"),
              value: item.phone,
            },
            {
              account: item.account,
              icon: (
                <SvgIcon fontSize="small">
                  <MapIcon />
                </SvgIcon>
              ),
              label: t("Address"),
              value: item.address,
              link: `https://maps.google.com/?q=${item.latitude},${item.longitude}`
            }
            
          ];
          return (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card sx={{ mt: 2}}>
                <CardHeader title={t(item.type)} 
                  avatar={
                    <Avatar sx={{ bgcolor: red[800] }} aria-label="recipe" src={item.avatar} alt="S">
                    </Avatar>
                  }>
                  </CardHeader>
                
                <Divider />
                <CardContent>
                  <Stack spacing={1}>
                    <IndexedList items={list} />
                  </Stack>
                </CardContent>
                <CardActions>
                  <Grid 
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                  >
                      <Button variant="contained" onClick={() => router.push(`/users-management/users/${item.account}`)}>
                          {t('profile')}
                      </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        {driver && (
          <Grid xs={12} sm={6} md={4}>
              <Card sx={{ mt: 2}}>
                <CardHeader title={t('Driver')} 
                  avatar={
                    <Avatar sx={{ bgcolor: colors.grey[800] }} aria-label="recipe" src={driver.avatar} alt="D">
                    </Avatar>
                  }
                  />
                <Divider />
                <CardContent>
                  <Stack spacing={1}>
                    <IndexedList items={driverList} />
                  </Stack>
                </CardContent>
                <CardActions>
                  <Grid 
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                  >
                      <Button variant="contained" onClick={() => router.push(`/users-management/users/${driver.account}`)}>
                          {t('profile')}
                      </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
        )}
      </Grid>
    </div>
  );
}

OrderDetails.prototype = {
  order: PropTypes.object
}
