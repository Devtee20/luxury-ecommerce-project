import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOoclLJxHfP3QESLxl58Qw-reK7bLny_c",
    authDomain: "ecommerce-app-481a8.firebaseapp.com",
    projectId: "ecommerce-app-481a8",
    storageBucket: "ecommerce-app-481a8.firebasestorage.app",
    messagingSenderId: "788189855083",
    appId: "1:788189855083:web:3fad70537f3880f91e202e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);