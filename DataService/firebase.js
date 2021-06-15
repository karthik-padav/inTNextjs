import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOQkC6Ce5s8ZDHl948tZoSuOPlil7oxv4",
  authDomain: "intulunadu.firebaseapp.com",
  projectId: "intulunadu",
  storageBucket: "intulunadu.appspot.com",
  messagingSenderId: "622164707379",
  appId: "1:622164707379:web:9a00b59a0c7475b7497b46",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
