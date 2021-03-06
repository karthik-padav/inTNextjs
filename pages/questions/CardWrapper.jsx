import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import Link from "next/link";
import ImagePreview from "./ImagePreview";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function CardWrapper(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {_get(data, "content") && (
        <Link href="/questions/[id]" as={`/questions/${_get(data, "feedId")}`}>
          <a>
            <Box my={1}>
              <Typography variant="body1">
                <b>{data.content}</b>
              </Typography>
            </Box>
          </a>
        </Link>
      )}
      {!_isEmpty(data.contentImage) && (
        <Box my={1}>
          <ImagePreview
            contentImage={data.contentImage}
            imagePath={`/uploads/feedPost/${_get(data, "feedId")}`}
          />
        </Box>
      )}
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
    togglePostModal: (flag, data) => {
      dispatch({
        type: "SHOW_ADD_POST",
        payload: { flag, data },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardWrapper);
