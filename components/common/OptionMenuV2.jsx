import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { isLoggedIn } from "dataService/Utils";
import _get from "lodash/get";

function OptionMenuV2(props) {
  const { menuItem = [], data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openOptionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeOptionMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        variant="contained"
        size="medium"
        color={"primary"}
        onClick={openOptionMenu}
      >
        <Icon className={"fa fa-ellipsis-v"} style={{ fontSize: 15 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeOptionMenu}
      >
        {menuItem.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              if (_get(item, "authCheck")) {
                if (isLoggedIn()) {
                  _get(item, "cb") && item.cb(data);
                } else props.toggleLoginModal(true);
              } else _get(item, "cb") && item.cb(data);
              closeOptionMenu();
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoginModal: (flag) => {
      dispatch({
        type: "SHOW_LOGIN_MODAL",
        payload: flag,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(OptionMenuV2);
