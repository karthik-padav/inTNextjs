import axios from "axios";
import constants from "./Constants";

export const bloodRequied = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: constants.baseUrl + "/wp-json/api/v1/bloodrequied",
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
  console.log(querry,'querry')
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
export const getBloodDonor = (querry) => {
  console.log(querry,'querry')
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


