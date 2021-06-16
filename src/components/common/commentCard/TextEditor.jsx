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
import { getAllComments, postComments } from "src/dataService/Api";
import { isLoggedIn } from "src/utils/Common";
import UserHeaderCard from "src/components/common/UserHeaderCard";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import OptionMenuV2 from "src/components/common/OptionMenuV2";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "src/themes/ThemeColors";

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

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <ButtonWrapper
          onClick={onCancel}
          bgColor={grey[100]}
          color={colors.blue}
        >
          <Typography variant="button">Cancel</Typography>
        </ButtonWrapper>
        <ButtonWrapper
          ml={1}
          variant="contained"
          onClick={() => {
            if (onSave)
              onSave({
                commentId: _get(data, "_id"),
                content: comments,
              });
          }}
        >
          <Typography variant="button">Save</Typography>
        </ButtonWrapper>
      </Box>
    </div>
  );
}

export default TextEditor;
