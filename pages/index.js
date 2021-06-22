import BloodBank from "./bloodbank";
import Questions from "./questions";
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
  return <Questions />;
}

export default Index;
