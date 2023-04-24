//adds ID '.add-cart' to variable carts
let carts = document.querySelectorAll('.add-cart');

//adds products to variable products
let products = [
    {
        name: 'HexTech GeForce RTX 4070',
        tag: 'rtx4070',
        price: 599.99,
        inCart: 0
    },
    {
        name: 'HexTech GeForce RTX 4070 Ti',
        tag: 'rtx4070Ti',
        price: 799.99,
        inCart: 0
    },
    {
        name: 'HexTech GeForce RTX 4080',
        tag: 'rtx4080',
        price: 1199.99,
        inCart: 0
    },
    {
        name: 'HexTech GeForce RTX 4090',
        tag: 'rtx4090',
        price: 1599.99,
        inCart: 0
    },
    {
        name: 'Hex Arc A380',
        tag: 'hex380',
        price: 129.99,
        inCart: 0
    },
    {
        name: 'Hex Arc A750',
        tag: 'hex750',
        price: 199.99,
        inCart: 0
    },
    {
        name: 'Hex Arc A770',
        tag: 'hex770',
        price: 349.99,
        inCart: 0
    },
    {
        name: 'Hex Radagon RX 7900 XT',
        tag: 'hexRad7900xt',
        price: 899.99,
        inCart: 0
    },
    {
        name: 'Hex Radagon RX 7900 XTX',
        tag: 'hexRad7900xtx',
        price: 999.99,
        inCart: 0
    },
    {
        name: 'Hex Core H5-13600K',
        tag: 'hexCoreH5',
        price: 319.99,
        inCart: 0
    },
    {
        name: 'Hex Core H9-13900K',
        tag: 'hexCoreH9',
        price: 589.99,
        inCart: 0
    },
    {
        name: 'HEX Sixzen 7 7800X3D',
        tag: 'hexSizen7800X3D',
        price: 449.99,
        inCart: 0
    },
    {
        name: 'HEX Sixen 9 7900X3D',
        tag: 'hexSizen7900X3D',
        price: 599.99,
        inCart: 0
    },
    {
        name: 'HEX Sizen 9 7950X3D',
        tag: 'hexSizen7950X3D',
        price: 699.99,
        inCart: 0
    },
    {
        name: 'Hexagon NFT',
        tag: 'hexGod',
        price: 999999.99,
        inCart: 0
    },
]


//This loop calculates how many products are on the website
for(let i = 0; i < carts.length; i++){
    //The addEventListener checks to see if you have clicked "add to cart" calls the functions bellow if you do.
    carts[i].addEventListener('click', () => {
        //Checks if the user is logged in before calling the functions
        if(localStorage.getItem('Login') === "true") {
            cartNumbers(products[i]);
            subCost(products[i]);
            tax();
            total();
            //If the user is not logged in, it tells the user the alert message bellow
        } else if(localStorage.getItem("Login") === "false") {
            alert("I'm sorry but you need to be logged in to do that.");
        }
    })
}

//Function that is called to provide a number next to cart by adding + 1 every time you click add to cart.
function cartNumbers(product){
    //Adds cartNumbers from local storage to the variable productNumbers
    let productNumbers = localStorage.getItem('cartNumbers');

    //Changes the productNumbers to an integer
    productNumbers = parseInt(productNumbers);

    //if there are product numbers, and you've pressed the add to cart button,
    if(productNumbers){
        //it adds a product number to cartNumbers.
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('cartSpan').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.getElementById('cartSpan').textContent = 1;
    }
    //calls the function setItems
    setItems(product);
}

//Loads cart from localStorage
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.getElementById('cartSpan').textContent = productNumbers;
    }
}

//This Function sets how many of a single or multiple items in your cart.
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //checks if cartItems is null
    if(cartItems != null) {
        //also checks if cartItems[product.tag] is undefined
        if(cartItems[product.tag] == undefined){
            //if undefined, it defines it from grabbing the product tag and assigning it to product
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        //Adds item to the cart for every time add to cart is pressed
        cartItems[product.tag].inCart += 1;
    } else {
        //if not null it sets the cart item to 1 through the product id
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    //Stringifies productInCart
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//This checks the subCost of the product and returns it as an integer.
function subCost(product){
    let subCartCost = localStorage.getItem('subCost');
    //checks if the subtotal is not null
    if(subCartCost != null)
    {
        subCartCost = parseInt(subCartCost);
        //takes the subtotal and the product price and adds them together and sets it to localStorage variable subCost.
        localStorage.setItem('subCost', subCartCost + product.price);
    } else {
        //if it is null it sets subCost as the product price.
        localStorage.setItem('subCost', product.price);
    }

}

//This checks the total tax of the cart.
function tax(){
    let subTotal = localStorage.getItem('subCost');
    let taxTotal = (0.06 * subTotal);

    //adds the total tax to the localStorage
    localStorage.setItem('taxTotal', taxTotal)
    console.log(taxTotal);
}

//This checks the total of the cart
function total(){
    let subTotal = localStorage.getItem('subCost');
    let taxTotal = (0.06 * subTotal);

    subTotal = parseFloat(subTotal);
    taxTotal = parseFloat(taxTotal);

    let totalCost = (subTotal + taxTotal)
    localStorage.setItem('totalCost', totalCost)
    console.log(totalCost);
}

function removeItem(tag) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem('totalCost');

    // Remove item from cartItems
    delete cartItems[tag];
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));

    // Update cart numbers and total cost
    localStorage.setItem('cartNumbers', productNumbers - cartItems[tag].inCart);
    localStorage.setItem('totalCost', cartCost - (cartItems[tag].price * cartItems[tag].inCart));
}


//displayCart displays the product that you have added to your cart.
function displayCart(){
    //Pulls the stored products and assigns it to cartItems
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //Assigns productContainer to class receiptProducts
    let productContainer = document.querySelector(".products");
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
               <ion-icon class="removeButton" name="close-circle"></ion-icon>
               <img src="../img/${item.tag}.png" class="picInCart">
               <span>${item.name}</span>
           </div>
           <div class="product-price">$${item.price}</div>
           <div class="product-quantity">
               <ion-icon class="decrease" name="chevron-down-circle-outline"></ion-icon>
               <span>${item.inCart}</span>
               <ion-icon class="increase" name="chevron-up-circle-outline"></ion-icon>
           </div>
           <div class="product-subtotal">
           $${item.inCart * item.price}</div>
           `
        });


        //Adds the subtotal, tax and total through adding html through the products class
        productContainer.innerHTML += `
            <div class="basketSubTotalContainer">
                <h4 class="basketSubTotalTitle">
                    Cart Sub Total
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
                <h4 class="basketSubTotalTitle">Cart Total</h4>
                <h4 class="basketSubTotal">$${totalCost}</h4>
            </div>
            `
    }
}

let removeButtons = document.querySelectorAll('.removeButton');

for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', () => {
        let tag = removeButtons[i].getAttribute('data-tag');
        removeItem(tag);
        location.reload();
    });
}


let checkoutSubmit = document.getElementById('check-out-form-submit');

//checks if checkoutSubmit is not null
if(checkoutSubmit != null) {
    //if not null then you can click the button
    checkoutSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = "../view/checkout.html"
    })
}



//calls functions onLoadCartNumbers and displayCart
onLoadCartNumbers();
displayCart();