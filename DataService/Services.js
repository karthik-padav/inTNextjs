import axios from "axios";
import constants from "../DataService/Constants";
import _get from "lodash/get";
import { getToken } from "./Utils";

export const getUserDetails = (userId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + `/getUserDetails/${userId}`,
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
      headers: { Authorization: `Bearer ${getToken()}` },
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
      headers: { Authorization: `Bearer ${getToken()}` },
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
      headers: { Authorization: `Bearer ${getToken()}` },
      data: {
        bloodRequestId: id,
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
      headers: { Authorization: `Bearer ${getToken()}` },
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
      headers: { Authorization: `Bearer ${getToken()}` },
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

export const postFeed = (body, flag) => {
  return new Promise((resolve, reject) => {
    let url = constants.baseUrl;
    if (flag === "post") url += "/postFeedDetails";
    else url += "/updatePostFeed";
    axios({
      method: "post",
      url,
      headers: { Authorization: `Bearer ${getToken()}` },
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
      headers: { Authorization: `Bearer ${getToken()}` },
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
