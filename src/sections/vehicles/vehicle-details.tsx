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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Man3Icon from "@mui/icons-material/Man3";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
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
          <DirectionsCarIcon />
        </SvgIcon>
      ),
      label: t("Brand"),
      value: vehicle.brand_id,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <AdjustIcon />
        </SvgIcon>
      ),
      label: t("Model"),
      value: vehicle.brand_model_id,
    },
    {
      icon: (
        <SvgIcon fontSize="small" >
          <FormatColorFillIcon  />
        </SvgIcon>
      ),
      label: t("Color"),
      value: <input type="color" value={`#${vehicle.color}`} disabled readOnly/>
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <DepartureBoardIcon />
        </SvgIcon>
      ),
      label: t("Year"),
      value: vehicle?.year,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <AbcIcon />
        </SvgIcon>
      ),
      label: t("Plate"),
      value: vehicle?.plate,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EventAvailableIcon />
        </SvgIcon>
      ),
      label: t("License expiry date"),
      value: new Date(vehicle?.license_expire_at).toLocaleDateString('en-GB'),
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <Man3Icon />
        </SvgIcon>
      ),
      label: t("Driver's name"),
      value: vehicle.__user__?.name,
    },
  ];

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <Card>
        <CardHeader subheader={"#" + vehicle.brand_model_id} title={vehicle.brand_id} />
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
