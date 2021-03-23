const constants = {
  baseUrl: "http://localhost:8081",
  dpImagePath: "./uploads/displayPhoto/",
  postImagePath: "./uploads/feedPost/",
  Client_Secret: "JI4VLN5YzeasPsjn0qoVUkAJ",
  clientId:
    "142327848430-tmf4l94t5a7f6kcepvjhm6rqng02u6ga.apps.googleusercontent.com",
  pas: "*A+[d}KU0E(N}0c%",
  dm: "mim",
  u: "admin",
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

  MENU: {
    HOME: {
      title: "Home",
      code: "home",
      icon: "fas fa-home",
      iconSize: "small",
      iconColor: "red",
      redirect: "/",
    },
    PROFILE: {
      title: "Profile",
      code: "profile",
      icon: "far fa-user-circle",
      iconSize: "small",
      iconColor: "#4c6ef5",
      redirect: "/profile",
    },

    QUESTIONS: {
      title: "Questions",
      code: "questions",
      icon: "fas fa-rss",
      iconSize: "small",
      iconColor: "#ee802f",
      redirect: "/questions",
    },
    BLOODBANK: {
      title: "Blood Bank",
      code: "bloodBank",
      icon: "fas fa-tint",
      iconSize: "small",
      iconColor: "red",
      redirect: "/bloodbank",
    },
    ABOUT: {
      title: "About",
      code: "about",
      icon: "fas fa-info",
      iconSize: "small",
      iconColor: "#4c6ef5",
      redirect: "/about",
    },
    SETTINGS: {
      title: "Settings",
      code: "settings",
      icon: "fas fa-cog",
      iconSize: "small",
      // iconColor: "red",
      redirect: "/settings",
    },
  },
};
export default constants;
