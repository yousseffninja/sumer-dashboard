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
import { useNotifictions } from "@/hooks/use-notifications";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { useTranslation } from "react-i18next";
import NoticationContextProvider from "@/contexts/notifications-context";
import SnackBar from "@/components/SnackBar";
const Page = () => {
  const {t}= useTranslation();
  const NotificationContext = useNotifictions();
  const isSent =  NotificationContext?.isSent;
  const [formState, setFormState] = useState({
    group: "",
    title_ar: "",
    title_en: "",
    text_ar: "",
    text_en: "",
  });


  // SnakBar
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [duration, setDuration] = useState(3000);

  const handleClose = () => {
    setOpen(false);
  };


  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      group: event.target.value,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  
  // submit
  const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //call the addNotification from the context
   const res = await NotificationContext?.addNotification(
      formState.group,
      formState.title_ar,
      formState.text_ar,
      formState.title_en,
      formState.text_en
    );
   setMessage(res ? () => t("Success") : () => t("failed"));
   setColor(res ? "success" : "error");
   setDuration(2000);
   setOpen(!open);
   if(isSent){
     //make it empty
     setFormState({
       group: "",
       title_ar: "",
       title_en: "",
       text_ar: "",
       text_en: "",
      });
   }
  };

  

  return (
    <>
      <Head>
        <title>{t("Send Notifications")} | Pronto</title>
      </Head>

      <Container maxWidth="xl" >
        <Stack spacing={3} sx={{"my":"15px"}}>
          <Typography variant="h4">{t("Send Notifications")}</Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid  container spacing={5}>
            <Grid item xs={6} sm={6}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="options"
                  name="options"
                  value={formState.group}
                  onChange={handleOptionChange}
                >
                  <FormControlLabel value="CLIENT" control={<Radio required  />} label={t("Clients")} />
                  <FormControlLabel value="DRIVER" control={<Radio required  />} label={t("Drivers")} />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2} sx={{display:"flex",justifyContent:"flex-end"}}>
              <Button type="submit" variant="contained" color="primary">
                 {t("Send")} 
              </Button>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="title_ar"
                name="title_ar"
                label={t("Title in Arabic")}
                variant="outlined"
                value={formState.title_ar}
                fullWidth 
                onChange={handleInputChange}
                required
               
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                id="text_ar"
                name="text_ar"
                label={<span> {t("Body in Arabic")} <sup color="error">*</sup></span>}
                variant="outlined"
                value={formState.text_ar}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="title_en"
                name="title_en"
                label={t("Title in English")}
                variant="outlined"
                value={formState.title_en}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="text_en"
                name="text_en"
                label={t("Body in English")}
                variant="outlined"
                value={formState.text_en}
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

Page.getLayout = (page: any) => <NoticationContextProvider> <DashboardLayout>{page}</DashboardLayout> </NoticationContextProvider>;

export default Page;
