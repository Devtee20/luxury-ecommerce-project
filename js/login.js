import { auth } from "./firebase.js";

import { signInWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");


loginBtn.addEventListener("click", async () => {

  errorMessage.innerText = "";

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    window.location.href = "index.html";

  } catch (error) {
    if (
    error.code === "auth/invalid-credential" ||
    error.code === "auth/wrong-password"
  ) {

    errorMessage.innerText = "Incorrect email or password";

  } else if (error.code === "auth/invalid-email") {

    errorMessage.innerText = "Invalid email address";

  } else {

    errorMessage.innerText = error.message;

  }


  //   if (error.code === "auth/invalid-credential") {
  //   errorMessage.innerText = "Email not registered. Please sign up.";

  // } else if (error.code === "auth/wrong-password") {
  //   errorMessage.innerText = "Incorrect password";

  // } else if (error.code === "auth/invalid-email") {
  //   errorMessage.innerText = "Invalid email address";

  // } else {
  //   errorMessage.innerText = error.message;
  // }

  // if (
  //   error.code === "auth/wrong-password" ||
  //   error.code === "auth/invalid-credential"
  // ) {
  //   errorMessage.innerText = "Incorrect password";

  // } else if (error.code === "auth/user-not-found") {
  //   errorMessage.innerText = "User not found";

  // } else if (error.code === "auth/invalid-email") {
  //   errorMessage.innerText = "Invalid email address";

  // } else {
  //   errorMessage.innerText = error.message;
  // }
    

  }

});

