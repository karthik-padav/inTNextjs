import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import Link from "next/link";
import ImagePreview from "src/components/common/ImagePreview";
import Divider from "src/components/common/Divider";
import Chip from "@material-ui/core/Chip";
import colors from "src/themes/themeColors";
import constants from "src/dataService/Constants";
import { codeToName } from "src/utils/Common";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  wordBreak: {
    wordBreak: "break-all",
  },
}));

function CardWrapper(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {_get(data, "contentImage") && !_isEmpty(data.contentImage) && (
        <Box my={1}>
          <ImagePreview
            contentImage={data.contentImage}
            imagePath={`/uploads/shopPost/${_get(data, "_id")}`}
          />
        </Box>
      )}
      {_get(data, "description") && (
        <Link href="/onlineShop/[id]" as={`/onlineShop/${_get(data, "_id")}`}>
          <a>
            <Grid container spacing={1}>
              {_get(data, "shopName") && (
                <Grid item sm={12} md={12}>
                  <Typography className={classes.wordBreak} variant="caption">
                    Shop Name
                  </Typography>
                  <Typography className={classes.wordBreak} variant="body1">
                    <b>{data.shopName}</b>
                  </Typography>
                </Grid>
              )}
              {_get(data, "description") && (
                <Grid item sm={12} md={12}>
                  <Typography className={classes.wordBreak} variant="caption">
                    About
                  </Typography>
                  <Typography className={classes.wordBreak} variant="body1">
                    <b>{data.description}</b>
                  </Typography>
                  <Divider mt={1.5} mb={1} />
                </Grid>
              )}
            </Grid>
          </a>
        </Link>
      )}
      <Grid container spacing={1}>
        {_get(data, "contactName") && (
          <Grid item sm={12} md={4}>
            <Typography className={classes.wordBreak} variant="caption">
              Contact Person
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{data.contactName}</b>
            </Typography>
          </Grid>
        )}
        {_get(data, "contactNumber") && (
          <Grid item sm={12} md={4}>
            <Typography className={classes.wordBreak} variant="caption">
              Contact Number
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{data.contactNumber}</b>
            </Typography>
          </Grid>
        )}
        {_get(data, "website") && (
          <Grid item sm={12} md={4}>
            <Typography className={classes.wordBreak} variant="caption">
              Website
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>
                <a href={data.website} target="_blank">
                  {data.website}
                </a>
              </b>
            </Typography>
          </Grid>
        )}
        {_get(data, "address") && (
          <Grid item sm={12} md={12}>
            <Typography className={classes.wordBreak} variant="caption">
              Address
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{data.address}</b>
            </Typography>
          </Grid>
        )}
        {_get(data, "category") && !_isEmpty(data.category) && (
          <Grid item sm={12} md={12}>
            <Typography className={classes.wordBreak} variant="caption">
              Tags
            </Typography>
            <Box display="flex" flexDirection="row">
              {data.category.map((item, index) => (
                <Box key={index} mr={0.5} my={0.5}>
                  <Chip
                    label={codeToName(constants.shopCategory, item)}
                    color="primary"
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CardWrapper);
