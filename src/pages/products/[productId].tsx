import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, SvgIcon, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { format } from "date-fns";
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

const Page = () => {
  const { t } = useTranslation();
  const vehicleContext = useVehicle();
  const productContext = useProduct();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 5,
    filter: [
      {
        key: "",
        value: "",
      },
    ],
  });

  const fetchProducts = async () => {
    if (typeof router.query.productId === "string") {
      await productContext?.fetchProduct(router.query.productId);
    }
  };

  const fetchTransactions = async () => {
    if (typeof router.query.productId === "string") {
      const id = router.query.productId;
      await productContext?.fetchTransactions(controller.page, controller.rowsPerPage, [
        {
          key: "product",
          value: id,
        },
      ],);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  const handlePageChange = (event: any, newPage: number) => {
    setController({
      ...controller,
      page: newPage,
    });
  };
  // Page limit control
  const handleRowsPerPageChange = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const productImages = productContext?.selectedProduct?.imageArray
  return (
    <>
      <Head>
        <title>Product | Sumer</title>
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
                  {productContext?.selectedProduct.name}
                  <Typography variant="body2">
                    {t(productContext?.selectedProduct?.desc)}
                  </Typography>
                  <Typography variant="h6">{t("this product has number of sales:")} {productContext?.count}</Typography>
                </Typography>
                
                <Avatar sx={{ width: 150, height: 150 }}>
                  {productContext?.selectedProduct?.imageArray && (
                    <img
                      src={productContext?.selectedProduct?.imageArray[0]?.ProductPhotoPerview ?? ""}
                      alt={vehicle?._id}
                      loading="lazy"
                      width={200}
                    />
                  )}
                </Avatar>
              </Stack>
              {productContext?.selectedProduct?.status == "INREVIEW" && <VehicleVerification vehicle={vehicle} />}
              <Box
                sx={{ display: "flex", gap: "2rem" }}
                flexDirection={{ md: "row", xs: "column" }}
              >
                <VehicleDetails vehicle={productContext?.selectedProduct} />
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
                  <Box>
                    {productContext?.transactions && productContext?.transactions.length > 0 && (
                      <>
                        <Typography variant="h5">{t('Transactions')}</Typography>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>{t('User')}</TableCell>
                                <TableCell>{t('Quantity')}</TableCell>
                                <TableCell>{t('Price')}</TableCell>
                                <TableCell>{t('Status')}</TableCell>
                                <TableCell>{t('Date')}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {productContext?.transactions.map((transaction: any, i: number) => (
                                <TableRow key={i}>
                                  <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                      <Typography variant="body1">
                                        {transaction.user}
                                      </Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell>{transaction.quantity}</TableCell>
                                  <TableCell>{transaction.quantity * transaction.price}</TableCell>
                                  <TableCell>
                                    {t(
                                      transaction.status[transaction.status.length - 1].status
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {format(Date.parse(transaction.status[transaction.status.length - 1].date), "dd/MM/yyyy")}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          component="div"
                          count={productContext?.count}
                          onPageChange={handlePageChange}
                          onRowsPerPageChange={handleRowsPerPageChange}
                          page={controller.page}
                          rowsPerPage={controller.rowsPerPage}
                          rowsPerPageOptions={[5, 10, 25]}
                        />
                      </>
                    )}
                  </Box>
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
