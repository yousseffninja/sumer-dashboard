import React from "react";
import { Box, Divider, List, ListItem, ListItemText, Rating, Typography } from "@mui/material";
import { colors } from "@mui/material";
import { useTranslation } from "react-i18next";

const ProductReviews = (props: any) => {

  const { t } = useTranslation();

  const { reviews } = props;

  return (
    <Box>
      <Typography variant="h6">{t('Reviews')}</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {reviews && reviews.map((review: any) => (
          <ListItem key={review._id} alignItems="flex-start" color="primary" style={{color: colors.grey[800]}}>
            <ListItemText
              color="primary" 
              style={{color: colors.grey[800]}}
              primary={
                <>
                  <Typography variant="subtitle1">{review.fullName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Typography variant="body1">{review.review}</Typography>
                  <Rating
                    name="rating"
                    value={review.rating}
                    precision={0.5}
                    readOnly
                  />
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default ProductReviews;
