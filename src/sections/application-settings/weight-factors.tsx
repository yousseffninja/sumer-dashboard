import { Box, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";
import { createWeights } from '../../utils/const-data';
import InputAdornment from '@mui/material/InputAdornment';
import PercentIcon from '@mui/icons-material/Percent';
import { IShippingOrderSettings } from '@/@types/shopping-order-settings';

const WeightFactors = ({
    light_package_per_km_cost_percentage_multiplier,
    medium_package_per_km_cost_percentage_multiplier,
    heavy_package_per_km_cost_percentage_multiplier,
    setShippingOrderSettings
}: any
) => {

    const { t } = useTranslation();

    const weights = createWeights(
        light_package_per_km_cost_percentage_multiplier,
        medium_package_per_km_cost_percentage_multiplier,
        heavy_package_per_km_cost_percentage_multiplier
    );

    const handleCostChange = (name: string, cost: number) => {
        setShippingOrderSettings(
            (prev: any) => {
                switch (name) {
                    case 'Light':
                        return { ...prev, light_package_per_km_cost_percentage_multiplier: cost }
                    case 'Medium':
                        return { ...prev, medium_package_per_km_cost_percentage_multiplier: cost }
                    case 'Heavy':
                        return { ...prev, heavy_package_per_km_cost_percentage_multiplier: cost }
                    default:
                        return prev;
                }
            }
        )
    }


    return <Grid xs={12} md={6} lg={6}>
        <Box>
            <Typography variant="h5" sx={{ p: 3, pb: 0 }}>{t('Weight')}</Typography>
            <Stack sx={{ p: 3, gap: 2 }}>
                {weights.map(({ id, name, cost }, index) => (
                    <Stack key={index} sx={{ gap: 1 }}>
                        <Typography variant="h6">{t(name)}</Typography>
                        <Typography variant="subtitle2">{t(`Shipping rate between two points for a ${name.toLowerCase()} weight shipment`)}</Typography>
                        <TextField
                            onChange={(e) => handleCostChange(name, Number(e.target.value))}
                            value={cost}
                            type={'number'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <PercentIcon />
                                    </InputAdornment>
                                ),
                            }}
                            id="outlined-basic" label={t('Percentage')} variant="outlined" sx={{ maxWidth: 400 }} />
                    </Stack>
                ))}
            </Stack>
        </Box>
    </Grid>
};
export default WeightFactors;
