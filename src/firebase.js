// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl-StHRwmFaQFeOCat6HowWCJ0wVnQs-g",
  authDomain: "biodata-cfca9.firebaseapp.com",
  projectId: "biodata-cfca9",
  storageBucket: "biodata-cfca9.appspot.com",
  messagingSenderId: "936520565978",
  appId: "1:936520565978:web:702109242236d2ed3d51e3",
  measurementId: "G-5MM2CZPBZ8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)
const db = getFirestore();

export default db;