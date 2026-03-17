import { auth } from "./firebase.js";

import { signInWithEmailAndPassword } from 
"https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");


loginBtn.addEventListener("click", async () => {

  const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // 1️⃣ Email empty
    if(emailValue === ""){
        errorMessage.textContent = "Please enter your email address";
        return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(emailValue)){
        errorMessage.textContent = "Please enter a valid email address";
        return;
    }

    // 2️⃣ Password empty
    if(passwordValue === ""){
        errorMessage.textContent = "Please enter your password";
        return;
    }

    try{

        await signInWithEmailAndPassword(auth, emailValue, passwordValue);

        // Login success
        window.location.href = "../index.html";

    }catch(error){

        // 3️⃣ Wrong credentials
        errorMessage.textContent = "Credentials incorrect";

    }

  // errorMessage.innerText = "";

  // try {

  //   await signInWithEmailAndPassword(
  //     auth,
  //     email.value,
  //     password.value
  //   );

  //   window.location.href = "index.html";

  // } catch (error) {
  //   if (
  //   error.code === "auth/invalid-credential" ||
  //   error.code === "auth/wrong-password"
  // ) {

  //   errorMessage.innerText = "Incorrect email or password";

  // } else if (error.code === "auth/invalid-email") {

  //   errorMessage.innerText = "Invalid email address";

  // } else {

  //   errorMessage.innerText = error.message;

  // }

  // }

});

