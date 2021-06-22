import axios from "axios";
import constants from "./Constants";
import _get from "lodash/get";

const getHeader = async () => {
  if (typeof window !== "undefined") {
    let accesstoken = localStorage.getItem("inTulunadu_accesstoken");
    accesstoken = JSON.parse(accesstoken);
    if (accesstoken) return { Authorization: `Bearer ${accesstoken}` };
  }
  return "";
};

export const getUserDetails = async (userId) => {
  let url = `${constants.serverBaseUrl}/getUserDetails`;
  if (userId) url += `?userId=${userId}`;
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      headers,
    })
      .then((res) => {
        resolve({ data: res?.data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const getNotification = async () => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.serverBaseUrl + `/getNotification`,
      headers,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const readNotification = async (notificationId) => {
  const data = { unread: 0, notificationId };
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: constants.serverBaseUrl + `/readNotification`,
      headers,
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

export const updateUserDetails = async (data) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: constants.serverBaseUrl + `/updateUserDetails`,
      headers,
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

export const login = async (body) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: constants.serverBaseUrl + "/login",
      headers,
      data: body,
    })
      .then((res) => {
        if (res && res.data) resolve({ data: res.data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const postBloodRequest = async (body, isEdit) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.serverBaseUrl}/${
        isEdit ? "updateBloodRequest" : "postBloodRequest"
      }`,
      headers,
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

export const deleteBloodRequest = async (id) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.serverBaseUrl}/deleteBloodRequest`,
      headers,
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

export const getBloodReceiver = async (querry) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.serverBaseUrl + `/getAllBloodRequest${querry}`,
      headers,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getBloodDonor = async (querry) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.serverBaseUrl + `/wp-json/api/v1/questions${querry}`,
      headers,
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
export const getAllComments = async (querry) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.serverBaseUrl + `/getAllComments${querry}`,
      headers,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postComments = async (data) => {
  let url = "";
  if (_get(data, "_id")) url = `${constants.serverBaseUrl}/editComment`;
  else url = `${constants.serverBaseUrl}/postComments`;
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      headers,
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

export const deleteComment = async (id) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: `${constants.serverBaseUrl}/deleteComment/${id}`,
      headers,
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

export const handleLike = async (data) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.serverBaseUrl}/handleLike`,
      headers,
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

export const handleReview = async (data) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.serverBaseUrl}/handleReview`,
      headers,
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

export const postFeed = async (body, flag) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    let url = constants.serverBaseUrl;
    if (flag === "post") url += "/postFeedDetails";
    else url += "/updatePostFeed";
    axios({
      method: "post",
      url,
      headers: { ...headers, "Content-Type": "multipart/form-data" },
      data: body,
    })
      .then((res) => {
        resolve({ data: res?.data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const getQuestions = async (querry = "") => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.serverBaseUrl + `/getAllFeeds${querry}`,
      headers,
    })
      .then((res) => {
        resolve({ data: res?.data });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};

export const deletePostFeed = async (id) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: `${constants.serverBaseUrl}/deletePostFeed/${id}`,
      headers,
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
export const getAllShop = async (querry) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.serverBaseUrl + `/getAllShop${querry}`,
      headers,
    })
      .then((res) => {
        if (res && res.data) resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postShop = async (body, flag) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    let url = constants.serverBaseUrl;
    if (flag === "post") url += "/postShop";
    else url += "/updateShop";
    axios({
      method: "post",
      url,
      headers,
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

export const deleteShop = async (id) => {
  const headers = await getHeader();
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${constants.serverBaseUrl}/deleteShop`,
      headers,
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
