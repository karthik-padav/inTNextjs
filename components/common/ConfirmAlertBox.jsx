import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Paper, Box } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import _get from "lodash/get";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  mx_md: {
    width: "300px",
    maxWidth: "100%",
  },
}));

function ConfirmAlertBox(props) {
  const classes = useStyles();
  const { menu = [], data } = props;
  return (
    <Modal
      className={classes.modal}
      open={true}
      closeAfterTransition
      onClose={props.onCancel}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Paper className={classNames(classes.paper, classes.mx_md)}>
          <Box
            component="p"
            variant="body1"
            m={0}
            className={classes.mb2}
            fontWeight="fontWeightBold"
          >
            {props.title}
          </Box>
          <Typography variant="p" gutterBottom>
            Are you sure you want to delete your request?
          </Typography>
          <Box display="flex" className={classes.mt2} justifyContent="flex-end">
            {menu.map((item, index) => {
              const {
                cb = () => {},
                color = "",
                variant = "",
                size = "small",
                title = "",
              } = item;
              return (
                <Button
                  key={index}
                  size={size}
                  onClick={() => cb(data)}
                  color={color}
                  variant={variant}
                >
                  <Typography variant="BUTTON">{title}</Typography>
                </Button>
              );
            })}
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
}

export default ConfirmAlertBox;
