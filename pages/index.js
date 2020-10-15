import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Home from "./Home/Home";
import Header from "./NavBar/Header";

class App extends React.Component {
  // static async getInitialProps(ctx) {
  //   const res = await fetch("https://api.github.com/repos/vercel/next.js");
  //   const json = await res.json();
  //   const isServer = typeof window === "undefined";
  //   return { json, isServer };
  // }

  async componentDidMount() {
    const res = await fetch("https://api.github.com/repos/vercel/next.js");
    const json = await res.json();
    console.log(json, "we are in did mount");
  }

  render() {
    console.log(this.props, "this.props123");
    return (
      <>
        <Header />
        <Home />
      </>
    );
  }
}

export default App;
