let idx = 0;
let items = [];
let lista = document.getElementById("list");
let trash = document.getElementById("trash");
let buttons = document.getElementsByClassName("button");
let cart = document.getElementById("cart");
let product_cart = document.getElementById("product-cart");
let div_product = document.getElementById("products");
let addItem = document.getElementById("addItem");
let div_form = document.getElementById("div-formulario");
let form = document.getElementById("formulario");

function addIdx() {
    let hmtl_num_products = `${idx}`;
    document.getElementById("num_products").innerText = hmtl_num_products;
}

function rmIdx() {
    idx = 0;
    let hmtl_num_products = `${idx}`;
    document.getElementById("num_products").innerText = hmtl_num_products;
}

function addLi() {
    let html = '';
    for (let element = 0; element < dados.length; element++) {
        html +=
            `<li> 
        <div class="product">
        <img src="${dados[element].src}"></img>
        <p id="name">${dados[element].name}</p>
        <p id="price">R$ ${dados[element].price}</p>
        <button id="${dados[element].id}"class="button">Adicionar ao carrinho</button>
        </div>
        </li>`;
        document.getElementById("list").innerHTML = html;
    }
}

addLi();

function addButton() {
    for (let a of buttons) {
        a.addEventListener("click", (e) => {
            product_cart.classList.add('displayNone');
            let b = e.target.parentNode.childNodes[3].innerText;
            items.push(b);
            let html_products = '';
            for (let n of items) {
                html_products += `<li>${n}</li>`;
                document.getElementById("product-cart").innerHTML = html_products;
            }
            idx++;
            addIdx();
        });
    }
}

addButton();


function listCart() {
    if (div_product.classList.contains('displayOn')) {
        product_cart.classList.remove('displayNone');
        product_cart.classList.add('displayOn');
        div_form.classList.remove('displayOn');
        div_form.classList.add('displayNone');

        if (div_product.classList.contains('displayOn')) {
            div_product.classList.remove('displayOn');
            div_product.classList.add('displayNone');
        } else {
            div_product.classList.add('displayNone');
        }
    } else {
        product_cart.classList.remove('displayOn');
        product_cart.classList.add('displayNone');
        div_product.classList.remove('displayNone');
        div_product.classList.add('displayOn');
        div_form.classList.remove('displayOn');
        div_form.classList.add('displayNone');
    }
}

cart.addEventListener("click", () => listCart());

function apagaTudo() {
    items = [];
    product_cart.innerHTML = '';
    rmIdx();
    product_cart.classList.remove('displayOn');
    product_cart.classList.add('displayNone');
    div_product.classList.remove('displayNone');
    div_product.classList.add('displayOn');
    div_form.classList.remove('displayOn');
    div_form.classList.add('displayNone');
}

trash.addEventListener("click", () => apagaTudo());

function openForm() {
    if (div_product.classList.contains('displayOn')) {
        div_form.classList.remove('displayNone');
        div_form.classList.add('displayOn');

        if (div_product.classList.contains('displayOn')) {
            div_product.classList.remove('displayOn');
            div_product.classList.add('displayNone');
        } else {
            div_product.classList.add('displayNone');
        }
    } else {
        div_form.classList.remove('displayOn');
        div_form.classList.add('displayNone');
        div_product.classList.remove('displayNone');
        div_product.classList.add('displayOn');
    }
    addButton();
}

addItem.addEventListener("click", () => openForm());

form.addEventListener('submit', (event) => {
    event.preventDefault()
    div_form.classList.remove('displayOn')
    let name = event.target.childNodes[5].value
    let price = event.target.childNodes[7].value
    let imgURL = event.target.childNodes[3].value

    let product = {
        "name": name,
        "price": price,
        "src": imgURL
    }
    dados.push(product);
    addLi();
});


