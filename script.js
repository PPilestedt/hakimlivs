$(function(){

    

    let shoppingCart2 = [];
    loadProducts();
    displayCart();


    async function loadProducts(){
        await fetch("data/products.json")
                    .then(res=>res.json())
                    .then(products => {
                        displayAllProducts(products);
                    })
                    .catch(error => console.error(error));
                    
    }
                
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
        button.classList.add("add-to-cart");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.setAttribute("data-id",`${product.id}`);
        button.textContent = "Lägg till i varukorgen";
        
        button.addEventListener("click", function (e) {
            addToCart(product, quantityInput.value);
        });

        prodDescription.appendChild(quantityInput);
        prodDescription.appendChild(button);
        card.appendChild(prodDescription);
        
        return card;
    }

    function addToCart(product, quantity){
        
        console.log("add to cart");
        console.log(product);
        console.log(quantity);
        
        let cart = JSON.parse(localStorage.getItem("cart"));
        if(cart == null){
            cart = [];
        }
        
        product.quantity = Number(quantity);


        let cartContainsProduct = false;
        for (let index = 0; index < cart.length; index++) {
            if(cart[index].id == product.id){
                console.log("cart contains product");
                cartContainsProduct = true;
                cart[index].quantity += Number(product.quantity);
                if (cart[index].quantity > 99){
                    alert("Maxantal av en produkt är 99");
                    cart[index].quantity = 99;
                }
                break;
            }
        }
        if(!cartContainsProduct){
            console.log("cart did not contain product")
            cart.push(product);
        }

        localStorage.setItem("cart",JSON.stringify(cart));
        displayCart();
    
    }

    function displayCart() {
        const cartItems = document.querySelector(".total-count");
        const cartSum = document.querySelector(".total-cart");
        let itemsTotal = 0;
        let priceTotal = 0;
        console.log("Displaycart function")
        const cartArray = JSON.parse( localStorage.getItem("cart"));
        let output = "";
        
        cartArray.forEach(product => {
           itemsTotal += product.quantity;
           priceTotal += product.price*product.quantity;
            output += "<tr>"
            + "<td>" + product.title + "</td>" 
            + "<td>(" + product.price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + product.name + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + product.name + "' value='" + product.quantity + "'>"
            + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + product.name + ">+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + product.name + ">X</button></td>"
            + " = " 
            + "<td>" + (product.price * product.quantity).toFixed(2) + "</td>" 
            +  "</tr>";
        });
       
        cartItems.innerText = itemsTotal;
        cartSum.innerText = priceTotal;
        $('.show-cart').html(output);
        //$('.total-cart').html(shoppingCart.totalCart());
        //$('.total-count').html(shoppingCart.totalCount());
    }

    let minusButton = document.querySelector(".minus-item");
    let plusButton = document.querySelector(".plus-item");

    minusButton.addEventListener("click", function (e) {
        
    });

    plusButton.addEventListener("click", function (e) {
        addToCart(product, quantityInput.value);
    });


})