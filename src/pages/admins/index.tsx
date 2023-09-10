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
import { useAdmin } from "@/hooks/use-admins";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import AdminContextProvider from "@/contexts/admin-context";

const Page = () => {
  const { t } = useTranslation();

  const adminContext = useAdmin();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    filter: [{
      key: "",
      value: ""
    }],
  });

  const adminsIds: any[] | undefined = useMemo(
    () => adminContext?.admins.map((admin: any) => admin.id),
    [adminContext?.admins]
  );
  const adminsSelection = useSelection(adminsIds);

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
    adminContext?.fetchAdmins(controller.page, controller.rowsPerPage, controller.filter);
    
  }, [controller]);

  return (
    <>
      <Head>
        <title>{t("Admins")} | Pronto</title>
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
                <Typography variant="h4">{t("Admins")}</Typography>
              </Stack>
              <div>
              <Button
                    component={NextLink}
                    href="/admins/add"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    {t("Add")}
                  </Button>
              </div>
            </Stack>
            <UsersSearch onSearchChange={handleSearch} />
            {(adminContext == undefined || adminContext?.count > 0) && (
              <UsersTable
                count={adminContext?.count}
                items={adminContext?.admins}
                onDeselectAll={adminsSelection.handleDeselectAll}
                onDeselectOne={adminsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={adminsSelection.handleSelectAll}
                onSelectOne={adminsSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={adminsSelection.selected}
                handleSuspend={adminContext?.suspendAdmin}
                isAdmin={true}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <AdminContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </AdminContextProvider>
);

export default Page;
