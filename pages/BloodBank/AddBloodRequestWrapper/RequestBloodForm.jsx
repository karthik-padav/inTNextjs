import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isArray from "lodash/isArray";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { TextField as FTextField } from "formik-material-ui";
import classNames from "classnames";
import { Grid, Box, MenuItem } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import locationList from "dataService/Json/LocationList.json";
import constants from "dataService/Constants";
import { postBloodRequest } from "dataService/Services";
import ButtonWrapper from "components/common/ButtonWrapper";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "Themes/ThemeColors";

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
  submitLoaderBtn: {
    position: "absolute",
  },
  positionRelative: {
    position: "relative",
  },
}));

const validationSchema = Yup.object().shape({
  bloodType: Yup.string().required("Blood Group Required"),
  contactName: Yup.string().required("Contact Name Required"),
  contactNumber: Yup.string().required("Contact Number Required"),
  state: Yup.string().required("State Required"),
  district: Yup.string().required("District Required"),
  taluk: Yup.string().required("Taluk Required"),
});

function RequestBloodForm(props) {
  const {
    isEditRequest,
    toggleBloodModal,
    setBloodReqList,
    bRequestList,
  } = props;
  const [initialValues, setInitialValues] = React.useState(null);
  const [countryCode, setCountryValues] = React.useState("IND");

  const [stateCode, setStateValues] = React.useState("");
  const [stateList, setStateList] = React.useState([]);

  const [districtCode, setDistrictValues] = React.useState("");
  const [districtList, setDistrictList] = React.useState([]);

  const [talukCode, setTalukValues] = React.useState("");
  const [talukList, setTalukList] = React.useState([]);

  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    const initialValues = {
      bloodType: _get(props, "isEditRequest.bloodType", ""),
      description: _get(props, "isEditRequest.description", ""),
      contactName: _get(props, "isEditRequest.contactName", ""),
      contactNumber: _get(props, "isEditRequest.contactNumber", ""),
      country: _get(props, "isEditRequest.country", "IND"),
      state: _get(props, "isEditRequest.state", ""),
      district: _get(props, "isEditRequest.district", ""),
      taluk: _get(props, "isEditRequest.taluk", ""),
    };
    setInitialValues(initialValues);
    setStateValues(_get(props, "isEditRequest.state", ""));
    setDistrictValues(_get(props, "isEditRequest.district", ""));
    setTalukValues(_get(props, "isEditRequest.taluk", ""));
  }, [isEditRequest]);

  React.useEffect(() => {
    generateLocationList();
  }, [countryCode]);

  React.useEffect(() => {
    generateLocationList();
  }, [stateCode]);

  React.useEffect(() => {
    generateLocationList();
  }, [districtCode]);

  const generateLocationList = () => {
    locationList.forEach((c) => {
      if (c.code === countryCode) {
        setStateList(c.state);
        c.state.forEach((s) => {
          if (s.code === stateCode) {
            setDistrictList(s.district);
            s.district.forEach((d) => {
              if (d.code === districtCode) {
                setTalukList(d.taluk);
              }
            });
          }
        });
      }
    });
  };

  const raiseRequest = (values) => {
    setLoader(true);
    const isEdit = !_isEmpty(isEditRequest);
    let data = {};
    if (isEdit) data = { ...values, postId: isEditRequest.postId };
    else data = values;
    postBloodRequest(data, isEdit)
      .then((res) => {
        if (_get(res, "status")) {
          props.updateToastMsg({ msg: res.message, type: "success" });
          toggleBloodModal(false);
          if (isEdit) {
            const feedIndex = _findIndex(bRequestList, (item) => {
              return item.postId === res.data.postId;
            });
            if (feedIndex > -1) {
              const newList = _cloneDeep(bRequestList);
              newList[feedIndex] = res.data;
              setBloodReqList({ data: newList });
            }
          } else setBloodReqList({ data: [res.data, ...bRequestList] });
        } else props.updateToastMsg({ msg: res.message, type: "error" });
        setLoader(false);
      })
      .catch((err) => {
        props.updateToastMsg({ msg: "Something went wrong.", type: "error" });
        setLoader(false);
      });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          raiseRequest(values);
        }}
      >
        {(formikProps) => (
          <form>
            <Grid container spacing={2}>
              <Grid item sm={12} md={4}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Contact Person"
                  name="contactName"
                  component={FTextField}
                  fullWidth
                  value={_get(formikProps, "values.contactName", "")}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Contact number"
                  name="contactNumber"
                  component={FTextField}
                  fullWidth
                  value={_get(formikProps, "values.contactNumber", "")}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <Field
                  label="Blood Group"
                  name="bloodType"
                  select
                  value={_get(formikProps, "values.bloodType", "")}
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
              <Grid item sm={12} md={4}>
                <Field
                  label="State"
                  name="state"
                  select
                  value={_get(formikProps, "values.state", "")}
                  fullWidth
                  component={FTextField}
                  inputProps={{
                    onChange: (e) => setStateValues(e.target.value),
                  }}
                >
                  {stateList.map((s) => (
                    <MenuItem key={s.code} value={s.code}>
                      <Typography variant="body1">{s.name}</Typography>
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item sm={12} md={4}>
                <Field
                  label="District"
                  name="district"
                  select
                  value={_get(formikProps, "values.district", "")}
                  fullWidth
                  component={FTextField}
                  inputProps={{
                    onChange: (e) => setDistrictValues(e.target.value),
                  }}
                  disabled={_isEmpty(districtList)}
                >
                  {districtList.map((d) => (
                    <MenuItem key={d.code} value={d.code}>
                      <Typography variant="body1">{d.name}</Typography>
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item sm={12} md={4}>
                <Field
                  label="Taluk"
                  name="taluk"
                  select
                  value={_get(formikProps, "values.taluk", "")}
                  fullWidth
                  component={FTextField}
                  disabled={_isEmpty(talukList)}
                >
                  {talukList.map((t) => (
                    <MenuItem key={t.code} value={t.code}>
                      <Typography variant="body1">{t.name}</Typography>
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item sm={12} md={12}>
                <Field
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Description"
                  name="description"
                  component={FTextField}
                  fullWidth
                  value={_get(formikProps, "values.description", "")}
                />
                <Typography variant="caption">
                  {_get(formikProps, "values.description", "").length}/100
                </Typography>
              </Grid>
            </Grid>
            <Box px={1} py={1} display="flex" justifyContent="flex-end">
              <ButtonWrapper
                onClick={() => toggleBloodModal(false)}
                disabled={loader}
                bgColor={grey[100]}
                color={colors.blue}
                mr={1}
              >
                <Typography variant="button">Close</Typography>
              </ButtonWrapper>
              <ButtonWrapper
                onClick={formikProps.handleSubmit}
                disabled={loader}
              >
                <Typography variant="button">Sumbit</Typography>

                {loader && (
                  <CircularProgress
                    size={24}
                    className={classes.submitLoaderBtn}
                  />
                )}
              </ButtonWrapper>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    toastMsg: state.toastMsg,
    userDetails: state.userDetails,
    isEditRequest: _get(state, "ui.postBloodModal.data"),
    bRequestList: _get(state, "bRequestList.data", []),
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
    toggleBloodModal: (show, data) => {
      dispatch({
        type: "SHOW_B_MODAL",
        payload: { show, data },
      });
    },
    setBloodReqList: (payload) => {
      dispatch({
        type: "ADD_B",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestBloodForm);
