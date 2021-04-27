$(function() {

const cart = JSON.parse(localStorage.getItem("cart"));

displayCart();


function removeCartItem(event){
    const element = event.target;
    const productId = element.getAttribute("data-id");
    const cart = JSON.parse(localStorage.getItem("cart"));
    
    console.log("removeing from cart id " + productId);


    if(cart != null){
        for (let index = 0; index < cart.length; index++) {
            if(cart[index].id == productId){
                cart.splice(index,1);
                break;
            }
        }
    }
    
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function decreaseCartItem(event){

    const element = event.target;
    const productId = element.getAttribute("data-id");
    const cart = JSON.parse(localStorage.getItem("cart"));

    console.log("decreasing item with id " + productId);

    if(cart != null){
        for(let product of cart){
            if(product.id == productId && product.quantity > 1){
                if(product.quantity > 1){
                    product.quantity--;
                    break;
                }
            }
        }
    }

    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function increaseCartItem(event){
    const element = event.target;
    const productId = element.getAttribute("data-id");
    const cart = JSON.parse(localStorage.getItem("cart"));

    if(cart != null){
        for(let product of cart){
            if(product.id == productId && product.quantity < 99){
                product.quantity++;
            }
        }
    }

    document.getElementById("finish-checkout-btn-two").removeAttribute("disabled");
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function updateCartNumber(event){
    const element = event.target;
    const productId = element.getAttribute("data-id");
    const cart = JSON.parse(localStorage.getItem("cart"));
    let value = element.value;
    
    console.log("updating number from inputfield. product:" + productId);

    if (value.includes(".")) {
        alert("Felaktig inmatning");
        return;
    }

    if(value <= 99 && value >= 1){
        if(cart != null){
            for (let index = 0; index < cart.length; index++) {
                if(cart[index].id == productId){
                    cart[index].quantity = Number(value);
                    if (cart[index].quantity > 0) {
                        document.getElementById("finish-checkout-btn-two").removeAttribute("disabled");
                    }
                    break;
                }
            }
        }
    }else{
        alert("Felaktig inmatning");
    }

    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartSum = document.querySelector("#total-cart");
    let itemsTotal = 0;
    let priceTotal = 0;
    let productPrice = "";
    let totalPriceForProduct = "";
    console.log("Displaycart function")
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    let output = "";
    
    if(cartArray != null){
        
        cartArray.forEach(product => {
        itemsTotal += product.quantity;
        priceTotal += product.price*product.quantity;
        productPrice = product.price + " Kr";
        productPrice = productPrice.replace(".", ":");
        totalPriceForProduct = (product.price * product.quantity).toFixed(2) + " Kr";
        totalPriceForProduct = totalPriceForProduct.replace(".", ":");
            output += `<tr>
                        <td>
                            ${product.title}
                        </td>
                        <td>
                            ${productPrice}
                        </td>
                        <td>
                            <div class="input-group">
                                <button class="minus-item btn input-group-addon btn-primary checkout-left" data-id="${product.id}">-</button>
                                <input type="number" class="item-count form-control checkout-center" data-id="${product.id}" value="${product.quantity}">
                                <button class="plus-item btn input-group-addon btn-primary checkout-right" data-id="${product.id}">+</button>
                            </div>
                        </td>
                        <td>
                            <button class="delete-item btn btn-danger" data-id="${product.id}">X</button>
                        </td>
                        <td class="cart-item-sum">
                            ${totalPriceForProduct}
                        </td>
            </tr>`;
        
        });
    }
    document.getElementById('order-entries').innerHTML = output;
    cartSum.innerText = priceTotal.toFixed(2) + " Kr";
    cartSum.innerText = cartSum.innerText.replace(".", ":");
    
    disableButton();
    //eventListeners för cart item knappar
    $(".minus-item").click(decreaseCartItem);
    $(".plus-item").click(increaseCartItem);
    $(".delete-item").click(removeCartItem);
    $(".item-count").change(updateCartNumber);

}

function disableButton() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let amountEmpty = 0;
    if (cart == null || cart.length <= 0) {
        document.getElementById("finish-checkout-btn-two").setAttribute("disabled", "true");
        return;
    }
    for(let index = 0; index < cart.length; index++) {
        if (cart[index].quantity <= 0) {
            amountEmpty++;
        }
    }
    if (amountEmpty == cart.length) {
        document.getElementById("finish-checkout-btn-two").setAttribute("disabled", "true");
    }
}

    $("#userform").click(function(){
        let firstname = "Peter";
        let lastname = "Pilestedt";
        let address = "skojgatan";
        let zipcode = "12345";
        let city = "solna";
        let phone = "070-1234567";
        let email = "mailman@manmail.com";

        console.log("försöker posta");
        var postItem = localStorage.getItem("cart");
        $.ajax({
            url: 'http://localhost:8080/customer/add',
            data: JSON.stringify({
                firstname : `${firstname}`,
                lastname : `${lastname}`,
                address : `${address}`,
                zipcode : `${zipcode}`,
                city : `${city}`,
                phone : `${phone}`,
                email : `${email}`
            }),
            type: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
    });

    /**
     * Gathers information from the form and initiates the order
     * creation sequence.
     * 
     * 1. creating user
     * 2. adding an order to that user
     * 3. adding all the products in the cart to that order
     * 3. removing all items in current cart ( not done yet )
     * 
     */
    $("#postknapp").click(function(){
        
        console.log("klickade på submit i chechkout");

        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let address = document.getElementById("address").value;
        let zipcode = document.getElementById("zipcode").value;
        let city = document.getElementById("city").value;
        let phone = document.getElementById("phonenumber").value;
        let email = document.getElementById("email").value;
        let customerid;

        console.log("försöker posta");
 
        $.ajax({
            url: 'http://localhost:8080/customer/add',
            data: JSON.stringify({
                firstname : `${firstname}`,
                lastname : `${lastname}`,
                address : `${address}`,
                zipcode : `${zipcode}`,
                city : `${city}`,
                phone : `${phone}`,
                email : `${email}`}),
            type: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            success: function (msg) {
                let jsonUpdatedData = msg;
                customerid = jsonUpdatedData.id;
                console.log("Customerid " + customerid);
                console.log(`http://localhost:8080/order/add?customerID=${customerid}`);
                
                submitOrderWithCustomer(customerid);
              
            }
        });
    });

    /**
     * Creates an order with the specified customers id.
     * 
     * @param {The id of the customer} customerid 
     */
    function submitOrderWithCustomer(customerid){

        console.log("submitting order with customerid: " + customerid);

        $.ajax({
            url: `http://localhost:8080/order/add?customerID=${customerid}`,
            type: 'GET',
            success: function (msg) {
                let jsonUpdatedData = msg;
                let orderid = jsonUpdatedData.id;
                console.log("orderid " + orderid);

                let cartitems = JSON.parse(localStorage.getItem("cart"));

                cartitems.forEach(item => {
                    let productid = item.id;
                    let productQuantity = item.quantity;
                    submitProductsToOrder(orderid,productid,productQuantity);
                });
            }
        });

    }

    /**
     * Function that adds an product to the order specified.
     * 
     * @param {id of the order specified} orderid 
     * @param {the id of the product to be added to the order} productid 
     */
    function submitProductsToOrder(orderid, productid,quantity){

        console.log("saving productid: " + productid + " to order with id: " + orderid);

        $.ajax({
            url: `http://localhost:8080/order/addproducts?orderID=${orderid}&productID=${productid}&productQuantity=${quantity}`,
            type: 'GET',
            success: function (msg) {
                let jsonUpdatedData = msg;
                console.log(jsonUpdatedData);
            }
        });
    }

})