let idx = 0;
let items = [];
let trash = document.getElementById("trash");
let buttons = document.getElementsByClassName("button");
let excluir = document.getElementsByClassName("excluir");
let excluirItem = document.getElementsByClassName("excluirItem");
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
            <button class="excluir"><i class=s"fa-solid fa-x"></i> Excluir item</button>
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

//atualiza o array de buttons, para que os que foram adicionasdos depois tabem sejam mapeados
function atualizarButtons() {
    buttons = document.getElementsByClassName("button");
}

function atualizarExcluir() {
    excluir = document.getElementsByClassName("excluir");
}

function atualizarExcluirItem() {
    excluirItem = document.getElementsByClassName("excluirItem");
}

// FUNÇÕES DOS BUTTONS - ADICIONAR CARRINHO - EXCLUIR ITEM - APAGAR DO CARRINHO -
function lidarComEventoDoButton(e) {
    product_cart.classList.add('displayNone');
    let b = e.target.parentNode.childNodes[5].innerText;
    console.log(b);
    items.push(b);
    let html_products = `<h1>Produtos no carrinho</h1>`;
    for (let n of items) {
        html_products += `<li><div class="cart-item"><p>${n}</p>
        <button class="excluirItem"><i class="fa-solid fa-x"></i> Excluir item</button></div></li>`;
    }
    document.getElementById("product-cart").innerHTML = html_products;
    idx++;
    addIdx();
    atualizarExcluirItem();
    addExcluirItemListener();
}

function lidarComEventoDoExcluir(e) {
    let confirm = window.confirm("Deseja realmente excluir este item????");
    if (confirm) {
        let ref = e.target.parentNode.childNodes[5].innerText;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name === ref) {
                products.splice(i, 1);

            }
            if (products.length == 0) {
                products = [];
            }
        }
    }
    addLi();
    atualizarButtons();
    addButtonsListener();
    atualizarExcluir();
    addExcluirListener();
}

function lidarComEventoDoExcluirItem(e) {
    let ref = e.srcElement.parentNode.childNodes[0].innerText;
    for (let i = 0; i < products.length; i++) {
        if (items[i] === ref) {
            items.splice(i, 1);
        }
        if (items.length == 0) {
            items = [];
        }
    }
    if (idx > 0) {
        idx--;
        addIdx();
    }
    atualizarCart();
    atualizarExcluirItem();
    addExcluirItemListener();
}

// REINICIAR OS LISTENERS DOS BUTTONS
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

function addExcluirItemListener() {
    for (let a of excluirItem) {
        a.removeEventListener("click", lidarComEventoDoExcluirItem);
        a.addEventListener("click", lidarComEventoDoExcluirItem);
    }
}

addButtonsListener();
addExcluirListener();
addExcluirItemListener();

function listCart() {
    if (div_product.classList.contains('displayOn') && div_form.classList.contains('displayNone')) {
        product_cart.classList.remove('displayNone');
        product_cart.classList.add('displayOn');
        div_product.classList.remove('displayOn');
        div_product.classList.add('displayNone');
    } else {
        product_cart.classList.remove('displayOn');
        product_cart.classList.add('displayNone');
        div_product.classList.remove('displayNone');
        div_product.classList.add('displayOn');
    }

    if (div_form.classList.contains('displayOn')) {
        div_form.classList.remove('displayOn');
        div_form.classList.add('displayNone');
        div_product.classList.remove('displayOn');
        div_product.classList.add('displayNone');
        product_cart.classList.remove('displayNone');
        product_cart.classList.add('displayOn');
    }
    atualizarExcluirItem();
    addExcluirItemListener();
}

cart.addEventListener("click", () => listCart());


function atualizarCart() {
    let html_products = `<h1>Produtos no carrinho</h1>`;
    if (items.length >= 1) {
        for (let n of items) {
            html_products += `<li><div class="cart-item"><p>${n}</p><button class="excluirItem"><i class="fa-solid fa-x"></i> Excluir item</button></div></li>`;
            document.getElementById("product-cart").innerHTML = html_products;
        }
    } else {
        document.getElementById("product-cart").innerHTML = html_products;
    }
    atualizarExcluirItem();
    addExcluirItemListener();
}

function apagaTudo() {
    items = [];
    product_cart.innerHTML = '<h1>Produtos no carrinho</h1>';
    rmIdx();
}

trash.addEventListener("click", () => apagaTudo());

function openForm() {
    if (div_product.classList.contains('displayOn') && product_cart.classList.contains('displayNone')) {
        div_form.classList.remove('displayNone');
        div_form.classList.add('displayOn');
        div_product.classList.remove('displayOn');
        div_product.classList.add('displayNone');
    }
    else {
        div_form.classList.remove('displayOn');
        div_form.classList.add('displayNone');
        div_product.classList.remove('displayNone');
        div_product.classList.add('displayOn');
    }

    if (product_cart.classList.contains('displayOn')) {
        product_cart.classList.remove('displayOn');
        product_cart.classList.add('displayNone');
        div_product.classList.remove('displayOn');
        div_product.classList.add('displayNone');
        div_form.classList.remove('displayNone');
        div_form.classList.add('displayOn');
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
    addButtonsListener();
    atualizarExcluir();
    addExcluirListener();
});
