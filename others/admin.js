import { db } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  await addDoc(collection(db, "products"), {
    brand,
    category,
    description,
    image,
    name,
    price: Number(price)
  });

  form.reset();
  alert("Product Added Successfully");
});