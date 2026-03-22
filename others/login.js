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


    if (emailValue === "") {
        errorMessage.textContent = "Please enter your email address";
        return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        errorMessage.textContent = "Please enter a valid email address";
        return;
    }


    if (passwordValue === "") {
        errorMessage.textContent = "Please enter your password";
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, emailValue, passwordValue);


        window.location.href = "../index.html";

    }

    catch (error) {

        if (error.code === "auth/user-not-found") {
            errorMessage.textContent = "User not found";
        }

        else if (error.code === "auth/wrong-password") {
            errorMessage.textContent = "Incorrect password";
        }

        else if (error.code === "auth/invalid-email") {
            errorMessage.textContent = "Please enter a valid email address";
        }

        else {
            errorMessage.textContent = "Login failed. Please try again";
        }

    }
    // catch(error){


    //       if(error.code === "auth/email-already-in-use"){
    //         errorMessage.textContent = "Email already in use. Please use another email.";
    //     }

    //     else if(error.code === "auth/invalid-mail"){
    //       error.errorMessage.textContent = "please enter a valid address"
    //     }

    //      else if(error.code === "auth/weak-password"){
    //       error.errorMessage.textContent = "password should be at least 6 characters"
    //     }

    //     else{
    //         errorMessage.textContent = "sign up failed! please try again later";
    //     }



    // }



});


