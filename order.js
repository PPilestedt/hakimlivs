const cartItems = document.querySelector(".total-count");
const cartSum = document.querySelector(".total-cart");
let itemsTotal = 0;
let priceTotal = 0;
console.log("Displaycart function")
const cartArray = JSON.parse( localStorage.getItem("cart"));
let output = document.getElementById('order-entries');

if(cartArray != null){
    cartArray.forEach(product => {
    itemsTotal += product.quantity;
    priceTotal += product.price*product.quantity;
        output += `<tr>
                    <td>
                        ${product.title}
                    </td>
                    <td>
                        ${product.price}
                    </td>
                    <td>
                        <div class="input-group">
                            <button class="minus-item btn input-group-addon btn-primary" data-id="${product.id}">-</button>
                            <input type="text" class="item-count form-control" data-id="${product.id}" value="${product.quantity}">
                            <button class="plus-item btn input-group-addon btn-primary" data-id="${product.id}">+</button>
                        </div>
                    </td>
                    <td>
                        <button class="delete-item btn btn-danger" data-id="${product.id}">X</button>
                    </td>
                    <td class="cart-item-sum">${(product.price * product.quantity).toFixed(2) } Kr
                    </td>
        </tr>`;
    });
}
cartItems.innerText = itemsTotal;
cartSum.innerText = priceTotal.toFixed(2) + " Kr";
$('.show-cart').html(output);

//eventListeners för cart item knappar
$(".minus-item").click(decreaseCartItem);
$(".plus-item").click(increaseCartItem);
$(".delete-item").click(removeCartItem);
$(".item-count").change(updateCartNumber);