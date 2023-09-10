import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography

} from '@mui/material';
import React from 'react';
import { Scrollbar } from '../../components/scrollbar';
import { SeverityPill } from '../../components/severity-pill';
import { useOrder } from '@/hooks/use-orders';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export const OverviewLatestOrders = (props: any) => {
  const {  sx } = props;

  const router = useRouter();
  const {t}= useTranslation();
  const orderContext = useOrder();


  const fetchLastOrder = async () => {
    orderContext?.fetchOrders(0, 8)
  };
  
  useEffect(() => {
    fetchLastOrder()
  
  }, []);

  const handleRoute = () => {
    router.push(`/orders`);
  };


  return (
    <Card sx={sx}>
      <CardHeader title={t("Latest Orders")} />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>{t('#')}</TableCell>
                <TableCell>{t('Clients')}</TableCell>
                <TableCell>{t('Created at')}</TableCell>
                <TableCell>{t('Status')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderContext?.orders.map((order: any) => {
                const created_at = format(Date.parse(order.created_at), "dd/MM/yyyy");

                return (
                  <TableRow
                    hover
                    key={order?.id}
                  >
                     <TableCell>{order.number}</TableCell>
                    <TableCell>
                      {
                        order.addresses.map((item:any, index:number) => {
                          return <Typography key={index} >{t(item.type)}: {item.name}</Typography>
                        })
                      }
                    </TableCell>
                    <TableCell>
                      {created_at}
                    </TableCell>
                    <TableCell>
                    <span style={{color:`${order.status=="CANCELED"?'#fd4747':(order.status=="DELIVERED"?"rgb(75 216 40)":"none")}`}} >{t(order.status)}</span> 
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          onClick={()=>handleRoute()}
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          >
          {t("View all")}
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
