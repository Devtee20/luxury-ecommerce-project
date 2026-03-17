import { auth } from "./firebase.js";

import { createUserWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const errorMessage = document.getElementById("error-message");

signupBtn.addEventListener("click", async () => {

  
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
  
          await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
  
          // Login success
          window.location.href = "../index.html";
  
      }catch(error){
     
        if(error.code === "auth/email-already-in-use"){
            errorMessage.textContent = "Email already in use. Please use another email.";
        }

        else if(error.code === "auth/invalid-mail"){
          error.errorMessage.textContent = "please enter a valid address"
        }

         else if(error.code === "auth/weak-password"){
          error.errorMessage.textContent = "password should be at least 6 characters"
        }

        else{
            errorMessage.textContent = "sign up failed! please try again later";
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