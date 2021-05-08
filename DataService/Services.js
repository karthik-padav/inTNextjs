import axios from "axios";
import constants from "../DataService/Constants";
import _get from "lodash/get";
import { getToken } from "./Utils";

const getHeader = () => {
  return typeof window !== "undefined"
    ? { Authorization: `Bearer ${getToken()}` }
    : "";
};

export const getUserDetails = (userId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/getUserDetails/${userId}`,
      headers: getHeader(),
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getNotification = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/getNotification`,
      headers: getHeader(),
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const readNotification = (notificationId) => {
  const data = { unread: 0, notificationId };
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: constants.baseUrl + `/readNotification`,
      headers: getHeader(),
      data,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateUserDetails = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: constants.baseUrl + `/updateUserDetails`,
      headers: getHeader(),
      data,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const login = (body) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: constants.baseUrl + "/login",
      headers: getHeader(),
      data: body,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postBloodRequest = (body, isEdit) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.baseUrl}/${
        isEdit ? "updateBloodRequest" : "postBloodRequest"
      }`,
      headers: getHeader(),
      data: body,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteBloodRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.baseUrl}/deleteBloodRequest`,
      headers: getHeader(),
      data: {
        postId: id,
      },
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getBloodReceiver = (querry) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/getAllBloodRequest${querry}`,
      headers: getHeader(),
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getBloodDonor = (querry) => {
  console.log(querry, "querry");
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/wp-json/api/v1/questions${querry}`,
      headers: getHeader(),
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * START
 * COMMENTS API
 */
export const getAllComments = (querry) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/getAllComments${querry}`,
      headers: getHeader(),
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postComments = (data) => {
  let url = "";
  if (_get(data, "commentId")) url = `${constants.baseUrl}/editComment`;
  else url = `${constants.baseUrl}/postComments`;
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      headers: getHeader(),
      data,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.baseUrl}/deleteComment`,
      headers: getHeader(),
      data: {
        commentId: id,
      },
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * ENDS
 * COMMENTS API
 */

export const handleLike = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.baseUrl}/handleLike`,
      headers: getHeader(),
      data,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postFeed = (body, flag) => {
  return new Promise((resolve, reject) => {
    let url = constants.baseUrl;
    if (flag === "post") url += "/postFeedDetails";
    else url += "/updatePostFeed";
    axios({
      method: "post",
      url,
      headers: getHeader(),
      data: body,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getQuestions = (querry) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/getAllFeeds${querry}`,
      headers: getHeader(),
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deletePostFeed = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.baseUrl}/deletePostFeed`,
      headers: getHeader(),
      data: {
        feedId: id,
      },
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/** Shop - START */
export const getAllShop = (querry) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/getAllShop${querry}`,
      headers: getHeader(),
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postShop = (body, flag) => {
  return new Promise((resolve, reject) => {
    let url = constants.baseUrl;
    if (flag === "post") url += "/postShop";
    else url += "/updateShop";
    axios({
      method: "post",
      url,
      headers: getHeader(),
      data: body,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteShop = (id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.baseUrl}/deleteShop`,
      headers: getHeader(),
      data: {
        shopId: id,
      },
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/** Shop - END */
