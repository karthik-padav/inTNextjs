import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

function InfiniteScroll(props) {
  const { id = "", loader = true, onTrigger = () => {} } = props;
  useEffect(() => {
    window.addEventListener("scroll", trackScrolling);

    return () => {
      window.removeEventListener("scroll", trackScrolling);
    };
  }, []);

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  const trackScrolling = () => {
    const wrappedElement = document.getElementById(id);
    if (!loader && isBottom(wrappedElement)) {
      onTrigger();
      document.removeEventListener("scroll", trackScrolling);
    }
  };

  return <div id={id}>{props.children}</div>;
}

export default InfiniteScroll;
