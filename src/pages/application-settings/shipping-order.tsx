import Head from 'next/head';
import { Box, Button, ButtonBase, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from "react-i18next";
import { Card } from '@mui/material';
import WeightFactors from '@/sections/application-settings/weight-factors';
import SizeFactors from '@/sections/application-settings/size-factors';
import OpeningStaticCost from '@/sections/application-settings/opening-static-cost';
import useShippingOrderSettings from '@/hooks/use-order-shipping-settings';
import { IShippingOrderSettings } from '@/@types/shopping-order-settings';

const Page = () => {
    const title = "Application Settings";
    const { t } = useTranslation();

    const { shippingOrderSettings, setShippingOrderSettings, updateShippingOrderSettings, isLoading, renderForAlert } = useShippingOrderSettings();

    const {
        opening_cost,
        heavy_package_per_km_cost_percentage_multiplier,
        large_package_per_km_cost,
        medium_package_per_km_cost,
        medium_package_per_km_cost_percentage_multiplier,
        small_package_per_km_cost,
        light_package_per_km_cost_percentage_multiplier,
    } = shippingOrderSettings || {};
    return <>
        <Head>
            <title>
                {title} | Pronto
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

                <Typography variant="h4">{t(title)}</Typography>

                <Card sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h5" sx={{ pb: 0 }}>{t('Shipping Order')}</Typography>



                    <Grid container spacing={{ xs: 1, sm: 3 }} marginTop={1}>
                        <SizeFactors
                            small_package_per_km_cost={small_package_per_km_cost}
                            medium_package_per_km_cost={medium_package_per_km_cost}
                            large_package_per_km_cost={large_package_per_km_cost}
                            setShippingOrderSettings={setShippingOrderSettings}
                        />
                        <WeightFactors
                            light_package_per_km_cost_percentage_multiplier={light_package_per_km_cost_percentage_multiplier ?? 0}
                            medium_package_per_km_cost_percentage_multiplier={medium_package_per_km_cost_percentage_multiplier ?? 0}
                            heavy_package_per_km_cost_percentage_multiplier={heavy_package_per_km_cost_percentage_multiplier ?? 0}
                            setShippingOrderSettings={setShippingOrderSettings}
                        />
                    </Grid>
                    <OpeningStaticCost opening_cost={opening_cost} setShippingOrderSettings={setShippingOrderSettings} />
                    <Button onClick={updateShippingOrderSettings} sx={{ mx: 3 }} variant="contained" color="primary">{t('Save')}</Button>
                </Card>

            </Container>
        </Box>
        { renderForAlert() }
    </>
};

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;