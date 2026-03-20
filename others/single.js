import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

/* ===========================
GET ELEMENTS
=========================== */

const loader = document.getElementById("loader");
const productDetails = document.getElementById("product-details");

/* ===========================
GET PRODUCT ID
=========================== */

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


/* ===========================
FETCH PRODUCT
=========================== */



async function getSingleProduct() {

  try {

    // ✅ SHOW LOADER
    loader.style.display = "flex";
    // productDetails.hidden = true;
    productDetails.style.display = "none";

    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      const product = docSnap.data();

      document.getElementById("product-image").src = product.image;
      document.getElementById("product-name").textContent = product.name;
      document.getElementById("product-brand").textContent = product.brand;
      document.getElementById("product-category").textContent = product.category;
      document.getElementById("product-description").textContent = product.description;
      document.getElementById("product-price").textContent = "₦" + product.price;

      // ✅ SHOW PRODUCT ONLY AFTER DATA LOADS
      // productDetails.hidden = false;

      setTimeout(() => {
        loader.style.display = "none";
        productDetails.style.display = "flex";
      }, 300); 

    } else {
      loader.innerText = "Product not found ❌";
    }

  } catch (error) {
    console.log(error);
    loader.innerText = "Error loading product ❌";
  }
      
}


getSingleProduct();
