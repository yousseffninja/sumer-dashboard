import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "simplebar-react/dist/simplebar.min.css";
import React from "react";
import { AuthProvider, AuthConsumer } from "../contexts/auth-context";
import { useNProgress } from "../hooks/use-nprogress";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { createTheme } from "@/theme";
import ContextProvider from "@/contexts/ContextProvider";
import axiosClient from "@/configs/axios-client";
import { I18nextProvider } from "react-i18next";
import i18n from "@/configs/i18next";
const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props: { Component: any; emotionCache?: any; pageProps: any }) => {
  axiosClient.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page: any) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <I18nextProvider i18n={i18n}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthConsumer>
                {(auth: any) =>
                  auth.isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
            </ThemeProvider>
          </ContextProvider>
        </LocalizationProvider>
      </I18nextProvider>
    </CacheProvider>
  );
};

export default App;
