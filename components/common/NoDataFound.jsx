import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import * as animationData from "dataService/lottie/no_data_found.json";

function NoDataFound(props) {
  const { title = "No data found" } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <p>{title}asdasd</p>
      <Lottie options={defaultOptions} height={400} width={400} />
    </>
  );
}

export default NoDataFound;
