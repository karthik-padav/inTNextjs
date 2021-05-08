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
import ImagePreview from "components/common/ImagePreview";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  wordBreak: {
    wordBreak: "break-all",
  },
}));

function CardWrapper(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {_get(data, "content") && (
        <Link href="/questions/[id]" as={`/questions/${_get(data, "postId")}`}>
          <a>
            <Box my={1}>
              <Typography variant="body1" className={classes.wordBreak}>
                <b>{data.content}</b>
              </Typography>
            </Box>
          </a>
        </Link>
      )}
      {_get(data, "contentImage") && !_isEmpty(data.contentImage) && (
        <Box my={1}>
          <ImagePreview
            contentImage={data.contentImage}
            imagePath={`/uploads/feedPost/${_get(data, "postId")}`}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CardWrapper);
