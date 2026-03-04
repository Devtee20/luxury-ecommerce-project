import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const productsContainer = document.getElementById("products-container");

async function getProducts() {
  productsContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach((productDoc) => {
    const product = productDoc.data();

    const productDiv = document.createElement("div");
    productDiv.classList.add("product-card");

    productDiv.innerHTML = `
      <div class="image-wrapper">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="brand">${product.brand}</p>
        <p class="category">${product.category}</p>
        <p class="description">${product.description}</p>
        <p class="price">₦${product.price}</p>
      </div>
    `;

    productsContainer.appendChild(productDiv);
  });
}

getProducts();
