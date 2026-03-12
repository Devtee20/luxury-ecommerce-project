const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart(){

cartContainer.innerHTML = "";

let total = 0;

cart.forEach((product,index)=>{

total += product.price * product.quantity;

const cartItem = document.createElement("div");

cartItem.innerHTML = `
<img src="${product.image}" width="200">

<h3>${product.name}</h3>

<p>₦${product.price}</p>

<p>Quantity: ${product.quantity}</p>

<button onclick="increaseQuantity(${index})">+</button>

<button onclick="decreaseQuantity(${index})">-</button>

<button onclick="removeItem(${index})">Remove</button>

`;

cartContainer.appendChild(cartItem);

});

cartTotal.innerText = total;

}

function increaseQuantity(index){

cart[index].quantity++;

updateCart();

}

function decreaseQuantity(index){

if(cart[index].quantity > 1){

cart[index].quantity--;

}

updateCart();

}

function removeItem(index){

cart.splice(index,1);

updateCart();

}

function updateCart(){

localStorage.setItem("cart", JSON.stringify(cart));

displayCart();

}

displayCart();