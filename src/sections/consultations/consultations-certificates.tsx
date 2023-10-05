import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  Box,
  Card,
  CardContent,
  Divider,
  CardHeader,
  Modal,
  Dialog,
  Typography,
  DialogContent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

//Modal styles
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  maxWidth: "90vw",
  height: "auto",
};

export default function ImageGalleryCertificates(props: any) {
  const [open, setOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState();
  const [title, setTitle] = React.useState("");
  const handleOpen = (event: any, title: string) => {
    setPreviewImage(event);
    setTitle(title)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const { cols, galleryTitle, imagesArray } = props;
  const { t } = useTranslation();
  return (
    <>
      {/* Main Image Gallery */}
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Card>
          <CardHeader title={t(galleryTitle)} />
          <Divider />
          <CardContent>
            <ImageList cols={cols}>
              {imagesArray &&
                imagesArray.map((item: any, i: number) => (
                  <ImageListItem sx={{ cursor: "pointer" }} key={i}>
                    <img
                      onClick={() => handleOpen(item.certificatePhoto, item.title)}
                      src={item.certificatePhoto}
                      srcSet={item.certificatePhoto}
                      alt={"Sumer Image"}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </CardContent>
          <Divider />
        </Card>
      </Box>
      {/* Image preview Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5">{t("Certificate Details")}</Typography>
          <img style={{ width: "100%" }} src={previewImage} alt="Pronto Image" loading="lazy" />
          <Typography variant="subtitle1">{t("Title")}: {title}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
