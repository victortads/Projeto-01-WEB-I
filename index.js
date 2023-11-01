let idx = 0;
let items = [];
let trash = document.getElementById("trash");
let buttons = document.getElementsByClassName("button");
let excluir = document.getElementsByClassName("excluir");
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
    if (products.length > 0) {
        for (let element = 0; element < products.length; element++) {
            html +=
                `<li> 
        <div class="product">
        <button class="excluir"><i class="fa-solid fa-x"></i></button>
        <img src="${products[element].src}"></img>
        <p id="name">${products[element].name}</p>
        <p id="price">R$ ${products[element].price}</p>
        <button id="${products[element].id}"class="button">Adicionar ao carrinho</button>
        </div>
        </li>`;
            document.getElementById("list").innerHTML = html;
        }
    } else {
        document.getElementById("list").innerHTML = html;
    }
}

addLi();

//Funçao que é acionada quando o button é clicado
function lidarComEventoDoButton(e) {
    product_cart.classList.add('displayNone');
    let b = e.target.parentNode.childNodes[5].innerText;
    items.push(b);
    let html_products = `<h1>Produtos no carrinho</h1>`;
    for (let n of items) {
        html_products += `<li>${n}</li>`;
        document.getElementById("product-cart").innerHTML = html_products;
    }
    idx++;
    addIdx();
}

function lidarComEventoDoExcluir(e) {
    let ref = e.target.parentNode.childNodes[5].innerText;
    console.log(ref);
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === ref) {
            products.splice(i, 1);
        }
        if (products.length == 0) {
            products = [];
        }
    }
    addLi();
    atualizarButtons();
    addButtonsListener();
    atualizarExcluir();
    addExcluirListener();
}

// Remove e depois adiciona os eventlisteners a os buttons
function addButtonsListener() {
    for (let a of buttons) {
        a.removeEventListener("click", lidarComEventoDoButton);
        a.addEventListener("click", lidarComEventoDoButton);
    }
}

function addExcluirListener() {
    for (let a of excluir) {
        a.removeEventListener("click", lidarComEventoDoExcluir);
        a.addEventListener("click", lidarComEventoDoExcluir);
    }
}

addButtonsListener();
addExcluirListener();

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
    product_cart.innerHTML = '<h1>Produtos no carrinho</h1>';
    rmIdx();
}

trash.addEventListener("click", () => apagaTudo());

function openForm() {
    product_cart.classList.remove('displayOn');
    product_cart.classList.add('displayNone');
    if (div_product.classList.contains('displayOn')) {
        div_form.classList.remove('displayNone');
        div_form.classList.add('displayOn');
        div_product.classList.remove('displayOn');
        div_product.classList.add('displayNone');
    } else {
        div_form.classList.remove('displayOn');
        div_form.classList.add('displayNone');
        div_product.classList.remove('displayNone');
        div_product.classList.add('displayOn');
    }
    addButtonsListener();
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
    products.push(product);
    addLi();
    atualizarButtons();
    addButtonsListener(); //Adiciona os listeners novamente
    atualizarExcluir();
    addExcluirListener();
});

//atualiza o array de buttons, para que os que foram adicionasdos depois tabem sejam mapeados
function atualizarButtons() {
    buttons = document.getElementsByClassName("button");
}

function atualizarExcluir() {
    excluir = document.getElementsByClassName("excluir");
}