// import Head from "next/head";
// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import BloodBank from "./Components/BloodBank/BloodBank";
// import Header from "./Components/NavBar/Header";
import {bloodRequied} from '../DataService/Services'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));
// function App() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <Header />
//       <BloodBank />
//     </div>
//   );
// }

// // App.getInitialProps = async (ctx) => {
// //   const res = await fetch("https://api.github.com/repos/vercel/next.js");
// //   const json = await res.json();
// //   return { stars: json.stargazers_count };
// // };

// export default App;


import Link from "next/link";

export default function Index() {
  return (
    <>
  <div>Hello world!</div>
  <Link href="/about"><a>About</a></Link>
  <Link href="/bloodbank" as={'/bloodbank'}><a>BloodBank</a></Link>
  <Link href="/questions" as={'/questions'}><a>Q&A</a></Link>
    </>
  )
}
