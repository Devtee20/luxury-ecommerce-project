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
      
      <h3>${product.name}</h3>
      <p>₦${product.price} x ${product.quantity}</p>
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

  let total = 0;

  cart.forEach(product => {
    total += product.price * product.quantity;
  });

  onAuthStateChanged(auth, async (user) => {

    if (!user) {
      alert("Please login before placing an order");
      window.location.href = "login.html";
      return;
    }

    try {

      await addDoc(collection(db, "orders"), {

        products: cart,
        total: total,
        userId: user.uid,
        timestamp: serverTimestamp()

      });

      alert("Order placed successfully");

      localStorage.removeItem("cart");

      window.location.href = "../index.html";

    } catch (error) {

      console.error(error);
      alert("Something went wrong");

    }

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
