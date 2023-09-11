import { useCallback } from "react";
import { format } from "date-fns";
import {
  Card,
  Box,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import PropTypes from "prop-types";
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import Man3Icon from "@mui/icons-material/Man3";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AbcIcon from "@mui/icons-material/Abc";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import AdjustIcon from "@mui/icons-material/Adjust";

import { useTranslation } from "react-i18next";

export const VehicleDetails = (props: any) => {
  const { t } = useTranslation();
  const { vehicle } = props;

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  const vehicleInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <InventoryIcon />
        </SvgIcon>
      ),
      label: t("name"),
      value: vehicle?.name,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <AdjustIcon />
        </SvgIcon>
      ),
      label: t("Model"),
      value: vehicle?.brand,
    },
    {
      icon: (
        <SvgIcon fontSize="small" >
          <FormatColorFillIcon  />
        </SvgIcon>
      ),
      label: t("Color"),
      value: (
        <Box>
          {vehicle && vehicle.color && vehicle.color[0] ? (
            <input type="color" value={vehicle.color[0]} disabled readOnly />
          ) : (
            "N/A" 
          )}
        </Box>
      ),
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <DescriptionIcon />
        </SvgIcon>
      ),
      label: t("description"),
      value: vehicle?.desc,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <LocalOfferIcon />
        </SvgIcon>
      ),
      label: t("count"),
      value: vehicle?.availabilityCount,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EventAvailableIcon />
        </SvgIcon>
      ),
      label: t("Price"),
      value: vehicle?.price,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <Man3Icon />
        </SvgIcon>
      ),
      label: t("Category"),
      value: vehicle?.category?.name,
    },
  ];

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <Card>
        <CardHeader subheader={"#" + vehicle?._id} title={vehicle?.name} />
        <Divider />
        <CardContent>
          <Grid container spacing={12} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <IndexedList items={vehicleInfoList} />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </Box>
  );
};

VehicleDetails.prototype = {
  vehicle: PropTypes.object,
};
