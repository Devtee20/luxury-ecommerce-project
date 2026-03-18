import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


const orderSummary = document.getElementById("order-summary");
const checkoutTotal = document.getElementById("checkout-total");
const placeOrderBtn = document.getElementById("place-order");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ===============================
DISPLAY CHECKOUT ITEMS
=============================== */

function displayCheckout() {

  let total = 0;

  orderSummary.innerHTML = "";

  cart.forEach(product => {

    total += product.price * product.quantity;

    const item = document.createElement("div");

    item.innerHTML = `
      
     <div class="checkout-item">

    <img src="${product.image}" alt="${product.name}">

    <div>
      <h3>${product.name}</h3>
      <p>₦${product.price} x ${product.quantity}</p>
    </div>

  </div>
    `;

    orderSummary.appendChild(item);

  });

  checkoutTotal.innerText = total;

}

displayCheckout();





/* ===============================
PLACE ORDER
=============================== */

placeOrderBtn.addEventListener("click", () => {

  placeOrderBtn.addEventListener("click", () => {

  // ===============================
  // GET USER INPUTS
  // ===============================
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  // ===============================
  // VALIDATION (THIS IS THE FIX)
  // ===============================
  if (!firstName || !lastName || !email || !phone || !address) {
    Toastify({
      text: "Please fill all contact information",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#CF9F77",
    }).showToast();
    // alert("Please fill all contact information before placing order");
    return; // 🚨 THIS STOPS EVERYTHING
  }

  // ===============================
  // CALCULATE TOTAL
  // ===============================
  let total = 0;

  cart.forEach(product => {
    total += product.price * product.quantity;
  });

  // ===============================
  // AUTH CHECK
  // ===============================
  onAuthStateChanged(auth, async (user) => {

    if (!user) {
      Toastify({
        text: "Please login before placing an order",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#372133",
      }).showToast();

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
      // alert("Please login before placing an order");
      // window.location.href = "login.html";
      return;
    }

    try {

      await addDoc(collection(db, "orders"), {

        products: cart,
        total: total,
        userId: user.uid,
        firstName,
        lastName,
        email,
        phone,
        address,
        timestamp: serverTimestamp()

      });

      Toastify({
        text: "Order placed successfully 🎉",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#FDD599",
      }).showToast();

      // alert("Order placed successfully");

      localStorage.removeItem("cart");

      window.location.href = "../index.html";

    } catch (error) {

      console.error(error);
      Toastify({
        text: "Something went wrong",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#9c756e",
      }).showToast();

    }

  });

});
});










































// import { db, auth } from "./firebase.js";

// import {
//     collection,
//     addDoc,
//     serverTimestamp
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


// const orderSummary = document.getElementById("order-summary");
// const checkoutTotal = document.getElementById("checkout-total");
// const placeOrderBtn = document.getElementById("place-order");

// let cart = JSON.parse(localStorage.getItem("cart")) || [];


// function displayCheckout() {

//     let total = 0;

//     orderSummary.innerHTML = "";

//     cart.forEach(product => {

//         total += product.price * product.quantity;

//         const item = document.createElement("div");

//         item.innerHTML = `
// <img src="${product.image}" width="200">
// <h3>${product.name}</h3>
// <p>₦${product.price} x ${product.quantity}</p>
// `;

//         orderSummary.appendChild(item);

//     });

//     checkoutTotal.innerText = total;

// }

// displayCheckout();


// placeOrderBtn.addEventListener("click", async () => {
//     console.log(auth.currentUser);
    
//     let total = 0;

//     cart.forEach(product => {
//         total += product.price * product.quantity;
//     });

//     try {

//         await addDoc(collection(db, "orders"), {
//             products: cart,
//             total: total,
//             userId: auth.currentUser.uid,
//             timestamp: serverTimestamp()

//         });

//         alert("Order placed successfully");

//         localStorage.removeItem("cart");

//         window.location.href = "index.html";

//     } catch (error) {

//         console.error(error);
//         alert("Something went wrong");

//     }

// });
