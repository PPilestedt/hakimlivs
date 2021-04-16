$(function(){

    let categoriesArray = [];
    let productsArray = []; 
    
    loadProducts();
    loadCategories();
    displayCart();

    /**
     * Receives an event from the eventListener and
     * then decreases the amount of the product by 1 in the cart in localStorage.
     * displayCart() is called in the end to refresh the cart in the browser.
     * 
     * @param {*} event 
     */

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

    /**
     * Receives an event from the eventListener and
     * then increases the amount of the product by 1 in the cart in localStorage.
     * displayCart() is called in the end to refresh the cart in the browser. 
     * 
     * @param {*} event 
    */
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

        document.getElementById("finish-checkout-btn").removeAttribute("disabled");
        localStorage.setItem("cart",JSON.stringify(cart));
        displayCart();
    }

    /**
     * Receives an event from the eventListener and
     * then removes the product from the cart in localStorage.
     * displayCart() is called in the end to refresh the cart in the browser. 
     * 
     * @param {*} event 
     */
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

    /**
     * Receives an event from the eventListener and
     * updates the cart with the value stored in the products corresponding
     * text-input field.
     * displayCart() is then called to update the cart in the browser.
     * 
     * @param {*} event 
     * @returns 
     */
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

    /**
     * Fetches the products of an predefined JSON-file
     * and then passes them along to the displayAllProducts() function.
     * All products are stored in global variable productsArray.
     * 
     */
    async function loadProducts(){
        await fetch("data/products.json")
                    .then(res=>res.json())
                    .then(products => {
                        productsArray = products;
                    })
                    .catch(error => console.error(error));

        displayAllProducts(productsArray);
    }
               
    /**
     * Receives a full list of products and then
     * sends them on to the displayProductsInCard to create the product cards.
     * The cards are then appended to the product container. 
     * 
     * @param {*} products 
     */
    function displayAllProducts(products) {
        let productContainer = document.getElementById("product-content");
        productContainer.innerHTML = "";

        products.forEach(item => {
            let card = displayProductsInCard(item);
            productContainer.appendChild(card);
        })
    }

    /**
     * Receives an product and creates 
     * a html layout with the product information.
     * 
     * @param {*} product contains one product and all its information
     * @returns the HTML code for a product card
     */
    function displayProductsInCard(product) {
        let card = document.createElement("div");
        card.className = "product-card"; //----------------------------------------------------------------------------
        card.innerHTML = `<div class="product-img"><img src="${product.image}" alt="${product.title} "> </div>`;

        let prodDescription = document.createElement("div");
        prodDescription.className = "product-description";
        prodDescription.innerHTML =
            `<h4>${product.title}</h4>
            
            <h5>Pris: ${product.price} kr</h5>
            <br>`;

        let inputGroup = document.createElement("div");
        inputGroup.className = "input-group";

        let minusButton = document.createElement("button");
        minusButton.classList.add("card-minus-item");
        minusButton.classList.add("btn");
        minusButton.classList.add("btn-primary");
        minusButton.setAttribute("data-id", `${product.id}`);
        minusButton.textContent = "-";
        minusButton.addEventListener("click", function(e) {
            quantityInput.value--;
        })

        let quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = "1";
        quantityInput.min = "1";
        quantityInput.max = "99";
        quantityInput.pattern = "[0-9]";

        let plusButton = document.createElement("button");
        plusButton.classList.add("card-plus-item");
        plusButton.classList.add("btn");
        plusButton.classList.add("btn-primary");
        plusButton.setAttribute("data-id",`${product.id}`);
        plusButton.textContent = "+";
        plusButton.addEventListener("click", function(e) {
            quantityInput.value++;
        })

        let button = document.createElement("button");
        button.classList.add("add-to-cart");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.setAttribute("data-id",`${product.id}`);
        button.textContent = "Lägg till i varukorgen";
        
        button.addEventListener("click", function (e) {
            addToCart(product, quantityInput.value);
        });

        inputGroup.appendChild(minusButton);
        inputGroup.appendChild(quantityInput);
        inputGroup.appendChild(plusButton);
        prodDescription.appendChild(inputGroup);
        prodDescription.appendChild(button);
        card.appendChild(prodDescription);
        
        return card;
    }

    /**
     * Aadds a product to the cart in localStorage withe the selected amount.
     * 
     * @param {*} product the product that will be added to the cart
     * @param {*} quantity the quantity of products entered in the product card field
     * @returns 
     */
    function addToCart(product, quantity){
        
        console.log("add to cart");
        console.log(product);
        console.log(quantity);

        if (quantity.includes(".") || quantity == '') {
            alert("Felaktig inmatning");
            return;
        }
        let productQuantity = parseInt(quantity);
        let cart = JSON.parse(localStorage.getItem("cart"));
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

        document.getElementById("finish-checkout-btn").removeAttribute("disabled");
        localStorage.setItem("cart",JSON.stringify(cart));
        displayCart();
    
    }

    /**
     * Loops through the cart in localStorage and then
     * replaces the html code in the cart modal. 
     * All eventlisteners in the cart-modal is also replaced.
     * 
     */
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
                output += `<tr class='cart-table'>
                            <td>
                                ${product.title}
                            </td>
                            <td>
                                ${product.price} Kr per artikel
                            </td>
                            <td class='break'>
                                <div class="input-group">
                                    <button class="minus-item btn input-group-addon btn-primary" data-id="${product.id}">-</button>
                                    <input type="number" class="item-count form-control" data-id="${product.id}" value="${product.quantity}">
                                    <button class="plus-item btn input-group-addon btn-primary" data-id="${product.id}">+</button>
                                </div>
                                
                            </td>
                            <td>
                                <button class="delete-item btn btn-danger" data-id="${product.id}">X</button>
                            </td>
                            <td class="cart-item-sum break">  
                               Totalt: ${(product.price * product.quantity).toFixed(2) } Kr
                            </td>
                </tr>`;
            });
        }
        cartItems.innerText = itemsTotal;
        cartSum.innerText = priceTotal.toFixed(2) + " Kr";
        $('.show-cart').html(output);
        disableButton();
        //eventListeners för cart item knappar
        $(".minus-item").click(decreaseCartItem);
        $(".plus-item").click(increaseCartItem);
        $(".delete-item").click(removeCartItem);
        $(".item-count").change(updateCartNumber);

    }

    /**
     * Loads all the categories from a JASON-file
     * and passes them along to the displayAllCategories() function 
     * 
     * */
    async function loadCategories() {
        await fetch("data/categories.json")
                    .then(res=>res.json())
                    .then(categories => {
                        categoriesArray = categories;
                     })
                    .catch(error => console.error(error));
        displayAllCategories(categoriesArray);                        
    }

    /**
     * receives a list of all the avaliable categories and 
     * creates the elements in the nav-list and the nav-dropdown
     * 
     * @param {*} categories is a full list of all the categories avaliable
     */

    function displayAllCategories(categories) {
        let output = `<div class="list-group-item navbar-button">Alla Produkter</div>`;

        categories.forEach(category => {
            output += `<div class="list-group-item navbar-button">${category.name}</div>`
        });
        $('.nav-category').html(output);

        output = `<ul class='navbar-nav ml-auto nav-dropdown'>
                    <li><div class="list-group-item navbar-button" data-toggle="collapse" data-target="#navbarResponsive">Alla Produkter</div></li>`;
        categories.forEach(category => {

            output += `<li><div class="list-group-item navbar-button" data-toggle="collapse" data-target="#navbarResponsive">${category.name}</div></li>`
            //output += "<li><a href='#' class='list-group-item'>" + category.name + "</a></li>"
        });
        output += "</ul>";
        
        $('#navbarResponsive').html(output);

        //adding eventhandler to navbar buttons
        $(".navbar-button").click(filterProductsByCategory);
        $("#searchbutton").click(filterProductsBySearch);
        $("#search-input").change(filterProductsBySearch);
    }

    /**
     * Filters products by category and sends array for rendering
     * to displayAllProducts.
     * 
     * @param {*} event the event triggerd by the navbutton
     * @returns 
     */

    function filterProductsByCategory(event){
        let selectedCategoryName = event.target.innerHTML;

        if(selectedCategoryName == "Alla Produkter"){
            displayAllProducts(productsArray);
            return;
        }

        let filteredProducts = [];
        productsArray.forEach(product => {
            if(product.category == selectedCategoryName){
                filteredProducts.push(product);
            }
        });
        displayAllProducts(filteredProducts);
    }

    function filterProductsBySearch(event) {
        let search = document.getElementById("search-input").value.toLowerCase();

        if (search === '') {
            displayAllProducts(productsArray);
            return;
        }

        let filteredProducts = [];
        productsArray.forEach(product => {
            if (product.title.toLowerCase().includes(search)) {
                filteredProducts.push(product);
            }
        });
        displayAllProducts(filteredProducts);
    }

    /**
     * Turns off the checkout button if the cart is empty
     * 
     * @returns 
     */
    function disableButton() {
        const cart = JSON.parse(localStorage.getItem("cart"));
        let amountEmpty = 0;
        if (cart == null || cart.length <= 0) {
            document.getElementById("finish-checkout-btn").setAttribute("disabled", "true");
            return;
        }
        for(let index = 0; index < cart.length; index++) {
            if (cart[index].quantity <= 0) {
                amountEmpty++;
            }
        }
        if (amountEmpty == cart.length) {
            document.getElementById("finish-checkout-btn").setAttribute("disabled", "true");
        }
    }

