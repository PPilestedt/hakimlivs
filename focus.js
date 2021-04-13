window.addEventListener("load", focus);


function focus() {
    let cards = document.getElementsByClassName("product-card");
    console.log("focus " + cards.length)
    console.log(cards)

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", exampleOnclick) 

   }

}


function exampleOnclick() {
    
    let title = this.getElementsByTagName("h4")[0].innerText;
    console.log(title)
    let image = this.getElementsByTagName("img")[0].src;
    console.log(image)
    let description = ""
    let price = ""

 /*     for (let index = 0; index < productsArray.length; index++) {
        //const element = array[index]; 
        
        if (productsArray[index].title == title) {
            image = productsArray[index].image;
            description = productsArray[index].description;
            price = productsArray[index].price;
        }
    } */  

    var exampleModal = getExampleModal();
  
    // Init the modal if it hasn't been already.
    if (!exampleModal) { exampleModal = initExampleModal(); }

  
    var html =`
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div class="product-img"><img src="${image}" alt="${title} "> </div>
        <div class="product-description"><p>${description}</p></div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>`
  
    setExampleModalContent(html);
  
    // Show the modal.
    jQuery(exampleModal).modal('show');
  
  }
  
  function getExampleModal() {
    return document.getElementById('exampleModal');
  }
  
  function setExampleModalContent(html) {
    getExampleModal().querySelector('.modal-content').innerHTML = html;
  }
  
  function initExampleModal() {
    var modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'exampleModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content"></div>' +
          '</div>';
    document.body.appendChild(modal);
    return modal;
  }
