let shoppingCart = [];

fetch("data/products.json")
            .then(res=>res.json())
            .then(products => {
                displayAllProducts(products);
            })
            .catch(error => console.error(error));


function displayAllProducts(products) {
    let productContainer = document.getElementById("product-content");

    products.forEach(item => {
        let card = DisplayProductsInCard(item);
        productContainer.appendChild(card);
    })
}

function DisplayProductsInCard(product) {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<div class="product-img"><img src="${product.image}" alt="${product.title} " height="200"> </div>`;

    let prodDescription = document.createElement("div");
    prodDescription.className = "product-description";
    prodDescription.innerHTML =
        `<h3>${product.title}</h3>
        <p>${product.description}</p>
        <h4>Pris: ${product.price} kr</h4>
        <br>`;

    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = "1";
    quantityInput.min = "1";
    quantityInput.pattern = "[0-9]";

    let button = document.createElement("button");
    button.textContent = "Lägg till i varukorgen";
    button.addEventListener("click", function (e) {
        addToCart(product, quantityInput.value);
    });

    prodDescription.appendChild(quantityInput);
    prodDescription.appendChild(button);
    card.appendChild(prodDescription);
    
    return card;
}
