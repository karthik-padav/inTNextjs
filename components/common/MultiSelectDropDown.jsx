import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

import _includes from "lodash/includes";
import _get from "lodash/get";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect(props) {
  const { label, form, meta, field, shopCategory = [] } = props;
  const { setFieldValue, values } = form;
  const { error, touched } = meta;
  const { name } = field;
  console.log(field, "field123");
  console.log(form, "form123");
  console.log(meta, "meta123");
  const classes = useStyles();
  let category = _get(values, "category", []);
  console.log(category, "category123");

  const handleChange = (event) => {
    // setPersonName(event.target.value);
    setFieldValue(name, event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          name={name}
          // {...form}
          {...meta}
          {...field}
          value={category}
          onChange={handleChange}
          input={<Input />}
          // MenuProps={MenuProps}
          renderValue={(selected) => (
            <Box className={classes.chips}>
              {selected.map((value, index) => (
                <Box m={0.2} key={index}>
                  <Chip label={value} />
                </Box>
              ))}
            </Box>
          )}
        >
          {shopCategory.map((item, index) => (
            <MenuItem key={index} value={item.code}>
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
        {error && touched && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
}
