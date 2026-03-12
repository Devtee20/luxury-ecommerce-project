import { auth } from "./firebase.js";

import { createUserWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const errorMessage = document.getElementById("error-message");

signupBtn.addEventListener("click", async () => {

  errorMessage.innerText = "";

  try {

    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Account created successfully");

    window.location.href = "login.html";

  } catch (error) {

    if (error.code === "auth/email-already-in-use") {
      errorMessage.innerText = "Email already used. Please login.";

    } else if (error.code === "auth/invalid-email") {
      errorMessage.innerText = "Invalid email address.";

    } else if (error.code === "auth/weak-password") {
      errorMessage.innerText = "Password must be at least 6 characters.";

    } else {
      errorMessage.innerText = "Signup failed. Try again.";
    }

  }

});







// import { auth } from "./firebase.js";

// import {
// createUserWithEmailAndPassword
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const signupBtn = document.getElementById("signup-btn");

// signupBtn.addEventListener("click", async () => {

// try {

// await createUserWithEmailAndPassword(
// auth,
// email.value,
// password.value
// );

// alert("Account created!");

// window.location.href = "login.html";

// } catch(error){

// alert(error.message);

// }

// });