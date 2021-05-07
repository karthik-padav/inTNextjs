import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  reviewSubTitle: {
    fontSize: 10,
    lineHeight: 1,
    textAlign: "right",
  },
}));

export default function RatingWrapper() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  return (
    <Box>
      <Rating
        name="customized-empty"
        // defaultValue={2}
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue, "newValue123");
          setValue(newValue);
        }}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      <Typography
        variant="caption"
        className={classes.reviewSubTitle}
        component="p"
      >
        200 Reviews
      </Typography>
    </Box>
  );
}
