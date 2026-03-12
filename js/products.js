import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

/* ===========================
GET ELEMENTS FROM HTML
=========================== */

const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");

/* ===========================
STORE PRODUCTS
=========================== */

let products = [];


/* ===========================
FETCH PRODUCTS FROM FIREBASE
=========================== */

async function getProducts() {

  const querySnapshot = await getDocs(collection(db, "products"));

  products = [];

  querySnapshot.forEach((productDoc) => {

    products.push({
      id: productDoc.id,
      ...productDoc.data()
    });

  });

  displayProducts(products);

}


/* ===========================
DISPLAY PRODUCTS
=========================== */

function displayProducts(productsArray) {

  productsContainer.innerHTML = "";

  productsArray.forEach((product) => {

    const productDiv = document.createElement("div");
    productDiv.classList.add("product-card");

    productDiv.innerHTML = `
      <div class="image-wrapper">
        <img src="${product.image || ''}" alt="${product.name}">
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="brand">${product.brand}</p>
        <p class="category">${product.category}</p>
        <p class="description">${product.description}</p>
        <p class="price">₦${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    const addToCartBtn = productDiv.querySelector(".add-to-cart");

    addToCartBtn.addEventListener("click", (e) => {

      e.stopPropagation(); // prevents product click

      addToCart(product);

    });


    /* ===========================
    CLICK PRODUCT → SINGLE PAGE
    =========================== */

    productDiv.addEventListener("click", () => {
      // console.log(product.id);
      window.location.href = `single.html?id=${product.id}`;
    });

    productsContainer.appendChild(productDiv);

  });

}


/* ===========================
SEARCH FUNCTION
=========================== */

if (searchInput) {

  searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchValue);
    });

    displayProducts(filteredProducts);

  });

}



function addToCart(product){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.id === product.id);

  if(existingProduct){

    existingProduct.quantity += 1;

  }else{

    cart.push({
      ...product,
      quantity: 1
    });

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart");

}





/* ===========================
RUN FUNCTION
=========================== */

getProducts();




// import { db } from "./firebase.js";
// import {
//   collection,
//   getDocs
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// const productsContainer = document.getElementById("products-container");

// async function getProducts() {
//   productsContainer.innerHTML = "";

//   const querySnapshot = await getDocs(collection(db, "products"));

//   querySnapshot.forEach((productDoc) => {
//     const product = productDoc.data();

//     const productDiv = document.createElement("div");
//     productDiv.classList.add("product-card");

//     productDiv.innerHTML = `
//       <div class="image-wrapper">
//         <img src="${product.image}" alt="${product.name}">
//       </div>

//       <div class="product-info">
//         <h3>${product.name}</h3>
//         <p class="brand">${product.brand}</p>
//         <p class="category">${product.category}</p>
//         <p class="description">${product.description}</p>
//         <p class="price">₦${product.price}</p>
//       </div>
//     `;

//     productsContainer.appendChild(productDiv);
//   });
// }

// getProducts();
