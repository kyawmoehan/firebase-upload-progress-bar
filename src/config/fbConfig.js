import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBbFgBKpm9wUmfdStI4drth_girzWKuMeM",
  authDomain: "progress-bar-52368.firebaseapp.com",
  databaseURL: "https://progress-bar-52368.firebaseio.com",
  projectId: "progress-bar-52368",
  storageBucket: "progress-bar-52368.appspot.com",
  messagingSenderId: "520230756644",
  appId: "1:520230756644:web:45faebe951434bba8513b1",
  measurementId: "G-WD5DQRP3QT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const storage = firebase.storage();
export const storageRef = storage.ref();
