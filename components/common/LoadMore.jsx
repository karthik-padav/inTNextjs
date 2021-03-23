import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonWrapper from "components/common/ButtonWrapper";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
  },
}));

function LoadMore(props) {
  const {
    lable = "Load More",
    loader = false,
    onTrigger = () => {},
    width = "auto",
  } = props;

  return (
    <>
      <ButtonWrapper
        // borderRadius="100px"
        bgColor="color3"
        // hoverBgColor="color2"
        color="color1"
        onClick={onTrigger}
        disabled={loader}
        width={width}
      >
        <Typography variant="button">{lable}</Typography>
      </ButtonWrapper>
    </>
  );
}

export default LoadMore;
