import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../..//layouts/dashboard/layout";
import { useClient } from "@/hooks/use-clients";
import { useUser } from "@/hooks/use-users";
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import { UserDetails } from "@/sections/users/user-details";
import { useTranslation } from "react-i18next";
import ClientContextProvider from "@/contexts/client-context";

const Page = () => {
  const { t } = useTranslation();
  const clientContext = useClient();
  const userContext = useUser();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (typeof router.query.userId === "string") {
      await userContext?.getUser(router.query.userId);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setUser(userContext?.user);
    setLoading(false);
  }, [userContext?.user]);

  return (
    <>
      <Head>
        <title>User | Sumer</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <></>
        {!loading && user && (
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                spacing={3}
                sx={{ m: 3 }}
              >
                <Typography variant="h4">
                  {user.name}
                  <Typography variant="body2">
                    <SvgIcon fontSize="small" color="primary">
                      <SecurityIcon />
                    </SvgIcon>
                    {t(user.role)}
                  </Typography>
                </Typography>
                <Avatar sx={{ width: 150, height: 150 }}>
                  <img
                    src={user.userPhoto}
                    srcSet={user.userPhoto}
                    alt={user.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Avatar>
              </Stack>

              <UserDetails user={user} />
            </Stack>
          </Container>
        )}
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