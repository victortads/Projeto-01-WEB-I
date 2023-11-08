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
let submit = document.getElementById("submit");

addLi(); //Adiciono os items carregados do Array na página principal
addButtonsListener(); //Adiono as funções dos botões adicionar ao carrinho
addExcluirListener(); //Adiono as funções dos botões excluir produtos

cart.addEventListener("click", () => listCart());

trash.addEventListener("click", () => apagaTudo());

addItem.addEventListener("click", () => openForm());

// Usa uma função assíncrona para realizar a validação do formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    div_form.classList.remove('displayOn');
    let name = event.target.childNodes[5].value;
    let price = event.target.childNodes[7].value;
    let imgURL = event.target.childNodes[3].value;
    let idElement = products.length;
    let product = {
        "id" : idElement,
        "name": name,
        "price": price,
        "src": imgURL
    };

    if (await validateImg(imgURL) && await validateName(name) && await validateNum(price)) {
        products.push(product);
        document.getElementById("productImageUrl").value = '';
        document.getElementById("productName").value = '';
        document.getElementById("productPrice").value = '';
        addLi();
        atualizarButtons();
        addButtonsListener();
        atualizarExcluir();
        addExcluirListener();
    }

    div_form.classList.remove('displayOn');
    div_form.classList.add('displayNone');
    div_product.classList.remove('displayNone');
    div_product.classList.add('displayOn');
});
