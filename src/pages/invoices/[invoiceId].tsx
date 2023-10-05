import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, SvgIcon, Typography, Card, CardContent, List, ListItemText, ListItem, Link} from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import React from 'react';
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import { useTranslation } from "react-i18next";
import { useVehicle } from "@/hooks/use-vehicles";
import { useProduct } from "@/hooks/use-product";
import { VehicleDetails } from "@/sections/products/vehicle-details";
import { VehicleVerification } from "@/sections/products/vehicle-verification";
import ImageGallery from "@/components/image-gallery";
import VehicleContextProvider from "@/contexts/vehicle-context";
import ProductReviews from "@/sections/products/product-reviews";
import { styled } from '@mui/material/styles';

const Page = () => {
  const { t } = useTranslation();
  const vehicleContext = useVehicle();
  const productContext = useProduct();
  const [vehicle, setVehicle] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    if (typeof router.query.productId === "string") {
      await productContext?.fetchProduct(router.query.productId);
    }
  };

  const fetchInvoices = async () => {
    if (typeof router.query.invoiceId === "string") {
      await productContext?.fetchInvoice(router.query.invoiceId);
    }
  };

  const StyledCard = styled(Card)({
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  });
  
  const StyledCardContent = styled(CardContent)({
    padding: '16px',
  });
  
  const StyledTypography = styled(Typography)({
    fontSize: '1.2rem',
    fontWeight: 'bold',
  });
  
  const StyledList = styled(List)({
    padding: 0,
  });
  
  const StyledListItem = styled(ListItem)({
    padding: '8px 0',
  });

  useEffect(() => {
    fetchProducts();
    fetchInvoices();
  }, []);

  const handleUser = (id: string) => {
    router.push(`/products/${id}`);
  };

  const productImages = productContext?.selectedProduct?.imageArray
  return (
    <>
      <Head>
        <title>Invoice | Sumer</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {productContext?.selectedProduct && (
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
                  {t("Invoice Number")}: {productContext?.invoice?.invoiceId}
                  <Typography variant="body2">
                    {t(productContext?.selectedProduct?.desc)}
                  </Typography>
                </Typography>
              </Stack>
              <Typography variant="h6">
                  {t("status")}: {productContext?.invoice?.transactions[0]?.status[productContext?.invoice?.transactions[0]?.status.length - 1]?.status}
                  <Typography variant="body2">
                    {t(productContext?.selectedProduct?.desc)}
                  </Typography>
                </Typography>
              {productContext?.selectedProduct?.status == "INREVIEW" && <VehicleVerification vehicle={vehicle} />}
              <Box
                sx={{ display: "flex", gap: "2rem" }}
                flexDirection={{ md: "row", xs: "column" }}
              >
                {productContext?.invoice?.transactions.map((transaction: any) => (
                  <>
                    <Box sx={{ marginBottom: 2 }}>
                      <StyledTypography variant="h5">Transactions</StyledTypography>
                      {productContext?.invoice?.transactions.map((transaction: any) => (
                        <StyledCard key={transaction?._id} variant="outlined">
                          <StyledCardContent>
                            <StyledTypography variant="h6">Transaction ID: {transaction?._id}</StyledTypography>
                            <StyledList>
                              <StyledListItem>
                                <ListItemText primary={`Price: ${transaction?.price}`} />
                              </StyledListItem>
                              <StyledListItem>
                                <Link
                                  underline="hover"
                                  variant="subtitle2"
                                  onClick={() => handleUser(transaction?.product?._id)}
                                >
                                  <ListItemText primary={`Product: ${transaction?.product?.name}`} />
                                </Link>
                              </StyledListItem>
                              <StyledListItem>
                                <ListItemText primary={`Quantity: ${transaction?.quantity}`} />
                              </StyledListItem>
                              <StyledListItem>
                                <ListItemText primary={`Status: ${transaction?.status[0].status}`} />
                              </StyledListItem>
                            </StyledList>
                          </StyledCardContent>
                        </StyledCard>
                      ))}
                    </Box>
                  </>
                ))}
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
