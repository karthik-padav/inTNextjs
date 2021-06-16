import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Box, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import _omit from "lodash/omit";
import { connect } from "react-redux";
import { postShop } from "src/dataService/Services";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import ImagePicker from "src/components/common/ImagePicker";
import DialogBox from "src/components/common/dialogBoxWrapper/DialogBox";
import MultiSelectDropDown from "src/components/common/MultiSelectDropDown";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "src/themes/themeColors";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import constants from "src/dataService/Constants";
import { TextField as FTextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  submitLoaderBtn: {
    position: "absolute",
  },
}));

const maxImage = 10;
const addressMaxLength = 250;
const descriptionMaxLength = 250;

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Select Tag"),
  shopName: Yup.string().required("Shop Name Required"),
  contactNumber: Yup.string().required("Contact Number Required"),
  contactName: Yup.string().required("Contact Name Required"),
  description: Yup.string()
    .test(
      "len",
      "Reached Max Characters Limit",
      (val) => val && val.length <= descriptionMaxLength
    )
    .required("Description Required"),
  address: Yup.string().test(
    "len",
    "Maximum limit exceeded",
    (val) => val && val.length <= addressMaxLength
  ),
  images: Yup.string().required(),
});

function AddShopComponent(props) {
  const classes = useStyles();
  const { togglePostModal, isEditRequest, setList, shopList, isModalOpen } =
    props;

  const [initialValues, setInitialValues] = React.useState();
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const placeholder = `${'Start your question with "What", "How", "Why", etc.'}`;
  console.log(_get(props, "isEditRequest"), "asdasdasdadasdasdasd");
  React.useEffect(() => {
    const initialValues = {
      images: _get(props, "isEditRequest.contentImage", []),
      category: _get(props, "isEditRequest.category", []),
      shopName: _get(props, "isEditRequest.shopName", ""),
      contactName: _get(props, "isEditRequest.contactName", ""),
      contactNumber: _get(props, "isEditRequest.contactNumber", ""),
      website: _get(props, "isEditRequest.website", ""),
      description: _get(props, "isEditRequest.description", ""),
      address: _get(props, "isEditRequest.address", ""),
    };
    setInitialValues(initialValues);
  }, [isEditRequest]);

  const handleSubmit = async (values) => {
    let data = values;
    if (_get(isEditRequest, "_id")) data._id = isEditRequest._id;
    const formData = await generateFinalFormData(data);
    setSubmitLoader(true);
    postShop(formData, _get(isEditRequest, "_id") ? "update" : "post").then(
      (res) => {
        if (_get(res, "status")) {
          props.updateToastMsg({
            msg: "Success",
            type: "success",
          });
          togglePostModal(false);
          if (isEditRequest) {
            const feedIndex = _findIndex(shopList, (item) => {
              return item._id === res.data._id;
            });
            if (feedIndex > -1) {
              const newList = _cloneDeep(shopList);
              newList[feedIndex] = res.data;
              setList({ data: newList });
            }
          } else setList({ data: [res.data, ...shopList] });
        } else {
          props.updateToastMsg({
            msg: res.message,
            type: "error",
          });
        }
        setSubmitLoader(false);
      }
    );
  };

  const generateFinalFormData = (values) => {
    let formData = new FormData();
    const images = _get(values, "images", []);
    images.forEach((item, index) => {
      if (_get(item, "file")) formData.append("newImages", item.file);
      else if (_get(item, "fileName"))
        formData.append("existingImages", item.fileName);
      if (index + 1 === images.length) {
        const document = _omit(values, "images");
        formData.set("document", JSON.stringify(document));
      }
    });
    return formData;
  };

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
          onClose={togglePostModal}
          fullWidth
          headerTitle={"Create Online Shop"}
          body={
            <Box>
              {console.log(formikProps, "formikProps123")}
              <ImagePicker formikProps={formikProps} />

              <Box mt={1}>
                <Grid container spacing={1}>
                  <Grid item sm={12} md={6}>
                    <Field
                      type="text"
                      label="Shop Name"
                      name="shopName"
                      component={FTextField}
                      fullWidth
                      value={_get(formikProps, "values.shopName", "")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Field
                      type="text"
                      label="Contact Person"
                      name="contactName"
                      component={FTextField}
                      fullWidth
                      value={_get(formikProps, "values.contactName", "")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Field
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Contact Number"
                      name="contactNumber"
                      component={FTextField}
                      fullWidth
                      value={_get(formikProps, "values.contactNumber", "")}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Field
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Website URL"
                      name="website"
                      component={FTextField}
                      fullWidth
                      value={_get(formikProps, "values.website", "")}
                    />
                  </Grid>
                  <Grid item sm={12} md={12}>
                    <Field
                      name="category"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {(formikCProps) => (
                        <MultiSelectDropDown
                          label="Tags"
                          meta={formikCProps.meta}
                          form={formikCProps.form}
                          field={formikCProps.field}
                          shopCategory={constants.shopCategory}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item sm={12} md={12}>
                    <Box>
                      <Field
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Description"
                        name="description"
                        component={FTextField}
                        multiline
                        fullWidth
                        rows={3}
                        rowsMax={10}
                        value={_get(formikProps, "values.description", "")}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Typography variant="caption">
                          {_get(formikProps, "values.description", "").length}/
                          {descriptionMaxLength}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={12}>
                    <Box>
                      <Field
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Address"
                        name="address"
                        component={FTextField}
                        multiline
                        fullWidth
                        rows={3}
                        rowsMax={10}
                        value={_get(formikProps, "values.address", "")}
                      />
                      <Box display="flex" justifyContent="flex-end">
                        <Typography variant="caption">
                          {_get(formikProps, "values.address", "").length}/
                          {addressMaxLength}
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
                onClick={() => togglePostModal(false)}
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
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isEditRequest: _get(state, "ui.shopModal.data"),
    shopList: _get(state, "shopList.data", []),
    isModalOpen: _get(state, "ui.shopModal.show"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
    togglePostModal: (show, data = null) => {
      dispatch({
        type: "SHOW_SHOP_MODAL",
        payload: { show, data },
      });
    },
    setList: (payload) => {
      dispatch({
        type: "ADD_SHOP",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShopComponent);
