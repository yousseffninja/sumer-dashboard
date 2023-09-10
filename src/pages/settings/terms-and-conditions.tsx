import Head from 'next/head';
import { Box, Button, Container, OutlinedInput, Tab, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from "react-i18next";
import { Card } from '@mui/material';
import useSocialLinks, { ISocialLink } from '@/hooks/use-social-links';
import { baseURL } from '@/config';
import { Stack } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import useAlert from '@/hooks/use-alert';
import MUIAccordion from '@/components/simple-accordion';
import useTermsConditions from '@/hooks/use-terms-conditions';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useAbout } from '../../hooks/use-about';
import MUIRichTextEditor, { TMUIRichTextEditorRef } from 'mui-rte-fixed';
import RichTextEditor from '@/sections/settings/mui-rte';
import Loading from '@/components/loading';

const Page = () => {
    const title = "Terms and Conditions";
    const { t } = useTranslation();

    const { termsConditions, setTermsConditions, updateTermsConditions, isLoading } = useTermsConditions();

    const { showAlert, renderForAlert } = useAlert();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {

    }

    // const handleClick = async () => {
    //     await updateSocialLink()
    //         .catch(() => {
    //             showAlert('Something went wrong', 'error');
    //         })
    //         .finally(() => {
    //             showAlert('Saved successfully', 'success');
    //         });

    // }
    const [language, setLanguage] = useState<string>('ar');

    const editor = useRef(null);
    const handleLanguageChange = (event: React.SyntheticEvent, language: string) => {
        setLanguage(language);
    };

    const ref = useRef<TMUIRichTextEditorRef>(null)

    const handleClick = () => {
        ref.current?.save()
    }


    const handleFocus = () => {
        ref.current?.focus()
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
            }}>
            <Container maxWidth="xl">
                <Typography variant="h4">{t(title)}</Typography>
                <Card sx={{ mt: 3 }}>
                    <TabContext value={language}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 1 }}>
                            <TabList onChange={handleLanguageChange} aria-label="Languages Tabs">
                                <Tab sx={{ px: 1 }} label="Arabic" value="ar" />
                                <Tab sx={{ px: 1 }} label="English" value="en" />
                            </TabList>
                        </Box>
                        <Stack >

                            {
                                isLoading &&
                                <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Loading />
                                </Box>
                            }

                            <TabPanel sx={{ p: 0 }} value="ar">
                                {
                                    Array.from(termsConditions).map(({ title, description }: any) => {
                                        const { ar: arTitle } = title;
                                        const { ar: arContent } = description;
                                        return (
                                            <MUIAccordion title={title.ar} key={title.en}>
                                                <RichTextEditor
                                                    title={arTitle}
                                                    content={arContent}
                                                    translate
                                                    termsConditions={termsConditions}
                                                    setTermsConditions={setTermsConditions}
                                                    updateTermsConditions={updateTermsConditions}
                                                    showAlert={showAlert}
                                                />
                                            </MUIAccordion>
                                        )
                                    })
                                }
                            </TabPanel>

                            <TabPanel sx={{ p: 0, direction: 'rtl' }} value="en">
                                {
                                    Array.from(termsConditions).map(({ title, description }: any) => {
                                        const { en: enTitle, } = title;
                                        const { en: enContent } = description;
                                        return (
                                            <MUIAccordion title={title.en} key={title.en}>
                                                <RichTextEditor
                                                    title={enTitle}
                                                    content={enContent}
                                                    termsConditions={termsConditions}
                                                    setTermsConditions={setTermsConditions}
                                                    updateTermsConditions={updateTermsConditions}
                                                    showAlert={showAlert}
                                                />
                                            </MUIAccordion>
                                        )
                                    })
                                }
                            </TabPanel>

                        </Stack>
                    </TabContext>
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