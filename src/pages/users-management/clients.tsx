import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { UsersTable } from "@/sections/users/users-table";
import { UsersSearch } from "@/sections/users/users-search";
import { useSelection } from "@/hooks/use-selection";
import { useClient } from "@/hooks/use-clients";
import { useTranslation } from "react-i18next";
import ClientContextProvider from "@/contexts/client-context";


const Page = () => {

  const { t } = useTranslation();
  const clientContext = useClient();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    filter: [{
      key: "",
      value: ""
    }],
  });

  const clientsIds: any[] | undefined = useMemo(
    () => clientContext?.clients.map((client: any) => client.id),
    [clientContext?.clients]
  );
  const clientsSelection = useSelection(clientsIds);

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
    const txt = (event.target.value).toString()
    setController({
      ...controller,
      page: 0,
      filter: [{
        key: "name",
        value: txt
      },
      {
        key: "account",
        value: txt
      },
      {
        key: "phone",
        value: txt
      }],
    });
  };

  useEffect(() => {
    clientContext?.fetchClients(controller.page, controller.rowsPerPage, controller.filter);
    
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("Clients")} | Pronto</title>
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
                <Typography variant="h4">{t("Clients")}</Typography>
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
            <UsersSearch onSearchChange={handleSearch} filter={controller?.filter[0].value} />
            {(clientContext == undefined || clientContext?.count > 0) && (
              <UsersTable
                count={clientContext?.count}
                items={clientContext?.clients}
                onDeselectAll={clientsSelection.handleDeselectAll}
                onDeselectOne={clientsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={clientsSelection.handleSelectAll}
                onSelectOne={clientsSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={clientsSelection.selected}
                handleSuspend={clientContext?.suspendClient}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};


Page.getLayout = (page: any) => (
  <ClientContextProvider>
    <DashboardLayout>{page}</DashboardLayout>;
  </ClientContextProvider>
);

export default Page;
