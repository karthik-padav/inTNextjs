import Link from "next/link";
import { getQuestions } from "../../DataService/Services";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  p1: {
    padding: theme.spacing(1),
  },
  mt2: {
    paddingTop: theme.spacing(2),
  },
}));

function Post(data) {
  const classes = useStyles();
  return (
    <>
      {data &&
        data.res.map((item, index) => {
          return (
            <Paper key={index} className={classes.paper}>
              <Typography align="left" variant="body1">
                title: {item.title} {item.id}
              </Typography>
              <Typography align="left" variant="body1">
                post_date: {item.post_date}
              </Typography>
              <Typography align="left" variant="body1">
                post_author name: {item.post_author.name}
              </Typography>
              <Typography align="left" variant="body1">
                post_author email: {item.post_author.email}
              </Typography>
              <Typography align="left" variant="body1">
                content: {item.content}
              </Typography>
              <Typography align="left" variant="body1">
                Comments: {item.comment_count}
              </Typography>
              <Typography align="left" variant="body1">
                likes: {item.likes.length}
              </Typography>
            </Paper>
          );
        })}
    </>
  );
}

Post.getInitialProps = async function (data) {
  const { id } = data.query;
  const query = `?id=${id}`;
  const res = await getQuestions(query);
  return { res };
};

export default Post;
