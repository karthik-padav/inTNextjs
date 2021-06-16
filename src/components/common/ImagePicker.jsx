import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import { red, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  imageSizeWrapper: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    border: `1px solid ${grey[500]}`,
    borderRadius: "10px",
  },
  errorImage: {
    border: `1px solid ${red[500]} !important`,
  },
  height_100: {
    height: "100%",
  },
  fileInputWrapper: {
    border: `1px solid ${grey[500]}`,
    borderRadius: "10px",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    // maxWidth: "100%",
    // width: theme.spacing(70),
  },
  submitLoaderBtn: {
    position: "absolute",
  },
}));

function ImagePicker(props) {
  const { formikProps } = props;
  const { errors, touched } = formikProps;

  const heightRef = useRef(null);
  const fileRef = useRef(null);

  const pickFile = () => {
    fileRef.current.click();
  };
  const getPhoto = async (event) => {
    if (_get(event, "target.files")) {
      let files = Array.from(event.target.files);
      console.log(typeof event.target.files[0], "123321");
      let previewImage = _cloneDeep(_get(formikProps, "values.images", []));
      files.forEach((file, index) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          previewImage.push({
            file,
            imagesUrl: reader.result,
          });
          if (index + 1 === files.length) {
            formikProps.setFieldValue("images", previewImage);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    let clonedImages = _cloneDeep(_get(formikProps, "values.images", []));
    clonedImages.splice(index, 1);
    formikProps.setFieldValue("images", clonedImages);
  };

  const classes = useStyles();

  return (
    <>
      <GridList className={classes.gridList} cols={4.5}>
        <GridListTile
          style={{
            height: heightRef.current ? heightRef.current.offsetWidth : 0,
          }}
          ref={heightRef}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            className={classNames(
              classes.fileInputWrapper,
              classes.imageSizeWrapper,
              classes.height_100,
              _get(errors, "images") ? classes.errorImage : ""
            )}
            onClick={pickFile}
          >
            <input
              type="file"
              multiple
              name="myImage"
              accept="image/*"
              onChange={getPhoto}
              hidden
              ref={fileRef}
            />
            <Icon
              className={"fa fa-plus"}
              fontSize="small"
              style={{
                color: _get(errors, "images") ? red[500] : grey[500],
              }}
            />
          </Box>
        </GridListTile>
        {_get(formikProps, "values.images", []).map((item, index) => (
          <GridListTile
            key={index}
            style={{
              height: heightRef.current ? heightRef.current.offsetWidth : 0,
            }}
          >
            <Box position="relative" p={0.5} className={classes.height_100}>
              <Box position="absolute" top={-15} right={-15}>
                <ButtonWrapper
                  type="IconButton"
                  variant="contained"
                  size="medium"
                  onClick={() => removeImage(index)}
                >
                  <Icon className="fa fa-times" fontSize="small" />
                </ButtonWrapper>
              </Box>
              {_get(item, "imagesUrl") && (
                <img
                  src={item.imagesUrl}
                  className={classes.imageSizeWrapper}
                  alt="in Tulunadu"
                />
              )}
              {_get(item, "fileName") && (
                <img
                  src={item.fileName}
                  className={classes.imageSizeWrapper}
                  alt="in Tulunadu"
                />
              )}
            </Box>
          </GridListTile>
        ))}
      </GridList>
    </>
  );
}

export default ImagePicker;
