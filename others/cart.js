const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

function displayCart(){

const cart = JSON.parse(localStorage.getItem("cart")) || [];

cartContainer.innerHTML = "";

let total = 0;

if(cart.length === 0){
cartContainer.innerHTML = "<p>Your cart is empty</p>";
cartTotal.innerText = "0";
return;
}

cart.forEach((item,index)=>{

total += item.price * item.quantity;

const cartItem = document.createElement("div");

cartItem.classList.add("cart-item");

cartItem.innerHTML = `

<img src="${item.image}" width="80">

<div class="cart-info">
<h3>${item.name}</h3>

<p class="cart-price">₦${item.price * item.quantity}</p>

<div class="cart-qty">

<button class="decrease" data-index="${index}">-</button>

<span>${item.quantity}</span>

<button class="increase" data-index="${index}">+</button>

</div>

<button class="remove-btn" data-index="${index}">Remove</button>

</div>

`;

cartContainer.appendChild(cartItem);

});

cartTotal.innerText = total;

}

displayCart();



document.addEventListener("click", function(e){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(e.target.classList.contains("increase")){

const index = e.target.dataset.index;

cart[index].quantity += 1;

localStorage.setItem("cart", JSON.stringify(cart));

displayCart();

}

if(e.target.classList.contains("decrease")){

const index = e.target.dataset.index;

if(cart[index].quantity > 1){
cart[index].quantity -= 1;
}

localStorage.setItem("cart", JSON.stringify(cart));

displayCart();

}

if(e.target.classList.contains("remove-btn")){

const index = e.target.dataset.index;

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

displayCart();

}

});



const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

menuIcon.addEventListener("click", () => {

if(menu.style.display === "flex"){
menu.style.display = "none";
}else{
menu.style.display = "flex";
}

});



