import Head from 'next/head';
import { Box, Button, Container, OutlinedInput, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from "react-i18next";
import { Card } from '@mui/material';
import useSocialLinks, { ISocialLink } from '@/hooks/use-social-links';
import { baseURL } from '@/config';
import { Stack } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import useAlert from '@/hooks/use-alert';

const Page = () => {
    const title = "Social Links";
    const { t } = useTranslation();

    const { socialLinks, setSocialLinks, updateSocialLink } = useSocialLinks();

    const { showAlert, renderForAlert } = useAlert()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const url = event.target.value;
        setSocialLinks(
            (prev) => prev.map((obj: ISocialLink) => {
                if (obj.name === name.toLocaleLowerCase()) {
                    return { ...obj, url };
                }
                return obj;
            })
        );
    }

    const handleClick = async () => {
        await updateSocialLink()
            .catch(() => {
                showAlert('Something went wrong', 'error');
            })
            .finally(() => {
                showAlert('Saved successfully', 'success');
            });

    }

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
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {
                            socialLinks.map(({ id, name, url, icon }: any) => {
                                name = name.charAt(0).toUpperCase() + name.slice(1);
                                return <Grid xs={12} md={6} key={id}>
                                    {/* <Image width={32} height={32} src={icon} alt={name} /> */}
                                    <Typography sx={{ ml: 5, mb: 1 }}>{t(name)}</Typography>
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 1

                                    }}>
                                        <img width={32} height={32} src={baseURL + icon} alt={name} />
                                        <OutlinedInput
                                            onChange={
                                                (event) => handleChange(event, name)
                                            }
                                            sx={{
                                                flexGrow: 1
                                            }}
                                            value={url} />
                                    </Stack>
                                </Grid>
                            })

                        }
                    </Grid>
                    <Button onClick={handleClick} sx={{ mt: 3 }} variant="contained" color="primary">{t('Save')}</Button>
                </Card>
            </Container>
        </Box>
        {renderForAlert()}
    </>

};

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;