import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { connect, useDispatch, useSelector } from "react-redux";
import _get from "lodash/get";
import _omit from "lodash/omit";
import _cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { TextField as FTextField } from "formik-material-ui";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import constants from "dataService/Constants";
import { updateUserDetails } from "dataService/Api";
import menuLists from "dataService/MenuLists";
import ButtonWrapper from "components/common/ButtonWrapper";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import { toggleLoginModal, updateToastMsg } from "redux/slices/uiSlice";
import { loggedUserReducer, getLoggedUser } from "redux/slices/loggedUserSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputFile: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  xlarge: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  givenName: Yup.string(),
  familyName: Yup.string(),
  bio: Yup.string().max(100, "Must be below 100 characters"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

function EditProfile(props) {
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUser);

  const fileRef = useRef(null);
  const getPhoto = (event, formikProps) => {
    let files = Array.from(event.target.files);
    files.forEach((file, index) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        let profilePicture = {
          file,
          imagesUrl: reader.result,
        };
        if (index + 1 === files.length) {
          formikProps.setFieldValue("profilePicture", profilePicture);
          console.log(profilePicture, "profilePicture123");
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const generateFinalFormData = (value) => {
    let formData = new FormData();
    if (_get(value, "profilePicture.file"))
      formData.append("newDpImage", value.profilePicture.file);
    formData.append("data", JSON.stringify(_omit(value, "profilePicture")));
    return formData;
  };

  const sumbitProfile = async (value) => {
    const formData = await generateFinalFormData(value);
    updateUserDetails(formData).then((res) => {
      if (_get(res, "status")) {
        const userData = _get(res, "data", null);
        dispatch(loggedUserReducer(userData));
        dispatch(
          updateToastMsg({
            msg: "Profile Updated Successfully.",
            type: "success",
          })
        );
      } else {
        dispatch(updateToastMsg({ msg: res.message, type: "error" }));
      }
    });
  };

  const classes = useStyles();
  const { toggleEdit } = props;
  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          givenName: _get(loggedUser, "givenName", ""),
          familyName: _get(loggedUser, "familyName", ""),
          email: _get(loggedUser, "email", ""),
          phoneNumber: _get(loggedUser, "phoneNumber", ""),
          profilePicture: {
            imagesUrl: _get(loggedUser, "profilePicture", ""),
          },
          bio: _get(loggedUser, "bio", ""),
          bloodType: _get(loggedUser, "bloodType", ""),
        }}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          sumbitProfile(values);
        }}
      >
        {(formikProps) => (
          <form>
            {console.log(formikProps.value, "formikProps123")}
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Box display="flex" justifyContent="center" mb={2}>
                  <input
                    hidden
                    type="file"
                    ref={fileRef}
                    onChange={(e) => getPhoto(e, formikProps)}
                    accept="image/*"
                  />
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <Box onClick={() => fileRef.current.click()}>
                        <Avatar>
                          <Icon
                            className={"fa fa-camera"}
                            style={{ fontSize: 20 }}
                          />
                        </Avatar>
                      </Box>
                    }
                  >
                    <Avatar
                      src={_get(
                        formikProps,
                        "values.profilePicture.imagesUrl",
                        ""
                      )}
                      className={classes.xlarge}
                    />
                  </Badge>
                </Box>
              </Grid>
              <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="First Name"
                  name="givenName"
                  component={FTextField}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Last Name"
                  name="familyName"
                  component={FTextField}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Email"
                  disabled={true}
                  name="email"
                  component={FTextField}
                  fullWidth
                />
              </Grid>
              {/* <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Phone Number"
                  name="phoneNumber"
                  component={FTextField}
                  fullWidth
                />
              </Grid> */}
              <Grid item sm={12} md={12}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Bio"
                  name="bio"
                  component={FTextField}
                  fullWidth
                />
                <Typography variant="caption">
                  {_get(formikProps, "values.bio", "").length}/100
                </Typography>
              </Grid>
              {menuLists.BLOODBANK.show && (
                <Grid item sm={12} md={6}>
                  <Field
                    label="Blood Group"
                    name="bloodType"
                    select
                    fullWidth
                    component={FTextField}
                  >
                    {constants.bloodType.map((b) => (
                      <MenuItem key={b.code} value={b.code}>
                        <Typography variant="body1">{b.name}</Typography>
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              )}
            </Grid>
            <Box display="flex" justifyContent="flex-end">
              <ButtonWrapper
                onClick={() => {
                  toggleEdit(false);
                }}
                bgColor={grey[100]}
                color={colors.blue}
              >
                <Typography variant="button">Cancel</Typography>
              </ButtonWrapper>
              <Box ml={1}>
                <ButtonWrapper onClick={formikProps.handleSubmit}>
                  <Typography variant="button">Submit</Typography>
                </ButtonWrapper>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditProfile;
