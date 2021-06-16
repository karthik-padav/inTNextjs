import axios from "axios";
import constants from "./Constants";
import _get from "lodash/get";
import { isLoggedIn } from "src/utils/Common";

const getHeader = () => {
  const loggedIn = isLoggedIn();
  const token = _get(loggedIn, "accesstoken");
  console.log({ token });
  return typeof window !== "undefined" && token
    ? { Authorization: `Bearer ${token}` }
    : "";
};

export const getUserDetails = (userId) => {
  let url = `${constants.baseUrl}/getUserDetails`;
  if (userId) url += `?userId=${userId}`;
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
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
  if (_get(data, "_id")) url = `${constants.baseUrl}/editComment`;
  else url = `${constants.baseUrl}/postComments`;
  console.log(getHeader(), "getHeader()");
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
      method: "delete",
      url: `${constants.baseUrl}/deleteComment/${id}`,
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

export const handleReview = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.baseUrl}/handleReview`,
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
  console.log(body, "body123");
  return new Promise((resolve, reject) => {
    let url = constants.baseUrl;
    if (flag === "post") url += "/postFeedDetails";
    else url += "/updatePostFeed";
    axios({
      method: "post",
      url,
      headers: { ...getHeader(), "Content-Type": "multipart/form-data" },
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
      method: "delete",
      url: `${constants.baseUrl}/deletePostFeed/${id}`,
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
