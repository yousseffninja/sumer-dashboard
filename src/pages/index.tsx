import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import React from 'react';
import { DashboardLayout } from '../layouts/dashboard/layout';
import { OverviewLatestOrders } from '../sections/overview/overview-latest-orders';
import { OverviewLatestVehicles } from '../sections/overview/overview-latest-vehicles';
import OrderContextProvider from '@/contexts/order-context';
const now = new Date();
import { useTranslation } from 'react-i18next';

const Page = () => {
    const {t}= useTranslation();
  return(
  <>
    <Head>
      <title>
        {t("Overview")} | Sumer
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestVehicles
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
}
Page.getLayout = (page: any) => (
  <DashboardLayout>
    <OrderContextProvider> {page}</OrderContextProvider>
  </DashboardLayout>
);

export default Page;