//--------------------------------------------------------------------------------------------------------

/**Hämtar alla produktkort och lägger en eventlistener på dem */
initFocus()
function initFocus() {
    let cards = document.getElementsByClassName("product-card");

    if (!productsArray.length == 0) {

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", focusOnclick) 
   }
      } else {
        setTimeout(initFocus, 100); // kör igen efter 100 ms om det behövs
      } 
}

/**Hittar title och går igenom produktsarray och sätter rästen av värdena, utom lagerstarus */
function focusOnclick() {
    
    let title = this.getElementsByTagName("h4")[0].innerText.trim();
    let description = ""
    let image = ""
    let price = ""
    let productprice = ""
    let category = ""
    let pricecomparison = ""
    let weight = ""

    for (let i = 0; i < productsArray.length; i++) {
        
        if (productsArray[i].title.trim() == title) {
            description = productsArray[i].description
            image = productsArray[i].image
            price = productsArray[i].price
            productprice = productsArray[i].productprice
            category = productsArray[i].category
            pricecomparison = productsArray[i].pricecomparison.toFixed(2)
            weight = productsArray[i].weight + " kg"

            if (parseFloat(weight) < 1) {
                weight = parseFloat(weight) * 1000;
                weight += " g";
            }
        }
    }

    let exampleModal = getFocusModal();
  
    // Initierar modalen om det behövs
    if (!exampleModal) { exampleModal = initFocusModal(); }

  
    let html =`
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        </div>
        <div class="modal-body">
        <div class="product-img rounded" id="focusImg"><img src="${image}" alt="${title} "> </div>
        <div class="product-description text-justify"><p>Beskrivning: ${description}</p></div>
        <div class="product-description"><h5>Pris: ${price} kr</h5></div>
        <div class="product-description"><h5>Kategori: ${category}</h5></div>
        <div class="product-description"><h5>Vikt: ${weight}</h5></div>
        <div class="product-description"><h5>Jämförelsepris: ${pricecomparison} kr</h5></div>
        <div class="product-description"><h5>I lager: Lagestatus här sen</h5></div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Stäng</button>
        </div>`
  
    setFocusModalContent(html);
  
    // visar modalen
    jQuery(exampleModal).modal('show');
  
  }
  
  function getFocusModal() {
    return document.getElementById('exampleModal');
  }
  
  function setFocusModalContent(html) {
    getFocusModal().querySelector('.modal-content').innerHTML = html;
  }
  // initierar diven som är modalen
  function initFocusModal() {
    var modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'exampleModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
          '<div class="modal-dialog modal-dialog-centered" role="document">' +
            '<div class="modal-content"></div>' +
          '</div>';
    document.body.appendChild(modal);
    return modal;
  }

})




