import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  Stack,
  Box,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useVehicle } from "@/hooks/use-vehicles";
import { useRouter } from "next/navigation";
import ConfirmationPopup from "@/components/confirmation-popup";

export const VehicleVerification = (props: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [decision, setDecision] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const { vehicle } = props;
  const vehicleContext = useVehicle();

  const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/users-management/verification-requests`);
  };

  // When you click Confirm >>> Open confirmation popup
  const handleClickOpen = (event: any) => {
    event.preventDefault();
    setOpenConfirmation(true);
  };
  // Confirmation function
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    if (!decision) return;
    if (decision == "Accept") {
      vehicleContext?.verifyVehicle(vehicle.id);
      router.push(`/vehicles-management/verification-requests`);
    }
    if (decision == "Reject") {
      vehicleContext?.rejectVehicle(vehicle.id, reason);
      router.push(`/vehicles-management/verification-requests`);
    }
  };

  // Storing the value of Rejection reason
  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  // Handling the choice (Accept: display accept button || Reject: display reject reason)
  const handleDecisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecision(event.target.value);
  };
  // Confimation message
  const message = `${t("You will now")} ${t(`${decision}`)} ${t("the vehicle")}`;
  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <ConfirmationPopup
        message={message}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        confirmFuntion={handleSubmit}
      />
      <Card>
        <CardHeader title={t("Verification")} />
        <Divider />
        <CardContent>
          <Stack component="form" spacing={1} onSubmit={handleClickOpen}>
            <FormControl sx={{ width: "100%", minWidth: 120 }}>
              <InputLabel>{t("Decision")}</InputLabel>
              <Select
                value={decision}
                label={t("Decision")}
                onChange={(event: any) => {
                  handleDecisionChange(event);
                }}
              >
                <MenuItem value="Accept">{t("Accept")}</MenuItem>
                <MenuItem value="Reject">{t("Reject")}</MenuItem>
              </Select>
            </FormControl>
            {decision == "Reject" && (
              <TextField
                label={t("Reason")}
                multiline
                rows={4}
                required
                value={reason}
                onChange={(event: any) => {
                  handleReasonChange(event);
                }}
              />
            )}
            {decision && (
              <Button type="submit" variant="contained">
                {t("Confirm")}
              </Button>
            )}
          </Stack>
        </CardContent>
        <Divider />
      </Card>
    </Box>
  );
};

VehicleVerification.prototype = {
  vehicle: PropTypes.object,
};
