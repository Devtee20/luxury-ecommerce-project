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

updateCartCount();