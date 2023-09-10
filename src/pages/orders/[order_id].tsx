import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  colors,
  CardActions,
} from '@mui/material';

import { Stack, SvgIcon } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useOffice } from '@/hooks/use-offices';
import OfficeContextProvider from '@/contexts/offices-context';
import { useCallback } from "react";
import { DashboardLayout } from '../../layouts/dashboard/layout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FaceIcon from "@mui/icons-material/Face";
import { useRouter } from 'next/router'; 
import { useOrder } from '@/hooks/use-orders';
import { red } from '@mui/material/colors';
import OrderContextProvider from '@/contexts/order-context';

const Page = () => {
  const {t}= useTranslation();
  const [order, setOrder] = useState<any>({})
  const router = useRouter();
  const [loading, setLoading] = useState(true);

 const context = useOrder();

  const fetchOrder = async () => {
    if (typeof router.query.order_id === "string") {
      await context?.getOrder(router.query.order_id);
    }
  };

  useEffect(() => {
    fetchOrder();
    
  }, []);

  useEffect(() => {
    setOrder(context?.selectedOrder);
    setLoading(false);
  }, [context?.selectedOrder]);


    const handleSubmit = useCallback((event: any) => {
      event.preventDefault();
    }, []);
    const orderInfoList = [
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("Status")}`,
        value: t(order.status),
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("Created at")}`,
        value: (new Date(order.created_at).toLocaleDateString('en-GB')),
      },
      
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("payee")}`,
        value: t(order.payee),
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("collect_amount")}`,
        value:` ${order.collect_amount}`, 
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("shipping_amount")}`,
        value:` ${order.shipping_amount}`,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("total_amount")}`,
        value: order?.total_amount
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("total_weight")}`,
        value:order?.total_weight,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <InfoIcon />
          </SvgIcon>
        ),
        label: `${t("Estimated Time")}`,
        value:order?.estimated_time,
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
        label: `${t("Name")} : ${driver.name}`,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <PhoneIcon />
          </SvgIcon>
        ),
        label: `${t("Phone")} : ${driver.phone}`,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
             <MapIcon />
          </SvgIcon>
        ),
        label: `${t("Address")} : ${driver.address}`,
        value: driver.address,
        link: `https://maps.google.com/?q=${driver.latitude},${driver.longitude}`
      },
  
    ] : [];
        
    return (
      <div>
        <Card>
          <CardHeader title={t("Order Details")} subheader={"# " + order.number} />
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
                      <Avatar sx={{ bgcolor: 'primary' }} aria-label="recipe" src={item.avatar} alt="S">
                      </Avatar>
                    }>
                    </CardHeader>
                  
                  <Divider />
                  <CardContent>
                    <Stack spacing={1}>
                      <IndexedList items={list} />
                    </Stack>
                  </CardContent>
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
                </Card>
              </Grid>
          )}
        </Grid>
      </div>
    );
  }
  

Page.getLayout = (page: any) => (
  <OrderContextProvider>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </OrderContextProvider>
);

export default Page;
