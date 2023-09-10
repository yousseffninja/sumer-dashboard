import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../../layouts/dashboard/layout";

import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import { useTranslation } from "react-i18next";
import { useVehicle } from "@/hooks/use-vehicles";
import { VehicleDetails } from "@/sections/vehicles/vehicle-details";
import { VehicleVerification } from "@/sections/vehicles/vehicle-verification";
import ImageGallery from "@/components/image-gallery";
import VehicleContextProvider from "@/contexts/vehicle-context";

const Page = () => {
  const { t } = useTranslation();
  const vehicleContext = useVehicle();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchVehicle = async () => {
    if (typeof router.query.id === "string") {
      await vehicleContext?.getVehicle(router.query.id);
    }
  };

  useEffect(() => {
    fetchVehicle();

    
  }, []);

  useEffect(() => {
    setVehicle(vehicleContext?.selectedVehicle);
    setLoading(false);
  }, [vehicleContext?.selectedVehicle]);

  const vehicleImages = vehicle?.__images__;
  const licenseImages = vehicle?.__license_images__;
  const galleryPath = "https://pronto.zbony.com/v1/";
  return (
    <>
      <Head>
        <title>Vehicle | Pronto</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {!loading && vehicle && (
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
                  {vehicle.brand_model_id}
                  <Typography variant="body2">
                    <SvgIcon fontSize="small" color="primary">
                      <SecurityIcon />
                    </SvgIcon>
                    {t(vehicle.status)}
                  </Typography>
                </Typography>
                <Avatar sx={{ width: 150, height: 150 }}>
                  {vehicle.__images__ && vehicle?.__images__[0] && (
                    <img
                      src={"https://pronto.zbony.com/v1/" + vehicle?.__images__[0]?.image}
                      alt={vehicle.brand_id}
                      loading="lazy"
                      width={200}
                    />
                  )}
                </Avatar>
              </Stack>
              {vehicle.status == "INREVIEW" && <VehicleVerification vehicle={vehicle} />}
              <Box
                sx={{ display: "flex", gap: "2rem" }}
                flexDirection={{ md: "row", xs: "column" }}
              >
                <VehicleDetails vehicle={vehicle} />
                <Box
                  sx={{
                    width: "100%",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <ImageGallery
                    path={galleryPath}
                    imagesArray={vehicleImages}
                    cols={3}
                    galleryTitle="Vehicle images"
                  />
                  <ImageGallery
                    path={galleryPath}
                    imagesArray={licenseImages}
                    cols={3}
                    galleryTitle="License Images"
                  />
                </Box>
              </Box>
            </Stack>
          </Container>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <VehicleContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </VehicleContextProvider>
);


export default Page;
