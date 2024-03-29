import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Box, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _omit from "lodash/omit";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { connect, useDispatch, useSelector } from "react-redux";
import { postFeed } from "dataService/Api";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonWrapper from "components/common/ButtonWrapper";
import Dialog from "@material-ui/core/Dialog";
import DialogBox from "components/common/dialogBoxWrapper/DialogBox";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import ImagePicker from "components/common/ImagePicker";
import { Formik, Field } from "formik";
import constants from "dataService/Constants";
import * as Yup from "yup";
import { TextField as FTextField } from "formik-material-ui";
import {
  showAskModal,
  updateToastMsg,
  toggleAskModal,
} from "redux/slices/uiSlice";

const useStyles = makeStyles((theme) => ({
  imageSizeWrapper: {
    width: "100%",
    height: theme.spacing(20),
    objectFit: "cover",
    border: "1px solid",
    borderRadius: "10px",
  },
  fileInputWrapper: {
    border: "1px solid",
    borderRadius: "10px",
  },
  fileInput: {
    position: "absolute",
    left: "0",
    top: "0",
    right: "0",
    bottom: 0,
    width: "100%",
    opacity: "0",
    zIndex: "1",
    cursor: "pointer",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    maxWidth: "100%",
    width: theme.spacing(70),
  },
  submitLoaderBtn: {
    position: "absolute",
  },
}));

const maxImage = 10;
const postCharLength = 250;

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required("Content Required")
    .max(postCharLength, `Must be less then ${postCharLength}`),
});

function AddPostComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showAddModal, actions } = props;
  const { onSuccess = () => {}, onCancel = () => {} } = actions;
  const { flag: isModalOpen, data: isEditRequest = null } = showAddModal;
  const [initialValues, setInitialValues] = React.useState();
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const placeholder = `${'Start your question with "What", "How", "Why", etc.'}`;

  React.useEffect(() => {
    const initialValues = {
      images: _get(isEditRequest, "contentImage", []),
      content: _get(isEditRequest, "content", ""),
    };
    setInitialValues(initialValues);
  }, [isEditRequest]);

  const handleSubmit = async (values) => {
    setSubmitLoader(true);
    if (_get(isEditRequest, "_id")) values._id = isEditRequest._id;
    const formData = await generateFinalFormData(values);
    const { data, error } = await postFeed(
      formData,
      isEditRequest?._id ? "update" : "post"
    );
    if (error) dispatch(updateToastMsg({ msg: res.message, type: "error" }));
    else if (data?.status) {
      dispatch(updateToastMsg({ msg: "Success", type: "success" }));
      onSuccess({ data: data.data });
    } else
      dispatch(updateToastMsg({ msg: "Something went wrong", type: "error" }));
    setSubmitLoader(false);
  };

  const generateFinalFormData = (values) => {
    let formData = new FormData();
    const images = _get(values, "images", []);
    if (images.length) {
      images.forEach((item, index) => {
        if (_get(item, "file")) formData.append("newImages", item.file);
        else if (_get(item, "fileName"))
          formData.append("existingImages", item.fileName);
        if (index + 1 === images.length) {
          const document = _omit(values, "images");
          formData.set("document", JSON.stringify(document));
        }
      });
    } else {
      const document = _omit(values, "images");
      formData.set("document", JSON.stringify(document));
    }
    return formData;
  };

  if (isModalOpen)
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          handleSubmit(values);
        }}
      >
        {(formikProps) => (
          <DialogBox
            isModalOpen={isModalOpen}
            onClose={onCancel}
            fullWidth
            headerTitle={"Create Post"}
            body={
              <Box>
                {console.log(formikProps, "formikProps123")}
                <ImagePicker formikProps={formikProps} />
                <Box mt={1}>
                  <Grid container spacing={1}>
                    <Grid item sm={12} md={12}>
                      <Box>
                        <Field
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="content"
                          // label={placeholder}
                          placeholder={placeholder}
                          component={FTextField}
                          multiline
                          fullWidth
                          rows={4}
                          rowsMax={10}
                          value={_get(formikProps, "values.content", "")}
                        />
                        <Box display="flex" justifyContent="flex-end">
                          <Typography variant="caption">
                            {_get(formikProps, "values.content", "").length}/
                            {postCharLength}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            }
            footer={
              <Box px={1} py={1} display="flex" justifyContent="flex-end">
                <ButtonWrapper
                  onClick={onCancel}
                  disabled={submitLoader}
                  bgColor={grey[100]}
                  color={colors.blue}
                >
                  <Typography variant="button">Close</Typography>
                </ButtonWrapper>
                <Box ml={1}>
                  <ButtonWrapper
                    variant="contained"
                    onClick={formikProps.handleSubmit}
                    disabled={submitLoader}
                  >
                    <Typography variant="button">Sumbit</Typography>
                    {submitLoader && (
                      <CircularProgress
                        size={24}
                        className={classes.submitLoaderBtn}
                      />
                    )}
                  </ButtonWrapper>
                </Box>
              </Box>
            }
          />
        )}
      </Formik>
    );
  return null;
}

export default AddPostComponent;
