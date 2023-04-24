//Variables for the checkout form
let fName = document.getElementById("firstName");
let lName = document.getElementById("lastName");
let email = document.getElementById("email");
let address = document.getElementById("address");
let address2 = document.getElementById("address2");
let city = document.getElementById("city");
let state = document.getElementById("state");
let zip = document.getElementById("zipcode");

//Variables for the Receipt form
let pName = document.getElementById("pName");
let toName = document.getElementById("toName");
let toEmail = document.getElementById("toEmail");
let toAddress = document.getElementById("toAddress");
let toAddress2 = document.getElementById("toAddress2");
let toCityStateandZip = document.getElementById("toCityStateandZip");

let goBack = document.getElementById("goBack");
let checkBtn = document.getElementById("checkOutButton")

//Caused a null error when not in if statement
if (checkBtn != null) {
    //Listens for the checkout button, once clicked, it puts all the inputted info into localStorage.
    checkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        location.href = "../view/receipt.html"
        localStorage.setItem("firstName", fName.value);
        localStorage.setItem("lastName", lName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("address", address.value);
        localStorage.setItem("address2", address2.value)
        localStorage.setItem("city", city.value);
        localStorage.setItem("state", state.value);
        localStorage.setItem("zip", zip.value);
    })
}

//Functionality for the go back button on the checkout page
if (goBack != null) {
    goBack.addEventListener("click", (e) => {
        e.preventDefault();
        location.href = "../view/cart.html"
    })
}
//This function sends all the locally stored data to the receipt page.
function checkToReceipt() {
    pName.innerHTML = `<div>${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}!</div>`
    toName.innerHTML = `<div>${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}</div>`
    toEmail.innerHTML = `<div>${localStorage.getItem("email")}</div>`
    toAddress.innerHTML = `<div>${localStorage.getItem("address")}</div>`
    toAddress2.innerHTML = `<div>${localStorage.getItem("address2")}</div>`
    toCityStateandZip.innerHTML = `<div>${localStorage.getItem("city")}, ${localStorage.getItem("state")} ${localStorage.getItem("zip")}`
}


//Displays the products, tax, and total cost to the receipt page.
function displayReceipt(){
    //Pulls the stored products and assigns it to cartItems
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //Assigns productContainer to class receiptProducts
    let productContainer = document.querySelector(".receiptProducts");
    //Assigns the subtotal to subCartCost
    let subCartCost = localStorage.getItem('subCost');
    //Multiplies subCartCost with 0.06 to taxTotal for 6% tax.
    let taxTotal = (0.06 * subCartCost);

    //Tuns the subtotal and tax into a float.
    subCartCost = parseFloat(subCartCost);
    taxTotal = parseFloat(taxTotal);
    taxTotal = Number(taxTotal.toFixed(2));

    //Checks that there are items to put into the cart
    let totalCost = (subCartCost + taxTotal)
    totalCost = Number(totalCost.toFixed(2));

    //Checks that there are items to put into the cart
    if( cartItems && productContainer){
        //adds items to the cart via an array
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
           <div class="product">
               <span>${item.name}</span>
           </div>
           <div class="product-price">$${item.price}</div>
           <div class="product-quantity">
               <span>${item.inCart}</span>
           </div>
           <div class="product-subtotal">
           $${item.inCart * item.price}</div>
           `
        });

        //Adds the subtotal, tax and total through adding html through the receiptProducts class
        productContainer.innerHTML += `
            <div class="basketSubTotalContainer">
                <h4 class="basketSubTotalTitle">
                    Sub Total
                </h4>
                <h4 class="basketSubTotal">
                    $${subCartCost}</h4>
            </div>
            
            <div class="basketTaxContainer">
            <h4 class="basketTaxTitle">
            Tax</h4>
            <h4 class="basketTax">$${taxTotal}</h4>
            </div>
            
            <div class="basketSubTotalContainer">
                <h4 class="basketSubTotalTitle">Total</h4>
                <h4 class="basketSubTotal">$${totalCost}</h4>
            </div>
            `
    }
}

//Calls both functions checkToReceipt and displayReceipt
checkToReceipt();
displayReceipt();