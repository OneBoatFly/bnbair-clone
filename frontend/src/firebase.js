// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

const firebaseConfig = {
    apiKey: "AIzaSyB6vPiDU9IVWzRZELW5_rgTyjsUwMMMXAc",
    authDomain: "bnbair-4c597.firebaseapp.com",
    projectId: "bnbair",
    storageBucket: "bnbair.appspot.com",
    messagingSenderId: "258420751756",
    appId: "1:258420751756:web:c272a32ab61cb23baeaaa9",
    measurementId: "G-0BFGDJJDEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('6Ldsv9MjAAAAAL04HVRKIPXq_gtz_UweQYXX4MRvQQQ'),
//     // isTokenAutoRefreshEnabled: true
// });

export const storage = getStorage(app)