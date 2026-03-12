import { db, auth } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const ordersContainer = document.getElementById("orders-container");


async function getOrders(){

const q = query(
collection(db,"orders"),
where("userId","==",auth.currentUser.uid)
);

const querySnapshot = await getDocs(q);

ordersContainer.innerHTML = "";

querySnapshot.forEach(doc=>{

const order = doc.data();

const orderDiv = document.createElement("div");

orderDiv.innerHTML = `
<h3>Total: ₦${order.total}</h3>
<p>Items: ${order.products.length}</p>
`;

ordersContainer.appendChild(orderDiv);

});

}

getOrders();