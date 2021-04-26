let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);

function orderBekraftelse() {
    console.log(cartItems);
    let productContainer = document.querySelector(".produkter");
    let productTotal = document.querySelector(".totalt");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
                <td class="product-namn">${item.title}</td>
                <td class="product-price">${(item.price).toFixed(2).replace(".", ":")}</td>
                <td class="product-quantity">${item.quantity}</td>    
                <td class="product-total">${(item.quantity * item.price).toFixed(2).replace(".", ":")}</td>          
            </tr>           
            `
        });
    }
}

let totalDiv = document.querySelector(".total");
totalDiv.innerHTML = getTotal().replace(".", ":");

function getTotal() {
    let sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
        sum += parseFloat((cartItems[i].price).toFixed(2)) * parseInt(cartItems[i].quantity);
    }
    return sum.toFixed(2);
}
orderBekraftelse();
getTotal();

