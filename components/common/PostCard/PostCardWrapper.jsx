import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import Divider from "components/common/Divider";
import Icon from "@material-ui/core/Icon";
import OptionMenuV2 from "components/common/OptionMenuV2";
import CommentCard from "components/common/CommentCard/index";
import UserHeaderCard from "components/common/UserHeaderCard";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ButtonWrapper from "components/common/ButtonWrapper";
import Link from "next/link";

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

  const {
    children,
    data,
    showCommentList = false,
    menuItem = [],
    redirect = null,
  } = props;
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

      <Divider mt={1} mb={1} />
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" mr={2}>
          <ButtonWrapper
            type="IconButton"
            bgColor="color3"
            hoverBgColor="color6"
            color="color5"
            // onClick={console.log("Liked")}
          >
            {/* <Icon className="far fa-heart" fontSize="small" /> */}
            <Icon className="fas fa-heart" fontSize="small" />
          </ButtonWrapper>
          <Typography variant="body1">100</Typography>
        </Box>
        <Box display="flex" alignItems="center" mr={2}>
          <ButtonWrapper
            type="IconButton"
            bgColor="color3"
            hoverBgColor="color2"
            color="color1"
          >
            <Icon className="far fa-comment" fontSize="small" />
          </ButtonWrapper>
          <Typography variant="body1">{_get(data, "comments", 0)}</Typography>
        </Box>
      </Box>
      {showCommentList && (
        <>
          {/* <Divider mt={1} mb={1} /> */}
          <CommentCard id={data.feedId} />
        </>
      )}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: _get(state, "userDetails"),
  };
};
export default connect(mapStateToProps)(PostCardWrapper);
