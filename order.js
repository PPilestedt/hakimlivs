const cartArray = JSON.parse(localStorage.getItem("cart"));

let orderEntries = document.getElementById('order-entries');
let totalPrice = 0;


cartArray.forEach(product => {
    orderEntries.innerHTML +=
    "<tr>"
    + "<td>" + product.title + "</td>" 
    + "<td>(" + product.price + ")</td>"
    + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + product.name + ">-</button>"
    + "<input type='number' class='item-count form-control' data-name='" + product.name + "' value='" + product.quantity + "'>"
    + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + product.name + ">+</button></div></td>"
    + "<td><button class='delete-item btn btn-danger' data-name=" + product.name + ">X</button></td>"
    + " " 
    + "<td>" + (product.price * product.quantity).toFixed(2) + "</td>" 
    +  "</tr>";
    totalPrice += Number(product.quantity) * Number(product.price);
});

$('.show-cart').html(output);

let totalPriceLabel = document.getElementById("total-cart");
totalPriceLabel.innerHTML += totalPrice + "kr";