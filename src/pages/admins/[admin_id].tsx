import { useEffect, useState } from "react";
import { Stack, SvgIcon } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOffice } from "@/hooks/use-offices";
import AdminContextProvider from "@/contexts/offices-context";
import { useAdmin } from "@/hooks/use-admins";
import { useCallback } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Card, CardContent, CardHeader, Divider, Unstable_Grid2 as Grid } from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FaceIcon from "@mui/icons-material/Face";
import TranslateIcon from "@mui/icons-material/Translate";
import { useRouter } from "next/router";
const Page = () => {
  const { t } = useTranslation();
  const context = useAdmin();
  const [admin, setAdmin] = useState<any>({});
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fetchAdmin = async () => {
    if (typeof router.query.admin_id === "string") {
      await context?.getAdmin(router.query.admin_id);
    }
  };

  useEffect(() => {
    fetchAdmin();
    
  }, []);

  useEffect(() => {
    setAdmin(context?.selectedAdmin);
    setLoading(false);
  }, [context?.selectedAdmin]);

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  const UserInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <FaceIcon />
        </SvgIcon>
      ),
      label: t("Admin Name"),
      value: admin?.name,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: t("Phone"),
      value: admin?.phone,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EmailIcon />
        </SvgIcon>
      ),
      label: t("Email"),
      value: admin?.email,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <AccountBoxIcon />
        </SvgIcon>
      ),
      label: t("username"),
      value: admin?.username,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <CalendarTodayIcon />
        </SvgIcon>
      ),
      label: t("Created at"),
      value: new Date(admin?.created_at).toLocaleDateString("en-GB"),
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <NoAccountsIcon />
        </SvgIcon>
      ),
      label: t("Status"),
      value: !(admin?.status == "Active") ? t("Active") : t("Baned"),
    },
  ];

  return (
    <div>
      <Card>
        <CardHeader subheader={"#" + admin?.account} title={`${t("Admin Details")}`} />
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
  <AdminContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </AdminContextProvider>
);

export default Page;
