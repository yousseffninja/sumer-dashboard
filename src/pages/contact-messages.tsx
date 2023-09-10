import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../layouts/dashboard/layout";
import { useSelection } from "@/hooks/use-selection";
import { useTranslation } from "react-i18next";
import { ContactMessagesTable } from "@/sections/contact-messages/contact-message-table";
import { ContactMessagesSearch } from "@/sections/contact-messages/contact-message-search";
import { useContactMessage } from "@/hooks/use-contact-messages";
import ContactMessageContextProvider from "@/contexts/contact-message-context";

const Page = () => {
  const { t } = useTranslation();

  const contactMessageContext = useContactMessage();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    filter: [
      {
        key: "",
        value: "",
      },
    ],
  });
  const contactMessagesIds: any[] | undefined = useMemo(() => [], []);
  //   const contactMessagesIds : any[] | undefined = useMemo(() =>  contactMessageContext?.contactMessages.map((item: any) => item.id), [contactMessageContext?.contactMessages]);

  const contactMessagesSelection = useSelection(contactMessagesIds);

  const handlePageChange = (event: any, newPage: number) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleRowsPerPageChange = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleSearch = (event: any) => {
    const txt = event.target.value.toString();
    setController({
      ...controller,
      page: 0,
      filter: [
        {
          key: "name",
          value: txt,
        },
        {
          key: "email",
          value: txt,
        },
        {
          key: "title",
          value: txt,
        },
        {
          key: "phone",
          value: txt,
        },
      ],
    });
  };

  useEffect(() => {
    contactMessageContext?.fetchContactMessages(
      controller.page,
      controller.rowsPerPage,
      controller.filter
    );
    
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("ContactMessages")} | Pronto</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("ContactMessages")}</Typography>
              </Stack>
              <div>
                {/* <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button> */}
              </div>
            </Stack>
            <ContactMessagesSearch onSearchChange={handleSearch} />
            {(contactMessageContext == undefined || contactMessageContext?.count > 0) && (
              <ContactMessagesTable
                count={contactMessageContext?.count}
                items={contactMessageContext?.contactMessages}
                onDeselectAll={contactMessagesSelection.handleDeselectAll}
                onDeselectOne={contactMessagesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={contactMessagesSelection.handleSelectAll}
                onSelectOne={contactMessagesSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={contactMessagesSelection.selected}
                handleSuspend={contactMessageContext?.deleteContactMessage}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <ContactMessageContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </ContactMessageContextProvider>
);

export default Page;
