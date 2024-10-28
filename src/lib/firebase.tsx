// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_hGht3h5Cp_wGsLb8qBmGpg9oQxunvAM",
  authDomain: "freshdrink-b55c3.firebaseapp.com",
  projectId: "freshdrink-b55c3",
  storageBucket: "freshdrink-b55c3.appspot.com",
  messagingSenderId: "321714451247",
  appId: "1:321714451247:web:de4a274128e44528e8a7da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app};