import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { usePathname } from 'next/navigation';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useSocket } from '../../hooks/socket';
import Notification from '../../components/Notification';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});



export const DashboardLayout = withAuthGuard((props: { children: any; }) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { socket, isConnected, notification } = useSocket();

  useEffect(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    
    [pathname]
  );

  // useEffect(() => {
  //   console.log(notification);
  //   if (notification) {
  //     enqueueSnackbar(notification.message, { 
  //       variant: notification.variant as "default" | "error" | "success" | "warning" | "info" | undefined,
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'center'
  //       }
  //     });
  //   }
  // }, [notification, enqueueSnackbar]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          <SnackbarProvider maxSnack={3}>
            {notification && (
              <Notification
                message={notification.message}
                variant={notification.variant || "default" as "default" | "error" | "success" | "warning" | "info"}
              />
            )}
            {children} 
          </SnackbarProvider>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});
