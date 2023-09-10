import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import React from 'react';
import getTimeElapsedString from '@/utils/getTimeElapsedString'; 
import { useTranslation } from "react-i18next";
import { useProduct } from "@/hooks/use-product"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Filter } from "@/@types/filter"

export const OverviewLatestProducts = (props: any) => {
  const { products = [], sx } = props;
  const { t } = useTranslation();
    const router = useRouter();
    const productContext = useProduct();

    const fetchProducts = async () => {
      const queryParams: Filter[] = [
        {key: 'sort', value: '-promotedAds'}
      ];
      productContext?.fetchProducts(0, 5, queryParams);
    };
    
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const handleRoute = () => {
      router.push(`vehicles-management/verification-requests`);
    };
  
    interface IData {
      created_at: string;
    }

  return (
    <Card sx={sx}>
      <CardHeader title={t("Top Trending Products")} />
      <List>
        {productContext?.product.map((product: any, index: number) => {
          const hasDivider = index < products.length - 1;

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
            >
              <ListItemAvatar>
                {
                  product.ProductPhoto
                    ? (
                      <Box
                        component="img"
                        src={product.ProductPhoto}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'grey.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end', alignItems:'end' }}>
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

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
