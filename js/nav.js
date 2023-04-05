//Navigation bar for when the user is not logged in
const navBarNotLoggedIn= `
   <ul id="nav">
    <li class="navli"><a class="navA" href="../view/index.html">Home</a></li>
    <li class="navli"><a class="navA" href="../view/products.html">Store</a></li>
    <li class="navli" style="float:right"><a class="navA" href="../view/login.html">Login!</a></li>
   </ul>`

//Navigation bar for when the user is logged in
const navBarLoggedIn= `
   <ul id="nav">
    <li class="navli"><a class="navA" href="../view/index.html">Home</a></li>
    <li class="navli"><a class="navA" href="../view/aboutUs.html">About Us</a></li>
    <li class="navli"><a class="navA" href="../view/contactUs.html">Contact Us</a></li>
    <li class="navli"><a class="navA" href="../view/products.html">Store</a></li>
    <li class="navli cartli cart" style="float:right"><a class="navA" href="../view/cart.html"><ion-icon name="basket"></ion-icon>Cart<span id="cartSpan" class="cartli">0</span></a></li>
    <li class="navli" style="float:right"><a class="navA" href="../view/Logout.html">Logout!</a></li>
   </ul>`

//Checks if the user is logged in
function checkLogin() {

    //checks if Login is set to true in the localStorage
    if (localStorage.getItem("Login") === "true") {

        //if true, it sets the nav bar as logged in
        document.getElementById("mNav").insertAdjacentHTML("afterbegin", navBarLoggedIn);

        //checks if login is set to false in the localStorage
    } else if (localStorage.getItem("Login") === "false") {

        //if false, it sets the nav bar as not logged in
        document.getElementById("mNav").insertAdjacentHTML("afterbegin", navBarNotLoggedIn);
    }
}

//this function sets Login to false if Login is null
function setLoginFalse() {
    if (localStorage.getItem("Login") == null) {
        localStorage.setItem("Login", false)
    }
}

//calls functions
setLoginFalse();
checkLogin();






