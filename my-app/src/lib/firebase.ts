// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaSvzUeZcM9dJgw6RlfXC_GCAVPaHDlHM",
  authDomain: "quietquill-zuuz.firebaseapp.com",
  projectId: "quietquill-zuuz",
  storageBucket: "quietquill-zuuz.appspot.com",
  messagingSenderId: "1006875102776",
  appId: "1:1006875102776:web:e9f3c15f328b542ff9a0cd",
  measurementId: "G-Y84J7X2XR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);