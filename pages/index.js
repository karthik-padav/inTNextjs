// import Questions from "./questions/questions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "#__next": {
      backgroundColor: theme.palette.background.dark,
    },
  },
}));

function Index(props) {
  const classes = useStyles();
  return <h1>Home page</h1>;
  // return <Questions />;
}

export default Index;
