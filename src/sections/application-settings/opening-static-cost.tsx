import { Box, Stack, Typography, Grid, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";
import InputAdornment from '@mui/material/InputAdornment';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { IShippingOrderSettings } from '@/@types/shopping-order-settings';

interface Props {
    opening_cost?: number;
    setShippingOrderSettings: React.Dispatch<React.SetStateAction<IShippingOrderSettings | undefined>>;
}

const OpeningStaticCost: React.FC<Props> = ({ opening_cost = 0, setShippingOrderSettings }) => {
    const title = 'Opening static cost';
    const { t } = useTranslation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingOrderSettings(prev => ({ ...prev, opening_cost: Number(e.target.value) }) as IShippingOrderSettings);
    }

    return (
        <Grid xs={12} md={6} lg={6}>
            <Stack sx={{ p: { xs: 2, sm: 3 }, gap: 2 }}>
                <Typography variant="h6">{t(title)}</Typography>
                <TextField
                    value={opening_cost}
                    onChange={handleInputChange}
                    type="number"
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
                    sx={{ maxWidth: 400 }}
                />
            </Stack>
        </Grid>
    );
};

export default OpeningStaticCost;
