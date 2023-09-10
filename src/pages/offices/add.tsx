import Head from "next/head";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as AGrid,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOffice } from '@/hooks/use-offices';
import OfficeContextProvider from '@/contexts/offices-context';
import SnackBar from "@/components/SnackBar";

const Page = () => {
  const {t}= useTranslation();
  const OfficeContext = useOffice();
  const isSent =  OfficeContext?.isSent;
  const [formState, setFormState] = useState({
    username: "",
    name: "",
    office_name: "",
    phone: "",
    email: "",
    password: ""
  });


  // SnakBar
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [duration, setDuration] = useState(3000);

  const handleClose = () => {
    setOpen(false);
  };
 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //call the addOffice from the context
    const res = await  OfficeContext?.addOffice(
      formState.username,
      formState.name,
      formState.office_name,
      formState.phone,
      formState.email,
      formState.password
    );

    setMessage(res ? () => t("Success") : () => t("failed"));
    setColor(res ? "success" : "error");
    setDuration(2000);
    setOpen(!open);
    if(res){
      //make it empty
      setFormState({
        username: "",
        name: "",
        office_name: "",
        phone: "",
        email: "",
        password: ""
       });
    }

  };

  return (
    <>
      <Head>
        <title>{t("Add New office")} | Pronto</title>
      </Head>

      <Container maxWidth="xl" >
        <Stack spacing={3} sx={{"my":"15px"}}>
          <Typography variant="h4">{t("Add New Office")}</Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid  container spacing={5}>
            <Grid item xs={12} sm={8}>
              <Button type="submit" variant="contained" color="primary" sx={{display:"flex",justifyContent:"flex-end"}}>
                 {t("Add")} 
              </Button>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="username"
                name="username"
                label={t('username')}
                variant="outlined"
                value={formState.username}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="name"
                name="name"
                label={t('Administrator Name')}
                variant="outlined"
                value={formState.name}
                onChange={handleInputChange}
                fullWidth
                required
                />
              </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="office_name"
                name="office_name"
                label={t('Office Name')}
                variant="outlined"
                value={formState.office_name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="phone"
                name="phone"
                label={t('Phone')}
                variant="outlined"
                value={formState.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
           
            <Grid item xs={12} sm={8}>
              <TextField
                id="email"
                name="email"
                type="email"
                label={t('Email')}
                variant="outlined"
                value={formState.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
           
            <Grid item xs={12} sm={8}>
              <TextField
                id="password"
                name="password"
                type="password"
                label={t('password')}
                variant="outlined"
                value={formState.password}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
           
          </Grid>
           {/* //SnakBar components */}
        <div>
        <SnackBar message={message} open={open} handleClose={handleClose} color={color} duration={duration} />    
         </div>
        </form>
      </Container>
    </>
  );
};
Page.getLayout = (page: any) => (
  <OfficeContextProvider>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </OfficeContextProvider>
);

export default Page;