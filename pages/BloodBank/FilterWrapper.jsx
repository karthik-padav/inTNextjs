import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import constants from "dataService/Constants";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  FormControl,
  Typography,
  Select,
  Chip,
  Box,
  Paper,
  Input,
} from "@material-ui/core";
import _get from "lodash/get";
import locationList from "dataService/Json/LocationList.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  m1: {
    margin: theme.spacing(1),
  },
}));

export default function FilterWrapper(props) {
  const { showBloodType, showState, isFilterShow } = props;
  const classes = useStyles();

  const [bloodType, setBloodType] = useState("");

  const [countryCode, setCountryValues] = React.useState("IND");

  const [stateCode, setStateValues] = React.useState("");
  const [stateList, setStateList] = React.useState([]);

  const [districtCode, setDistrictValues] = React.useState("");
  const [districtList, setDistrictList] = React.useState([]);

  const [talukCode, setTalukValues] = React.useState("");
  const [talukList, setTalukList] = React.useState([]);

  React.useEffect(() => {
    generateLocationList();
  }, [countryCode]);

  React.useEffect(() => {
    generateLocationList();
  }, [stateCode]);

  React.useEffect(() => {
    generateLocationList();
  }, [districtCode]);

  const generateLocationList = () => {
    locationList.forEach((c) => {
      if (c.code === countryCode) {
        setStateList(c.state);
        c.state.forEach((s) => {
          if (s.code === stateCode) {
            setDistrictList(s.district);
            s.district.forEach((d) => {
              if (d.code === districtCode) {
                setTalukList(d.taluk);
              }
            });
          }
        });
      }
    });
  };

  const toggleBloodType = (event, setField) => {
    const value = _get(event, "target.value", "");
    switch (setField) {
      case "setBloodType":
        setBloodType(value);
        break;
      case "setStateValues":
        setStateValues(value);
        if (!value) {
          setDistrictValues("");
          setTalukValues("");
        }
        break;
      case "setDistrictValues":
        setDistrictValues(value);
        if (!value) {
          setTalukValues("");
        }
        break;
      case "setTalukValues":
        setTalukValues(_get(event, "target.value", ""));
        break;
      default:
        break;
    }
  };

  const resetFilter = () => {
    setTalukValues("");
    setDistrictValues("");
    setStateValues("");
    setBloodType("");
    props.applyFilter(null);
    props.setBadgeContent(0);
  };

  const applyFilter = () => {
    let badgeContent = 0;
    let querry = "";
    if (bloodType) {
      querry += `&bloodType=${bloodType}`;
      badgeContent++;
    }
    if (stateCode) {
      querry += `&stateCode=${stateCode}`;
      badgeContent++;
    }
    if (districtCode) {
      querry += `&districtCode=${districtCode}`;
      badgeContent++;
    }
    if (talukCode) {
      querry += `&talukCode=${talukCode}`;
      badgeContent++;
    }
    props.applyFilter(querry);
    props.setBadgeContent(badgeContent);
  };

  const filterComponent = () => {
    return (
      <div className={classes.root}>
        <Typography component="p" variant="body1" className={classes.m1}>
          Filter By:
        </Typography>

        {showBloodType && (
          <>
            {bloodType ? (
              <Chip
                variant="outlined"
                className={classes.m1}
                color="primary"
                label={bloodType}
                onDelete={() => toggleBloodType("", "setBloodType")}
              />
            ) : (
              <FormControl className={classes.formControl}>
                <Select
                  id="chip"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  value={bloodType ? bloodType : ""}
                  onChange={(e) => toggleBloodType(e, "setBloodType")}
                  input={<Input id="select-multiple-chip" />}
                >
                  <MenuItem value="" disabled>
                    Blood Type
                  </MenuItem>
                  {constants.bloodType.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}

        {showState && (
          <>
            {stateCode ? (
              <Chip
                variant="outlined"
                color="primary"
                className={classes.m1}
                label={stateCode}
                onDelete={() => toggleBloodType("", "setStateValues")}
              />
            ) : (
              <FormControl className={classes.formControl}>
                <Select
                  id="chip"
                  value={stateCode ? stateCode : ""}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => toggleBloodType(e, "setStateValues")}
                  input={<Input id="select-multiple-chip" />}
                >
                  <MenuItem value="" disabled>
                    State
                  </MenuItem>
                  {stateList.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {districtCode ? (
              <Chip
                variant="outlined"
                color="primary"
                className={classes.m1}
                label={districtCode}
                onDelete={() => toggleBloodType("", "setDistrictValues")}
              />
            ) : (
              <FormControl className={classes.formControl}>
                <Select
                  id="chip"
                  value={districtCode ? districtCode : ""}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => toggleBloodType(e, "setDistrictValues")}
                  input={<Input id="select-multiple-chip" />}
                  disabled={!stateCode}
                >
                  <MenuItem value="" disabled>
                    District
                  </MenuItem>
                  {districtList.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {talukCode ? (
              <Chip
                variant="outlined"
                color="primary"
                className={classes.m1}
                label={talukCode}
                onDelete={() => toggleBloodType("", "setTalukValues")}
              />
            ) : (
              <FormControl className={classes.formControl}>
                <Select
                  id="chip"
                  value={talukCode ? talukCode : ""}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => toggleBloodType(e, "setTalukValues")}
                  disabled={!districtCode}
                  input={<Input id="select-multiple-chip" />}
                >
                  <MenuItem value="" disabled>
                    Taluk
                  </MenuItem>
                  {talukList.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}

        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Box mr={1}>
            <Button size="small" onClick={resetFilter}>
              <Typography variant="caption">Reset</Typography>
            </Button>
          </Box>
          <Button
            size="small"
            disabled={!(bloodType || stateCode)}
            onClick={applyFilter}
          >
            <Typography variant="caption">Apply</Typography>
          </Button>
        </Box>
      </div>
    );
  };

  return (
    <>
      {isFilterShow && (
        <Paper className={classes.paper}>{filterComponent()}</Paper>
      )}
    </>
  );
}
