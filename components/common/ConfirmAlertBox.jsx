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
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import DialogBox from "components/common/DialogBoxWrapper/DialogBox";

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
    <DialogBox
      isModalOpen={isModalOpen}
      // onClose={() => onClose(false)}
      headerTitle={props.title}
      body={
        <Box px={2} pb={1}>
          {props.subtitle}
        </Box>
      }
      footer={
        <Box px={1} py={1} display="flex" justifyContent="flex-end">
          {menu.map((item, index) => {
            const {
              cb = () => {},
              title = "",
              hasLoader = false,
              loader = false,
              bgColor = null,
              color = null,
            } = item;
            console.log(item, "123123");
            return (
              <ButtonWrapper
                mr={index == 0 ? 1 : 0}
                key={index}
                onClick={() => cb(data)}
                disabled={hasLoader && loader}
                loader={loader}
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

    // <Dialog
    //   open={isModalOpen}
    //   TransitionComponent={Transition}
    //   keepMounted
    //   onClose={() => onClose(false)}
    //   aria-labelledby="alert-dialog-slide-title"
    //   aria-describedby="alert-dialog-slide-description"
    // >
    //   {_get(props, "title") && (
    //     <DialogTitle id="alert-dialog-slide-title" disableTypography>
    //       <Typography variant="h1">{props.title}</Typography>
    //       <Divider mt={1} />
    //     </DialogTitle>
    //   )}
    //   {_get(props, "subtitle") && (
    //     <DialogContent>
    //       <DialogContentText id="alert-dialog-slide-description">
    //         {props.subtitle}
    //       </DialogContentText>
    //     </DialogContent>
    //   )}
    //   <DialogActions>
    //     {menu.map((item, index) => {
    //       const {
    //         cb = () => {},
    //         title = "",
    //         hasLoader = false,
    //         loader = false,
    //       } = item;
    //       return (
    //         <ButtonWrapper
    //           key={index}
    //           onClick={() => cb(data)}
    //           disabled={hasLoader && loader}
    //           loader={loader}
    //           bgColor={grey[100]}
    //           color={colors.blue}
    //         >
    //           {title}
    //         </ButtonWrapper>
    //       );
    //     })}
    //   </DialogActions>
    // </Dialog>
  );
}

export default ConfirmAlertBox;
