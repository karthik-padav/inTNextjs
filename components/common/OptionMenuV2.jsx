import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect, useDispatch } from "react-redux";
import _get from "lodash/get";
import ButtonWrapper from "components/common/ButtonWrapper";
import { toggleLoginModal } from "redux/slices/uiSlice";

function OptionMenuV2(props) {
  const dispatch = useDispatch();
  const { menuItem = [], data, loggedUser = false } = props;
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
                if (loggedUser) {
                  _get(item, "cb") && item.cb(data);
                } else dispatch(toggleLoginModal());
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

export default OptionMenuV2;
