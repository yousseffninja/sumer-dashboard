import Head from 'next/head';
import { Box, Card, Container, Stack, Tab, Tabs, Typography, Button, OutlinedInput } from '@mui/material';
import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useAbout } from '../../hooks/use-about';
import MUIRichTextEditor, { TMUIRichTextEditorRef } from 'mui-rte-fixed';

const Page = () => {
  const title = 'About';
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>('ar');

  const editor = useRef(null);
  const handleLanguageChange = (event: React.SyntheticEvent, language: string) => {
    setLanguage(language);
  };
  const {
    arTitle,
    arContent,
    enTitle,
    enContent,
    updateData,
    handleChange
  } = useAbout()


  const ref = useRef<TMUIRichTextEditorRef>(null)

  const handleClick = () => {

    ref.current?.save()
    updateData()

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
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4">
          {t(title)}
        </Typography>

        <Card sx={{ mt: 3 }}>
          <Box sx={{ width: '100%', typography: 'body1', }}>
            <TabContext value={language}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleLanguageChange} aria-label="Languages Tabs">
                  <Tab sx={{ px: 1 }} label="Arabic" value="ar" />
                  <Tab sx={{ px: 1 }} label="English" value="en" />
                </TabList>
              </Box>
              <TabPanel sx={{ pt: 0 }} value="ar">
                <Stack direction="row" alignItems={'center'} gap={1} sx={{ mt: 2 }}>
                  <Typography variant="h6">
                    {t('Title')} :
                  </Typography>
                  <OutlinedInput
                    value={arTitle}
                    onChange={
                      (event) => handleChange(event.target.value, 'arTitle')
                    }
                  />
                </Stack>
                <MUIRichTextEditor
                  defaultValue={arContent}
                  ref={ref}
                  label="Type something here..."
                  onBlur={() => ref.current?.save()}
                  onSave={(data) => handleChange(data, 'arContent')}
                />
              </TabPanel>






              <TabPanel sx={{ pt: 0, direction: 'rtl' }} value="en">
                <Stack direction="row" alignItems={'center'} gap={1} sx={{ mt: 2 }}>
                  <Typography variant="h6">
                    Title :
                  </Typography>
                  <OutlinedInput
                    value={enTitle}
                    onChange={
                      (event) => handleChange(event.target.value, 'enTitle')
                    }
                  />
                </Stack>
                <MUIRichTextEditor
                  defaultValue={enContent}
                  ref={ref}
                  label="Type something here..."
                  onBlur={() => ref.current?.save()}
                  onSave={(data) => handleChange(data, 'enContent')}
                />
              </TabPanel>
            </TabContext>
            <Button
              onClick={handleClick}
              sx={{ m: 3, mt: 0 }} variant="contained">
              {t('Save')}
            </Button>
          </Box>
        </Card>

      </Container>
    </Box>
  </>
}


Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;