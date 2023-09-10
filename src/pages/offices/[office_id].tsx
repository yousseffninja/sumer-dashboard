import { useEffect, useState } from 'react';
import { Stack, SvgIcon } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useOffice } from '@/hooks/use-offices';
import OfficeContextProvider from '@/contexts/offices-context';
import { useCallback } from "react";
import { DashboardLayout } from '../../layouts/dashboard/layout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
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
import TranslateIcon from "@mui/icons-material/Translate";
import { useRouter } from 'next/router';
const Page = () => {
  const {t}= useTranslation();
  const context = useOffice();
  const [office, setOffice] = useState<any>({})
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {
    if (typeof router.query.office_id === "string") {
      await context?.getOffice(router.query.office_id);
    }
  };

  useEffect(() => {
    fetchUser();
    
  }, []);

  useEffect(() => {
    setOffice(context?.selectedOffice);
    setLoading(false);
  }, [context?.selectedOffice]);


    const handleSubmit = useCallback((event: any) => {
      event.preventDefault();
    }, []);
    const officeInfoList = [
      {
        icon: (
          <SvgIcon fontSize="small">
            <HomeWorkIcon />
          </SvgIcon>
        ),
        label: t("Office Name"),
        value: office.shipping_office?.name,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <CalendarTodayIcon />
          </SvgIcon>
        ),
        label: t("Created at"),
        value:new Date(office?.created_at).toLocaleDateString('en-GB')  ,
      },
    ];
    const UserInfoList = [
      {
        icon: (
          <SvgIcon fontSize="small">
            <FaceIcon />
          </SvgIcon>
        ),
        label: t("Administrator Name"),
        value: office?.name,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <PhoneIcon />
          </SvgIcon>
        ),
        label: t("Phone"),
        value: office?.phone,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <EmailIcon />
          </SvgIcon>
        ),
        label: t("Email"),
        value: office?.email,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <AccountBoxIcon />
          </SvgIcon>
        ),
        label: t("username"),
        value: office?.username,
      },
      {
        icon: (
          <SvgIcon fontSize="small">
            <NoAccountsIcon />
          </SvgIcon>
        ),
        label: t("Status"),
        value: (office?.is_active==true)? t("Active") : t("Baned") ,
        // value: (office?.is_active==true)? "Active" : ("Baned - at " +  (new Date(office?.deleted_at).toLocaleDateString('en-GB'))) ,
      },


    ];
  
    return (
      <div>
        <Card>
          <CardHeader
            subheader={"#" + office.shipping_office?.code}
            title={`${t("Office Details")}`}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={12} wrap="wrap">
              <Grid xs={12} sm={6} md={4}>
                <Stack spacing={1}>
                  <IndexedList items={officeInfoList} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
        <Card>
          <CardHeader subheader={"#" + office.account} title={`${t("Administrator Details")}`} />
          <Divider />
          <CardContent>
            <Grid container spacing={12} wrap="wrap">
              <Grid xs={12} sm={6} md={4}>
                <Stack spacing={1}>
                  <IndexedList items={UserInfoList} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </div>
    );
};

Page.getLayout = (page: any) => (
  <OfficeContextProvider>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </OfficeContextProvider>
);

export default Page;
