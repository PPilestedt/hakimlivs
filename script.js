$(function(){

    

    let shoppingCart2 = [];
    loadProducts();
    displayCart();

    function decreaseCartItem(event){

        const element = event.target;
        const productId = element.getAttribute("data-id");
        const cart = JSON.parse(localStorage.getItem("cart"));

        console.log("decreasing item with id " + productId);

        if(cart != null){
            for(let product of cart){
                if(product.id == productId && product.quantity > 0){
                    if(product.quantity > 0){
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

        localStorage.setItem("cart",JSON.stringify(cart));
        displayCart();
    }

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
                                    <input type="number" class="item-count form-control" data-id="${product.id}" value="${product.quantity}">
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

    }

 

   // minusButton.addEventListener("click", function (e) {
        
    //});

   // plusButton.addEventListener("click", function (e) {
    //    addToCart(product, quantityInput.value);
    //});


})