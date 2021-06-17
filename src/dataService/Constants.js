const constants = {
  serverBaseUrl: process.env.SERVER_1_BASEURL,
  s3BaseUrl: process.env.S3_BASE_URL,
  clientId: process.env.GOOGLE_AUTH_CLIENTID,
  // pas: "*A+[d}KU0E(N}0c%",
  // dm: "mim",
  // u: "admin",

  bloodType: [
    {
      name: "AB",
      code: "AB",
    },
    {
      name: "B+",
      code: "B+",
    },
    {
      name: "O",
      code: "O+",
    },
  ],

  shopCategory: [
    {
      name: "Food",
      code: "food",
    },
    {
      name: "Fashion",
      code: "fashion",
    },
    {
      name: "Others",
      code: "other",
    },
    {
      name: "name1",
      code: "n1",
    },
    {
      name: "name2",
      code: "n2",
    },
    {
      name: "name3",
      code: "n3",
    },
    {
      name: "name4",
      code: "n4",
    },
    {
      name: "name5",
      code: "n5",
    },
    {
      name: "name6",
      code: "n6",
    },
    {
      name: "name7",
      code: "n7",
    },
    {
      name: "name8",
      code: "n8",
    },
    {
      name: "name10",
      code: "10",
    },
  ],

  THEME: {
    DARK: "dark",
    LIGHT: "light",
  },

  POST_TYPES: {
    QUESTION: "QUESTION",
    SHOP: "SHOP",
    BLOOD_BANK: "BLOOD_BANK",
  },

  NOTIFICATION_TYPES: {
    LIKE: "LIKE",
    COMMENT: "COMMENT",
  },

  AVATAR: {
    lg: 10,
    md: 6,
    sm: 4,
  },
};
export default constants;
