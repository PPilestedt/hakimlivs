$(function(){

    let categoriesArray = [];
    let productsArray = [];
    
    loadProducts();
    loadCategories();
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

    function updateCartNumber(event){
        const element = event.target;
        const productId = element.getAttribute("data-id");
        const cart = JSON.parse(localStorage.getItem("cart"));
        let value = element.value;
        console.log("updating number from inputfield. product:" + productId);



        if(value <= 99 && value >= 0){
            if(cart != null){
                for (let index = 0; index < cart.length; index++) {
                    if(cart[index].id == productId){
                        cart[index].quantity = Number(value);
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
            productsArray.push(item);
            let card = displayProductsInCard(item);
            productContainer.appendChild(card);
        })
    }

    function displayProductsInCard(product) {
        let card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `<div class="product-img"><img src="${product.image}" alt="${product.title} "> </div>`;

        let prodDescription = document.createElement("div");
        prodDescription.className = "product-description";
        prodDescription.innerHTML =
            `<h4>${product.title}</h4>
            
            <h5>Pris: ${product.price} kr</h5>
            <br>`;
        // Minor surgery
        //<p>${product.description}</p>

        let quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = "1";
        quantityInput.min = "1";
        quantityInput.max = "99";
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

        if (quantity.includes(".")) {
            alert("Felaktig inmatning");
            return;
        }
        let productQuantity = parseInt(quantity);
        let cart = JSON.parse(localStorage.getItem("cart"));
        let productQuantity = parseInt(quantity);
        if(cart == null){
            cart = [];
        }
        
        if (productQuantity < 1) {
            alert("Minantal av en produkt är 1");
            return;
        } else if (productQuantity > 99) {
            alert("Maxantal av en produkt är 99");
            return;
        } 

        product.quantity = productQuantity;

        let cartContainsProduct = false;
        for (let index = 0; index < cart.length; index++) {
            if(cart[index].id == product.id){
                console.log("cart contains product");
                cartContainsProduct = true;
                cart[index].quantity += productQuantity;
                if (cart[index].quantity > 99){
                    alert("Maxantal av en produkt är 99");
                    cart[index].quantity = 99;
                }
                break;
            }
        }
        if(!cartContainsProduct){
            console.log("cart did not contain product");
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

    }

    async function loadCategories() {
        await fetch("data/categories.json")
                    .then(res=>res.json())
                    .then(categories => {
                         displayAllCategories(categories);
                     })
                    .catch(error => console.error(error));
                        
    }

    function displayAllCategories(categories) {
        let output = "";

        categories.forEach(category => {
            categoriesArray.push(category);
            output += "<a href='#' class='list-group-item'>" + category.name + "</a>"
        })
        $('.nav-category').html(output);

        output = "<ul class='navbar-nav ml-auto nav-dropdown'>"
        categories.forEach(category => {
            output += "<li><a href='#' class='list-group-item'>" + category.name + "</a></li>"
        })
        output += "</ul>"
        $('#navbarResponsive').html(output);
    }
})
