import React, { useState } from "react";
import _get from "lodash/get";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import Otp from "src/components/common/otp";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
  },
  paper: {
    padding: theme.spacing(1, 2),
  },
}));

function PhoneAuthentication(props) {
  const classes = useStyles();
  const [toggleOtp, setToggleOtp] = useState(false);

  return (
    <Paper className={classes.paper}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body1">Phone Number: 9901373620</Typography>
        </Box>
        <ButtonWrapper onClick={() => setToggleOtp(!toggleOtp)}>
          <Typography variant="button">Add</Typography>
        </ButtonWrapper>
      </Box>
      {toggleOtp && <Otp toggleOtp={toggleOtp} actions={{ setToggleOtp }} />}
    </Paper>
  );
}

export default PhoneAuthentication;
