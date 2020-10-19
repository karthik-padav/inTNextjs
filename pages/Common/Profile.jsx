import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss";
// import GoogleLogin from "react-google-login";
import { GoogleLogout, GoogleLogin } from "react-google-login";

const Client_Secret = "JI4VLN5YzeasPsjn0qoVUkAJ";
const clientId =
  "142327848430-tmf4l94t5a7f6kcepvjhm6rqng02u6ga.apps.googleusercontent.com";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  p1: {
    padding: theme.spacing(1),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const responseGoogle = (response) => {
  console.log(response, "response123");
};

const logout = () => {};
function Profile() {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={12}>
        <GoogleLogin
          clientId={clientId}
          className="loginBtn"
          onSuccess={responseGoogle}
          buttonText="Login with Google"
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Grid>
      {/* <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Logout"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Logout
          </button>
        )}
        onLogoutSuccess={logout}
      ></GoogleLogout> */}

      <Grid item>
        <Avatar
          alt="Remy Sharp"
          src="https://material-ui.com/static/images/avatar/1.jpg"
          className={classes.large}
        />
      </Grid>
      <Grid item className={classes.pl1}>
        <Typography align="left" variant="body1">
          Karthik Padav
        </Typography>
        <Typography align="left" variant="body1">
          karthikpadav@gmail.com
        </Typography>
        {/* <Icon className="fa fa-map-marker-alt" style={{ color: "red" }} /> */}
      </Grid>
    </Grid>
  );
}

export default Profile;
