import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import { useTranslation } from "react-i18next";
import { useProduct } from "@/hooks/use-product";
import { useSalon } from "@/hooks/use-salon";
import { useConsultation } from "@/hooks/use-consultation";
import { ConsultationDetails } from "@/sections/consultations/consultation-details";
import { VehicleVerification } from "@/sections/products/vehicle-verification";
import ImageGallery from "@/components/image-gallery";
import ImageGalleryCertificates from "@/sections/consultations/consultations-certificates";
import VehicleContextProvider from "@/contexts/vehicle-context";
import ProductReviews from "@/sections/products/product-reviews";

const Page = () => {
  const { t } = useTranslation();
  const productContext = useProduct();
  const salonContext = useSalon();
  const consultationContext = useConsultation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    if (typeof router.query.productId === "string") {
      await productContext?.fetchProduct(router.query.productId);
    }
  };

  const fetchSalon = async () => {
    if (typeof router.query.salonId === "string") {
      await salonContext?.fetchSalon(router.query.salonId);
    }
  };

  const fetchConsultation = async () => {
    if (typeof router.query.consultationId === "string") {
      await consultationContext?.fetchConsultation(router.query.consultationId);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchSalon();
    fetchConsultation();
  }, []);

  const productImages = productContext?.selectedProduct?.imageArray
  const serviceImages = consultationContext?.consultation?.service?.map((service: any) => ({
    certificatePhoto: service.servicePhoto,
    title: service.name
  }));  
  return (
    <>
      <Head>
        <title>Consultation | Sumer</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {consultationContext?.consultation && (
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
                  {consultationContext?.consultation?.owner?.name}
                  <Typography variant="body2">
                    {t(consultationContext?.consultation?.Specialization)}
                  </Typography>
                </Typography>
                <Avatar sx={{ width: 150, height: 150 }}>
                  {consultationContext?.consultation?.owner?.userPhoto && (
                    <img
                      src={consultationContext?.consultation?.owner?.userPhoto ?? ""}
                      loading="lazy"
                      width={200}
                    />
                  )}
                </Avatar>
              </Stack>
              {/* {productContext?.selectedProduct?.status == "INREVIEW" && <VehicleVerification vehicle={vehicle} />} */}
              <Box
                sx={{ display: "flex", gap: "2rem" }}
                flexDirection={{ md: "row", xs: "column" }}
              >
                <ConsultationDetails vehicle={consultationContext?.consultation} />
                <Box
                  sx={{
                    width: "100%",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <ImageGalleryCertificates
                    imagesArray={consultationContext?.consultation?.certificates}
                    cols={3}
                    galleryTitle="Cerificates images"
                  />
                  <ImageGalleryCertificates
                    imagesArray={serviceImages}
                    cols={3}
                    galleryTitle="Services images"
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {productContext?.productReviews && productContext?.productReviews.length > 0 && (
                <ProductReviews reviews={productContext?.productReviews} />
              )}
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
