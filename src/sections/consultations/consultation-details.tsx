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

export const ConsultationDetails = (props: any) => {
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
      value: vehicle?.owner?.name,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <AdjustIcon />
        </SvgIcon>
      ),
      label: t("Consultation Specialization"),
      value: vehicle?.Specialization,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <DescriptionIcon />
        </SvgIcon>
      ),
      label: t("description"),
      value: vehicle?.about,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <LocalOfferIcon />
        </SvgIcon>
      ),
      label: t("balance"),
      value: vehicle?.balance,
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
  ];

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <Card>
        <CardHeader subheader={"#" + vehicle?._id} title={vehicle?.name} />
        <Divider />
        <CardContent>
          <Grid container spacing={12} wrap="wrap">
            <Grid xs={12} sm={6} md={12}>
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

ConsultationDetails.prototype = {
  vehicle: PropTypes.object,
};
