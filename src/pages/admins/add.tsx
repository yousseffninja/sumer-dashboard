import Head from "next/head";
import {
  Button,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as AGrid,
  Grid,
  TextField,
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AdminContextProvider from '@/contexts/offices-context';
import SnackBar from "@/components/SnackBar";
import { useAdmin } from "@/hooks/use-admins";


const Page = () => {
  const {t}= useTranslation();
  const adminContext = useAdmin();
  const [formState, setFormState] = useState({
  
    name: "",
    email: "",
    password: "",
    phone: "",
    username: "",
    permissions:"",
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

  const handleSubmit =  async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    //call the addOffice from the context
    const res = await adminContext?.addAdmin(
      formState.username,
      formState.name,
      formState.phone,
      formState.email,
      formState.password,
      formState.permissions,
    );

    setMessage(res ? () => t("Success") : () => t("failed"));
    setColor(res ? "success" : "error");
    setDuration(2000);
    setOpen(!open);
   if(res){
     //make it empty
     setFormState({
      name: "",
      email: "",
      password: "",
      phone: "",
      username: "",
      permissions:"",
      });
   }


  };


  /**Select option */
  const permissions = [
    'ReadWrite',
    'ReadOnly',
  ];

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setFormState({
      ...formState,
      permissions:  event.target.value as string ,
    });
  };
  return (
    <>
      <Head>
        <title>{t("Add New Admin")} | Pronto</title>
      </Head>

      <Container maxWidth="xl" >
        <Stack spacing={3} sx={{"my":"15px"}}>
          <Typography variant="h4">{t("Add New Admin")}</Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid  container spacing={5}>
            <Grid item xs={12} sm={8} sx={{display:"flex",justifyContent:"flex-end"}}>
              <Button type="submit" variant="contained" color="primary">
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
                label={t('Name')}
                variant="outlined"
                value={formState.name}
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
                required
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
            <Grid item xs={12} sm={8}>
            <InputLabel id="demo-multiple-name-label">{t("Permissions")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formState.permissions}
                  label="permissions"
                  name="permissions"
                  onChange={handleChange}
                  sx={{width:"100%"}}
                  
                >
                  {
                    permissions.length > 0 && permissions.map((p,index) =>
                              { 
                                
                                return(
                                        <MenuItem value={p} key={index}>{t(p)}</MenuItem>
                                  )
                                
                                }
                    )
                  }
            </Select>
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
  <AdminContextProvider>
  <DashboardLayout>
    {page}
  </DashboardLayout>
  </AdminContextProvider>
);

export default Page;