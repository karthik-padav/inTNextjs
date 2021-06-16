import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { isLoggedIn } from "src/utils/Common";
import _get from "lodash/get";
import ButtonWrapper from "src/components/common/ButtonWrapper";

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
      <ButtonWrapper type="IconButton" onClick={openOptionMenu}>
        <Icon className={"fa fa-ellipsis-h"} style={{ fontSize: 15 }} />
      </ButtonWrapper>
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
