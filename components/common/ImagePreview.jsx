import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { loadCSS } from "fg-loadcss";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import Slide from "components/common/Slide";

const dummyImage = [
  {
    url: "https://miro.medium.com/max/1050/1*MI686k5sDQrISBM6L8pf5A.jpeg",
  },
  {
    url:
      "https://image.freepik.com/free-photo/astonished-unshaven-man-gazes-through-hole-yellow-paper_273609-27035.jpg",
  },
  {
    url:
      "https://image.freepik.com/free-photo/image-unrecognizable-man-makes-thumb-up-gesture_273609-25537.jpg",
  },
  {
    url:
      "https://image.freepik.com/free-vector/golden-new-year-2021-background_23-2148782784.jpg",
  },
  {
    url:
      "https://image.freepik.com/free-photo/image-unrecognizable-man-makes-thumb-up-gesture_273609-25537.jpg",
  },
  {
    url:
      "https://image.freepik.com/free-photo/astonished-unshaven-man-gazes-through-hole-yellow-paper_273609-27035.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  imageSizeWrapper: {
    width: "100%",
    height: theme.spacing(20),
    objectFit: "cover",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: "#000",
  },
  moreImageWrapper: {
    backgroundColor: "#00000061",
    color: "#fff",
  },
}));

const ImagePreviewCount = 4;

function ImagePreview({ contentImage = [], imagePath = "" }) {
  const [isModalOpen, showModal] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box>
        <Grid container>
          {contentImage.map((img, imgIndex) => {
            if (imgIndex + 1 <= ImagePreviewCount) {
              return (
                <Grid key={imgIndex} item xs={6} md={3}>
                  <Box
                    lineHeight="1"
                    onClick={() => showModal(true)}
                    px={0.1}
                    position="relative"
                  >
                    <img
                      src={`${imagePath}/${img.fileName}`}
                      className={classes.imageSizeWrapper}
                    />
                    {/* <p style={{ fontSize: "10px" }}>
                      {`${imagePath}/${img.fileName}`}
                    </p> */}
                    {contentImage.length > ImagePreviewCount &&
                      imgIndex + 1 === ImagePreviewCount && (
                        <Box
                          position="absolute"
                          lineHeight="1"
                          top="0"
                          right="0"
                          left="0"
                          bottom="0"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          className={classes.moreImageWrapper}
                        >
                          <Typography variant="h5">
                            +{contentImage.length - ImagePreviewCount}
                          </Typography>
                        </Box>
                      )}
                  </Box>
                </Grid>
              );
            }
            return null;
          })}
          <AutoRotatingCarousel
            // label="Get started"
            autoplay={false}
            landscape={true}
            // mobile={true}
            open={isModalOpen}
            onClose={() => showModal(false)}
            onStart={() => showModal(false)}
            style={{ position: "absolute" }}
          >
            {contentImage.map((img, imgIndex) => (
              <Box width="100%" height="100%" key={imgIndex}>
                <img
                  className={classes.imageWrapper}
                  src={`${imagePath}/${img.fileName}`}
                />
              </Box>
            ))}
          </AutoRotatingCarousel>
        </Grid>
      </Box>
    </div>
  );
}

export default ImagePreview;
