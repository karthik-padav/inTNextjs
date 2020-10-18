import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BloodBank from "./Components/BloodBank/BloodBank";
import Header from "./Components/NavBar/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <BloodBank />
    </div>
  );
}

// App.getInitialProps = async (ctx) => {
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const json = await res.json();
//   return { stars: json.stargazers_count };
// };

export default App;
