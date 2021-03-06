import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import _get from "lodash/get";
import _omit from "lodash/omit";
import _cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { TextField as FTextField } from "formik-material-ui";
import classNames from "classnames";
import { Grid, Box, Avatar } from "@material-ui/core";
import { updateUserDetails } from "dataService/Services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
const validationSchema = Yup.object().shape({
  givenName: Yup.string(),
  familyName: Yup.string(),
});

function EditProfile(props) {
  const [formData, setFormData] = React.useState(null);

  const getPhoto = (event, formikProps) => {
    const file = event.target.files[0];
    const newFormData = new FormData();
    newFormData.set("newDP", file);
    formikProps.setFieldValue("profilePicture", newFormData);
    setFormData(newFormData);
    console.log(newFormData.get("displayPhoto"), "formData123");
  };

  const sumbitProfile = (data) => {
    console.log(data, "profilePicture123");
    if (formData.get("displayPhoto")) {
      const json = JSON.stringify(_omit(data, "profilePicture"));
      formData.set("document", json);
    } else {
      const json = JSON.stringify(data);
      formData.set("document", json);
    }
    setFormData(formData);
    updateUserDetails(formData).then((res) => {
      if (_get(res, "status")) {
        const userData = _get(res, "data", null);
        props.updateUser(userData);
        props.updateToastMsg({
          msg: "Profile Updated Successfully.",
          type: "success",
        });
        props.toggleEditProfileModal(false);
      } else {
        props.updateToastMsg({
          msg: res.message,
          type: "error",
        });
      }
    });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          givenName: _get(props, "userDetails.givenName", ""),
          familyName: _get(props, "userDetails.familyName", ""),
          email: _get(props, "userDetails.email", ""),
          phoneNumber: _get(props, "userDetails.phoneNumber", ""),
          profilePicture: _get(props, "userDetails.profilePicture", ""),
          bio: _get(props, "userDetails.bio", ""),
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
            {console.log(formikProps, "props123123")}
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Avatar
                  src={_get(formikProps, "values.profilePicture", "")}
                  className={classes.large}
                />
                <input
                  type="file"
                  name="myImage"
                  accept="image/*"
                  onChange={(e) => getPhoto(e, formikProps)}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  label="First Name"
                  name="givenName"
                  component={FTextField}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  label="Last Name"
                  name="familyName"
                  component={FTextField}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  label="Email"
                  disabled={true}
                  name="email"
                  component={FTextField}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Field
                  type="text"
                  label="Phone Number"
                  name="phoneNumber"
                  component={FTextField}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={12}>
                <Field
                  type="text"
                  label="Bio"
                  name="bio"
                  component={FTextField}
                  fullWidth
                />
                <Typography variant="caption">
                  {_get(formikProps, "values.bio", "").length}/100
                </Typography>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.mt2}
                onClick={formikProps.handleSubmit}
              >
                <Typography variant="body2">Sumbit</Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userDetails) => {
      dispatch({
        type: "UPDATE_USER",
        payload: userDetails,
      });
    },
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
