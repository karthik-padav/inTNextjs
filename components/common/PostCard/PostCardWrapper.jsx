import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import Divider from "components/common/Divider";
import OptionMenuV2 from "components/common/OptionMenuV2";

import UserHeaderCard from "components/common/UserHeaderCard";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

function PostCardWrapper(props) {
  const classes = useStyles(props);

  const { children, data, showCommentList = false, menuItem = [] } = props;
  const userDetails = _get(props, "data.user_details");
  const createdAt = _get(data, "createdAt");
  return (
    <Paper className={classes.paper}>
      {userDetails && (
        <UserHeaderCard {...userDetails} createdAt={createdAt}>
          {!_isEmpty(menuItem) && (
            <OptionMenuV2 menuItem={menuItem} data={data} />
          )}
        </UserHeaderCard>
      )}

      {children && children}

      <Divider color="primary" mt={1} mb={1} />
      <Typography variant="body1">
        Comments: {_get(data, "comments", 0)}
      </Typography>
      <Divider color="primary" mt={1} mb={1} />
      {showCommentList && <CommentCard id={data.feedId} />}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: _get(state, "userDetails"),
  };
};
export default connect(mapStateToProps)(PostCardWrapper);
