import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import React from "react";
import { AccountProfile } from "../sections/account/account-profile";
import { AccountProfileDetails } from "../sections/account/account-profile-details";
import { DashboardLayout } from "../layouts/dashboard/layout";
import { useAdmin } from "@/hooks/use-admins";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminContextProvider from "@/contexts/offices-context";
import { useAuth } from "../hooks/use-auth";
const Page = () => {
  const { t } = useTranslation();
  const context = useAdmin();
  const Authcontext = useAuth();
  const id = Authcontext?.user?.id;
  const [admin, setAdmin] = useState({
    name: "",
    account: "",
    username: "",
    avatar: "",
    email: "",
    updated_at: "",
    created_at: "",
    phone: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchAdmin = async () => {
    
    await context?.getAdmin(id);
  };

  useEffect(() => {
    fetchAdmin();
    
  }, []);

  useEffect(() => {
    setLoading(false);
    
    setAdmin(context?.selectedAdmin);
  }, [context?.selectedAdmin]);

  return (
    <>
      <Head>
        <title>{t("Account")} | Pronto</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">{t("Account")}</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountProfile
                    name={admin?.name}
                    account={admin?.account}
                    username={admin?.username}
                    avatar={admin?.avatar}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails
                    id={admin?.id}
                    email={admin?.email}
                    updated_at={admin?.updated_at}
                    created_at={admin?.created_at}
                    phone={admin?.phone}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page: any) => (
  <AdminContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </AdminContextProvider>
);

export default Page;
