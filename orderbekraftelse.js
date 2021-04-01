function orderBekraftelse() {
    let cartItems = localStorage.getItem("cart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".test2");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
            <td class="product-id">${item.id}</td>
                <td class="product-namn">${item.title}</td>
                <td class="product-price">${item.price} kr</td>
                <td class="product-quantity">${item.quantity}</td>
                <td class="product-weight">${item.weight} kr</td>     
                <td class="product-total">${item.quantity * item.price} kr</td>     
            </tr>           
            `
        });
    }
}
orderBekraftelse();

