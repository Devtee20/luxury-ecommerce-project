const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

menuIcon.addEventListener("click", () => {

if(menu.style.display === "flex"){
menu.style.display = "none";
}else{
menu.style.display = "flex";
}

});



function updateCartCount(){

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let totalItems = 0;

cart.forEach(item=>{
totalItems += item.quantity;
});

document.getElementById("cart-count").innerText = totalItems;

}

// updateCartCount();
// const waitlistBtn = document.getElementById("waitlist-btn");
// const emailInput = document.getElementById("email-input");
// const message = document.getElementById("waitlist-message");

// waitlistBtn.addEventListener("click", function(){

// const emailValue = emailInput.value.trim();

// if(emailValue === ""){
// message.style.display = "block";
// message.style.color = "red";
// message.textContent = "Please enter your email.";
// return;
// }

// message.style.display = "block";
// message.style.color = "green";
// message.textContent = "You've successfully joined the waitlist! You will be notified when a new Luxora collection drops.";

// emailInput.value = "";

// });

