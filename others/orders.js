import { db, auth } from "./firebase.js";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


const ordersContainer = document.getElementById("orders-container");


onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc") // 🔥 newest first
    );

    const querySnapshot = await getDocs(q);

    ordersContainer.innerHTML = "";

    if (querySnapshot.empty) {
      ordersContainer.innerHTML = "<p>No orders yet</p>";
      return;
    }

    querySnapshot.forEach((doc) => {

      const order = doc.data();

      const orderDiv = document.createElement("div");
      orderDiv.classList.add("order-card");

      let itemsHTML = "";

      order.products.forEach((item) => {

        itemsHTML += `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <p>${item.name}</p>
              <p>₦${item.price} x ${item.quantity}</p>
            </div>
          </div>
        `;

      });

      const date = order.timestamp
        ? order.timestamp.toDate().toLocaleString()
        : "";

      orderDiv.innerHTML = `
        ${itemsHTML}
        <p class="order-total">Total: ₦${order.total}</p>
        <p class="order-date">${date}</p>
      `;

      ordersContainer.appendChild(orderDiv);

    });

  } catch (error) {
    console.log(error);
  }

});

const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

menuIcon.addEventListener("click", () => {

  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }

});



// import { db, auth } from "./firebase.js";

// import {
//   collection,
//   query,
//   where,
//   getDocs
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// import {
//   onAuthStateChanged
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// const ordersContainer = document.getElementById("orders-container");

// onAuthStateChanged(auth, async (user) => {

//   if (!user) {
//     window.location.href = "login.html";
//     return;
//   }

//   const q = query(
//     collection(db, "orders"),
//     where("userId", "==", user.uid)
//   );

//   const querySnapshot = await getDocs(q);

//   ordersContainer.innerHTML = "";

//   querySnapshot.forEach((doc) => {

//     const order = doc.data();

//     const div = document.createElement("div");

//     div.innerHTML = `
//       <h3>Total: ₦${order.total}</h3>
//       <p>Items: ${order.products.length}</p>
//       <hr>
//     `;

//     ordersContainer.appendChild(div);

//   });

// });








































// import { db, auth } from "./firebase.js";

// import {
// collection,
// query,
// where,
// getDocs
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


// const ordersContainer = document.getElementById("orders-container");


// async function getOrders(){

// const q = query(
// collection(db,"orders"),
// where("userId","==",auth.currentUser.uid)
// );

// const querySnapshot = await getDocs(q);

// ordersContainer.innerHTML = "";

// querySnapshot.forEach(doc=>{

// const order = doc.data();

// const orderDiv = document.createElement("div");

// orderDiv.innerHTML = `
// <h3>Total: ₦${order.total}</h3>
// <p>Items: ${order.products.length}</p>
// `;

// ordersContainer.appendChild(orderDiv);

// });

// }

// getOrders();