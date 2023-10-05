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
import { useUser } from "@/hooks/use-users";
import { useTranslation } from "react-i18next";
import ClientContextProvider from "@/contexts/client-context";


const Page = () => {

  const { t } = useTranslation();
  const clientContext = useClient();
  const userContext = useUser();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    filter: [{
      key: "",
      value: ""
    }],
  });

  const [selectedRole, setSelectedRole] = useState('');

  const clientsIds: any[] | undefined = useMemo(
    () => clientContext?.clients.map((client: any) => client.id),
    [clientContext?.clients]
  );
  const clientsSelection = useSelection(clientsIds);

  const usersIds: any[] | undefined = useMemo(
    () => userContext?.users.map((user: any) => user._id),
    [userContext?.users]
  );
  const usersSelection = useSelection(usersIds);

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
    userContext?.fetchUsers(controller.page, controller.rowsPerPage, controller.filter);  
  }, [controller]);

  useEffect(() => {
    if (selectedRole === "admin") {
      setController({
        ...controller,
        filter: [{
          key: "role",
          value: "admin"
        }]
      });
    } else if (selectedRole === "individual") {
      setController({
        ...controller,
        filter: [{
          key: "role",
          value: "individual"
        }]
      });
    } else if (selectedRole === "salon service") {
      setController({
        ...controller,
        filter: [{
          key: "role",
          value: "salon service"
        }]
      });
    } else if (selectedRole === "consultant") {
      setController({
        ...controller,
        filter: [{
          key: "role",
          value: "consultant"
        }]
      });
    } else {
      setController({
        ...controller,
        filter: []
      });
    }
  }, [selectedRole]);

  return (
    <>
      <Head>
        <title>{t("Clients")} | Sumer</title>
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
            {/* <UsersSearch onSearchChange={handleSearch} filter={controller?.filter[0].value} /> */}
            {(userContext == undefined || userContext?.count > 0) && (
              <UsersTable
                count={userContext?.count}
                items={userContext?.users}
                onDeselectAll={usersSelection.handleDeselectAll}
                onDeselectOne={usersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={usersSelection.handleSelectAll}
                onSelectOne={usersSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={usersSelection.selected}
                handleSuspend={clientContext?.suspendClient}
                setSelectedRole={setSelectedRole}
                selectedRole={selectedRole}
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
