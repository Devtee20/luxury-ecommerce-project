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
  document.getElementById("loader").style.display = "none"

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
        <span class = "read-more">Read more</span>
        <p class="price">₦${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    const addToCartBtn = productDiv.querySelector(".add-to-cart");

    addToCartBtn.addEventListener("click", (e) => {

      Toastify({
        text: "Product added to cart 🛒",
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "#372133",
      }).showToast();
      // alert("Product added to cart successfully")

      e.stopPropagation(); // prevents product click



      addToCart(product);

    });


    /* ===========================
    CLICK PRODUCT → SINGLE PAGE
    =========================== */

    productDiv.addEventListener("click", () => {

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


const searchIcon = document.querySelector(".search-icon");

if (searchIcon && searchInput) {

  searchIcon.addEventListener("click", () => {

    // show the hidden search box
    searchInput.style.display = "block";

    // focus cursor inside it
    searchInput.focus();

  });

}




function updateCartCount() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.quantity || 1;
  });

  document.getElementById("cart-count").innerText = totalItems;

}





function addToCart(product) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
    console.log('Product added to cart successfully');
  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

}


/* ===========================
RUN FUNCTION
=========================== */

getProducts();


document.addEventListener("click", function (e) {

  if (e.target.classList.contains("read-more")) {

    const desc = e.target.previousElementSibling;

    desc.style.webkitLineClamp = "unset";
    desc.style.overflow = "visible";

    e.target.style.display = "none";

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



