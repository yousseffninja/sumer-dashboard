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
import { VehicleDetails } from "@/sections/products/vehicle-details";
import { VehicleVerification } from "@/sections/products/vehicle-verification";
import ImageGallery from "@/components/image-gallery";
import VehicleContextProvider from "@/contexts/vehicle-context";
import ProductReviews from "@/sections/products/product-reviews";

const Page = () => {
  const { t } = useTranslation();
  const productContext = useProduct();
  const salonContext = useSalon();
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

  useEffect(() => {
    fetchProducts();
    fetchSalon();
  }, []);

  const productImages = productContext?.selectedProduct?.imageArray
  return (
    <>
      <Head>
        <title>Salons | Sumer</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {salonContext?.salon && (
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
                  {salonContext?.salon?.name}
                  <Typography variant="body2">
                    {t(salonContext?.salon?.about)}
                  </Typography>
                </Typography>
                <Avatar sx={{ width: 150, height: 150 }}>
                  {salonContext?.salon?.salonPhoto && (
                    <img
                      src={salonContext?.salon?.salonPhoto ?? ""}
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
                <VehicleDetails vehicle={salonContext?.salon} />
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
                    imagesArray={productImages}
                    cols={3}
                    galleryTitle="Product images"
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
