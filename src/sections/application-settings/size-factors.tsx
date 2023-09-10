import { Box, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";
import { createSizes, intialSizes } from '../../utils/const-data';
import InputAdornment from '@mui/material/InputAdornment';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { IShippingOrderSettings } from '@/@types/shopping-order-settings';

interface Props {
    small_package_per_km_cost: number | undefined,
    medium_package_per_km_cost: number | undefined,
    large_package_per_km_cost: number | undefined,
    setShippingOrderSettings: React.Dispatch<React.SetStateAction<IShippingOrderSettings | undefined>>
}
const SizeFactors: React.FC<Props> = ({
    small_package_per_km_cost,
    medium_package_per_km_cost,
    large_package_per_km_cost,
    setShippingOrderSettings
}) => {

    const { t } = useTranslation();

    const sizes = createSizes(
        small_package_per_km_cost,
        medium_package_per_km_cost,
        large_package_per_km_cost
    );

    const handleCostChange = (name: string, cost: number) => {
        setShippingOrderSettings(
            (prev: any) => {
                switch (name) {
                    case 'Small':
                        return { ...prev, small_package_per_km_cost: cost }
                    case 'Medium':
                        return { ...prev, medium_package_per_km_cost: cost }
                    case 'Large':
                        return { ...prev, large_package_per_km_cost: cost }
                    default:
                        return prev;
                }
            }
        )
    }
    return <Grid xs={12} md={6} lg={6}>
        <Box>
            <Typography variant="h5" sx={{ p: 3, pb: 0 }}>{t('Size')}</Typography>
            <Stack sx={{ p: { xs: 2, sm: 3 }, gap: 2 }}>
                {sizes.map(({ name, id, cost }) => (
                    <Stack key={id} sx={{ gap: 1 }}>
                        <Typography variant="h6">{t(name)}</Typography>
                        <Typography variant="subtitle2">{t(`Shipping rate between two points for a ${name.toLowerCase()} size shipment`)}</Typography>
                        <TextField
                            onChange={(e) => handleCostChange(name, Number(e.target.value))}
                            value={cost}
                            type={'number'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MonetizationOnOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            id="outlined-basic"
                            label={t('Price')}
                            variant="outlined"
                            sx={{ maxWidth: 400 }} />
                    </Stack>
                ))}
            </Stack>
        </Box>
    </Grid>

};
export default SizeFactors;
