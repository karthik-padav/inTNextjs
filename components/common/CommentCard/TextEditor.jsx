import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { getAllComments, postComments } from "dataService/Services";
import { isLoggedIn } from "dataService/Utils";
import UserHeaderCard from "components/common/UserHeaderCard";
import OptionMenuV2 from "components/common/OptionMenuV2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function TextEditor(props) {
  const classes = useStyles();
  const { data, onSave, onCancel } = props;
  console.log(onSave);
  const [comments, setComments] = useState(_get(data, "content", ""));

  const handleChange = (event) => {
    setComments(event.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="standard-name"
        value={comments}
        fullWidth
        placeholder="Your a comments..."
        multiline
        rows={4}
        rowsMax={4}
        InputProps={{
          onChange: (e) => {
            handleChange(e);
          },
        }}
      />

      <Box display="flex" justifyContent="flex-end">
        <IconButton variant="contained" size="medium" onClick={onCancel}>
          <Typography component="span" variant="caption">
            Cancel
          </Typography>
          {/* <Icon className="fa fa-chevron-right" fontSize="small" /> */}
        </IconButton>
        <IconButton
          variant="contained"
          size="medium"
          onClick={() => {
            if (onSave)
              onSave({
                commentId: _get(data, "commentId"),
                content: comments,
              });
          }}
        >
          <Typography component="span" variant="caption">
            Save
          </Typography>
        </IconButton>
      </Box>
    </div>
  );
}

export default TextEditor;
