import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import _get from "lodash/get";
import { isLoggedIn } from "src/utils/Common";
import { connect } from "react-redux";
import ShareIcon from "@material-ui/icons/Share";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import Icon from "@material-ui/core/Icon";
import DialogBox from "src/components/common/dialogBoxWrapper/DialogBox";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import {
  // EmailShareButton,
  FacebookShareButton,
  // HatenaShareButton,
  InstapaperShareButton,
  // LineShareButton,
  LinkedinShareButton,
  // LivejournalShareButton,
  // MailruShareButton,
  // OKShareButton,
  // PinterestShareButton,
  // PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  // TumblrShareButton,
  TwitterShareButton,
  // ViberShareButton,
  // VKShareButton,
  WhatsappShareButton,
  // WorkplaceShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  reviewSubTitle: {
    fontSize: 10,
    lineHeight: 1,
    textAlign: "right",
  },
}));

function SharePost(props) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const shareMenu = [
    <FacebookShareButton url="https://www.google.com/" quote="" hashtag="">
      <FacebookIcon size={35} round={true} />
    </FacebookShareButton>,
    // <InstapaperShareButton url="https://www.google.com/">
    //   <InstapaperIcon size={35} round={true} />
    // </InstapaperShareButton>,
    <RedditShareButton
      url="https://www.google.com/"
      title="(string): Title of the shared page"
    >
      <RedditIcon size={35} round={true} />
    </RedditShareButton>,
    <LinkedinShareButton
      url="https://www.google.com/"
      title="(string): Title of the shared page"
      summary="(string): Description of the shared page"
      source=" (string): Source of the content (e.g. your website or application name)"
    >
      <LinkedinIcon size={35} round={true} />
    </LinkedinShareButton>,
    <TelegramShareButton
      url="https://www.google.com/"
      title="(string): Title of the shared page"
    >
      <TelegramIcon size={35} round={true} />
    </TelegramShareButton>,
    <TwitterShareButton
      url="https://www.google.com/"
      title=" (string): Title of the shared page"
      via=" (string)"
      hashtags="(array): Hashtags"
      related=" (array): Accounts to recommend following"
    >
      <TwitterIcon size={35} round={true} />
    </TwitterShareButton>,
    <WhatsappShareButton
      url="https://www.google.com/"
      title=" (string): Title of the shared page"
      separator="(string, default=''): Separates title from the url"
    >
      <WhatsappIcon size={35} round={true} />
    </WhatsappShareButton>,
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Box>
      <ButtonWrapper type="IconButton" onClick={toggleModal}>
        <Icon className="fa fa-share" style={{ fontSize: "18px" }} />
      </ButtonWrapper>

      <DialogBox
        isModalOpen={showModal}
        onClose={toggleModal}
        // fullWidth
        headerTitle={"Share"}
        body={
          <Box display="flex" alignItems="center">
            {shareMenu.map((item, index) => (
              <Box m={1}>{item}</Box>
            ))}
            <Box mb={1}>
              <ButtonWrapper type="IconButton">
                <Icon className="far fa-copy" style={{ fontSize: "22px" }} />
              </ButtonWrapper>
            </Box>
          </Box>
        }
        footer={
          <Box px={1} py={1} display="flex" justifyContent="flex-end">
            <ButtonWrapper onClick={toggleModal}>
              <Typography variant="button">Close</Typography>
            </ButtonWrapper>
          </Box>
        }
      />
    </Box>
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

export default connect(null, mapDispatchToProps)(SharePost);
