import Head from "next/head";
import React from "react";
import _get from "lodash/get";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonWrapper from "components/common/ButtonWrapper";
import { Typography } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import Divider from "components/common/Divider";
import { makeStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
  },
}));

function ConfirmAlertBox(props) {
  const classes = useStyles();
  const { menu = [], data, isModalOpen } = props;
  return (
    <Dialog
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {_get(props, "title") && (
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h1">{props.title}</Typography>
          <Divider mt={1} mb={1.5} />
        </DialogTitle>
      )}
      {_get(props, "subtitle") && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.subtitle}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {menu.map((item, index) => {
          const {
            cb = () => {},
            title = "",
            hasLoader = false,
            loader = false,
          } = item;
          return (
            <ButtonWrapper
              // borderRadius="100px"
              bgColor="color3"
              hoverBgColor="color2"
              color="color1"
              key={index}
              onClick={() => cb(data)}
              disabled={hasLoader && loader}
              loader={loader}
            >
              <Typography variant="button">{title}</Typography>
            </ButtonWrapper>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmAlertBox;
