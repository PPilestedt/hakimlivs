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
    console.log("Displaycart function")
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    let output = "";
    
    if(cartArray != null){
        
        cartArray.forEach(product => {
        itemsTotal += product.quantity;
        priceTotal += product.price*product.quantity;
            output += `<tr>
                        <td>
                            ${product.title}
                        </td>
                        <td>
                            ${product.price} Kr
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
                            ${(product.price * product.quantity).toFixed(2) } Kr
                        </td>
            </tr>`;
        
        });
    }
    document.getElementById('order-entries').innerHTML = output;
    cartSum.innerText = priceTotal.toFixed(2) + " Kr";
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

$("#postknapp").click(function(){
    console.log("försöker posta");
    var postItem = localStorage.getItem("cart");
    $.ajax({
        url: 'http://localhost:8080/api/addproduct',
        data: JSON.stringify({
        title: "Test Prodokt",
        description: "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
        stockInHand: 50,
        image: "https:\/\/picsum.photos\/500?random=19",
        price: 7.95,
        productprice: 4,
        category: "Tidskrifter",
        weight: 0.25}),
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
});


})