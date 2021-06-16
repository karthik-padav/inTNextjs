import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import _startsWith from "lodash/startsWith";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import Divider from "src/components/common/Divider";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "src/themes/ThemeColors";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import DialogBox from "src/components/common/dialogBoxWrapper/DialogBox";
import TextField from "@material-ui/core/TextField";
import OtpInput from "react-otp-input";
import firebase from "src/dataService/firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
  },
  otpInput: {
    width: "2rem",
    height: "2rem",
    margin: "0 1rem",
    fontSize: "1.2rem",
    borderBottom: "1px solid black",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    outlineWidth: 0,
  },
}));

const phoneNumberCapture = (props) => {
  const { phoneNumberHandleChange = () => {}, phoneNumber = "" } = props;
  return (
    <Box px={2} pb={1}>
      <Typography variant="body1" align="center">
        We will send you an <b>One time Password</b> to this number
      </Typography>
      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="body1" align="center">
          Enter Mobile Number
        </Typography>
        <Box mt={1}>
          <PhoneInput
            country="in"
            value={phoneNumber}
            placeholder=""
            containerStyle={{ width: 200, maxWidth: "100%" }}
            inputStyle={{ width: "100%" }}
            onChange={phoneNumberHandleChange}
            countryCodeEditable={false}
            // isValid={(inputNumber, country, countries) => {
            //   return countries.some((country) => {
            //     return (
            //       _startsWith(inputNumber, country.dialCode) ||
            //       _startsWith(country.dialCode, inputNumber)
            //     );
            //   });
            // }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const otpCapture = ({ phoneNumber, otp, handleOtpChange, classes }) => {
  return (
    <Box px={2} pb={1}>
      <Typography variant="body1" align="center">
        One time Password sent to <b>{phoneNumber}</b>
      </Typography>
      <Box
        mt={1}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          separator={<span />}
          inputStyle={classes.otpInput}
        />
      </Box>
    </Box>
  );
};

function PhoneAuthentication(props) {
  const { actions = {}, toggleOtp = false } = props;
  const { setToggleOtp = () => {} } = actions;
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [otp, handleOtpChange] = useState(false);

  const submitPhoneNumberAuth = () => {
    setLoader(true);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoader(false);
        setStep(2);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  function submitPhoneNumberAuthCode() {
    setLoader(true);
    confirmationResult
      .confirm(otp)
      .then(function (result) {
        if (result) {
          const {
            user: { uid, phoneNumber },
          } = result;
          console.log({ uid, phoneNumber });
        }
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  }
  const currentUser = firebase.auth().currentUser;
  console.log(currentUser, "currentUser123");

  const deleteUser = () => {
    admin
      .auth()
      .getUserByPhoneNumber(phoneNumber)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data:  ${userRecord.toJSON()}`);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  };

  const step1_menu = [
    {
      title: "Cancel",
      code: "cancel",
      cb: () => setToggleOtp(!toggleOtp),
      mr: 2,
      color: colors.blue,
      bgColor: grey[100],
      showLoader: false,
      makeDisableOnLoad: true,
    },
    {
      title: "Get OTP",
      code: "get_otp",
      showLoader: true,
      makeDisableOnLoad: true,
      cb: submitPhoneNumberAuth,
    },
  ];

  const step2_menu = [
    {
      title: "Go Back",
      code: "go_back",
      cb: () => setStep(1),
      mr: 2,
      color: colors.blue,
      bgColor: grey[100],
      showLoader: false,
      makeDisableOnLoad: true,
    },
    {
      title: "Verify",
      code: "get_otp",
      showLoader: true,
      makeDisableOnLoad: true,
      cb: submitPhoneNumberAuthCode,
    },
  ];

  const footerMenu = step === 1 ? step1_menu : step === 2 ? step2_menu : [];

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          // submitPhoneNumberAuth();
        },
      }
    );
  }, []);

  const phoneNumberHandleChange = (value, data, event, formattedValue) => {
    console.log(value, "value123123");
    console.log(data, "data123123");
    console.log(event, "event123123");
    const phoneNumber = formattedValue.replace(/[\s-]/g, "");
    console.log(phoneNumber, " formattedValue123123");
    setPhoneNumber(phoneNumber);
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      <DialogBox
        isModalOpen={toggleOtp}
        TransitionComponent={Transition}
        headerTitle={"OTP Verification"}
        body={
          <>
            {step === 1 &&
              phoneNumberCapture({ phoneNumberHandleChange, phoneNumber })}
            {step === 2 &&
              otpCapture({ phoneNumber, classes, handleOtpChange, otp })}
          </>
        }
        footer={
          <Box px={1} py={1} display="flex" justifyContent="flex-end">
            {footerMenu.map((item, index) => {
              const {
                cb = () => {},
                title = "",
                showLoader = false,
                bgColor = null,
                makeDisableOnLoad = true,
                color = null,
              } = item;
              return (
                <ButtonWrapper
                  mr={index == 0 ? 1 : 0}
                  key={index}
                  onClick={cb}
                  disabled={loader && makeDisableOnLoad}
                  loader={showLoader && loader}
                  bgColor={bgColor}
                  color={color}
                >
                  {title}
                </ButtonWrapper>
              );
            })}
          </Box>
        }
      />
    </>
  );
}

export default PhoneAuthentication;
