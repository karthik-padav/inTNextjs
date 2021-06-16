import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
  },
}));

function LoadMore(props) {
  const {
    label = "Load More",
    loader = false,
    onTrigger = () => {},
    width = "auto",
  } = props;

  return (
    <>
      <ButtonWrapper
        variant="contained"
        onClick={onTrigger}
        loader={loader}
        width={width}
      >
        <Typography variant="button">{label}</Typography>
      </ButtonWrapper>
    </>
  );
}

export default LoadMore;
