// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcTePNoNThA0D7JvwWWUEwpVtLjC0jrh8",
  authDomain: "bus-schedule-app-bfbf7.firebaseapp.com",
  projectId: "bus-schedule-app-bfbf7",
  storageBucket: "bus-schedule-app-bfbf7.appspot.com",
  messagingSenderId: "635452667163",
  appId: "1:635452667163:web:e00975d8d3fec23a9b8fbe",
  measurementId: "G-X1MYFKSQLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);