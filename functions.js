// Adiciona um índice para a quantidade de items no carrinho
function addIdx() {
    let hmtl_num_products;
    if (idx == 0) {
        hmtl_num_products = '';
    } else {
        hmtl_num_products = `${idx}`
    }
    document.getElementById("num_products").innerText = hmtl_num_products;
}

// Zera o índice para a quantidade de items no carrinho
function rmIdx() {
    idx = 0;
    let hmtl_num_products = '';
    document.getElementById("num_products").innerText = hmtl_num_products;
}

// Atualiza os items no carrinho
function atualizarElementsCart() {
    let html_products = `<h1>Produtos no carrinho</h1>`;
    let numItem = [];

    //Compara quantos items com o mesmo nome existem no array
    for (let item of items) {
        if (!numItem[item]) {
            numItem[item] = 1;
        } else {
            numItem[item] += 1;
        }
    }

    // Insere esses items no carrinho com a quantidade de repetições dos mesmos
    for (let item in numItem) {
        html_products += `<li><div class="cart-item"><p>${item}</p><p>Unidades: ${numItem[item]}</p>
    <button class="excluirItem"><i class="fa-solid fa-x"></i> Excluir item</button></div></li>`;
    }
    document.getElementById("product-cart").innerHTML = html_products;
}

// Adiciona na página principal os items carregados do array
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

// Lida com o evendo do botão para adicionar item ao carrinho
function lidarComEventoDoButton(event) {
    product_cart.classList.add('displayNone');
    // Recebo a origem do evento e busco o nome do produto
    let ref = event.target.parentNode.childNodes[5].innerText;

    items.push(ref);

    // Realizo o tratamento necessário para atualizar os itens
    atualizarElementsCart();
    idx++;
    addIdx();
    atualizarExcluirItem();
    addExcluirItemListener();
}

// Lidar com o evento de excluir itens da página principal e do array de produtos
function lidarComEventoDoExcluir(event) {
    let confirm = window.confirm("Deseja realmente excluir este item????");
    if (confirm) {
        // Busco a origem do evento e retorno o nome do produto
        let ref = event.target.parentNode.childNodes[5].innerText;
        // irei fazer uma busca sequencial e remover o primeiro item com o mesmo nome da variável ref
        for (let i = 0; i < products.length; i++) {
            if (products[i].name === ref) {
                products.splice(i, 1);
                break;
            }
            if (products.length == 0) {
                products = [];
            }
        }
    }
    // Atualizo as funções após a remoção 
    addLi();
    atualizarButtons();
    addButtonsListener();
    atualizarExcluir();
    addExcluirListener();
}

//Realizar a retirada de elementos do array de itens no carrinho
function lidarComEventoDoExcluirItem(event) {
    let ref = event.target.parentNode.childNodes[0].innerText;
    for (let i = 0; i < items.length; i++) {
        // irei fazer uma busca sequencial e remover o primeiro item com o mesmo nome da variável ref
        if (items[i] === ref) {
            items.splice(i, 1);
            // Decremento o índice e altero no elemento que mostra a quantidade de itens no carrinho
            if (idx > 0) {
                idx--;
                addIdx();
            }
            break;
        }
        if (items.length == 0) {
            items = [];
        }
    }
    atualizarCart();
    atualizarExcluirItem();
    addExcluirItemListener();
}

//Adiciono a função novamente para cada item buscando evitar a duplicação
function addButtonsListener() {
    for (let a of buttons) {
        a.removeEventListener("click", lidarComEventoDoButton);
        a.addEventListener("click", lidarComEventoDoButton);
    }
}

//Adiciono a função novamente para cada item buscando evitar a duplicação
function addExcluirListener() {
    for (let a of excluir) {
        a.removeEventListener("click", lidarComEventoDoExcluir);
        a.addEventListener("click", lidarComEventoDoExcluir);
    }
}

//Adiciono a função novamente para cada item buscando evitar a duplicação
function addExcluirItemListener() {
    for (let a of excluirItem) {
        a.removeEventListener("click", lidarComEventoDoExcluirItem);
        a.addEventListener("click", lidarComEventoDoExcluirItem);
    }
}

//Atualizo a referência dos botões
function atualizarButtons() {
    buttons = document.getElementsByClassName("button");
}

//Atualizo a referência dos botões de excluir itens
function atualizarExcluir() {
    excluir = document.getElementsByClassName("excluir");
}

//Atualizo a referência dos botões de excluir itens do carrinho
function atualizarExcluirItem() {
    excluirItem = document.getElementsByClassName("excluirItem");
}

// Função de listar o carrinho usando as propriedades de display none
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
}

// Atualiza o carrinho
function atualizarCart() {
    if (items.length >= 1) {
        atualizarElementsCart();
    } else {
        document.getElementById("product-cart").innerHTML = '<h1>Produtos no carrinho</h1>';
    }
}

// Apaga todos os itens do carrinho zerando o array 
function apagaTudo() {
    items = [];
    atualizarCart();
    rmIdx();
}

// Função que abre o formulário utilizando a propriedade display none
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
}

// Função que irá fazer a validação da imagem com as propriedades onload e onerror
function validateImg(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = function () {
            if (img.width === 0) {
                alert("Imagem sem tamanho. Width = " + img.width);
                reject(false);
            } else {
                resolve(true);
            }
        };
        img.onerror = function () {
            alert("Imagem não foi carregada");
            reject(false);
        };
    });
}

// Realiza a validação do nome buscando se o tamanho > 0
function validateName(name) {
    return new Promise((resolve, reject) => {
        if (name.length) {
            resolve(true);
        } else {
            alert("Nome vazio. Por favor, insira um nome!");
            reject(false);
        }
    });
}

// Realiza a validação do número transformando em inteiro e verificando se é válido e maior que 0
function validateNum(num) {
    return new Promise((resolve, reject) => {
        let number = parseInt(num);
        if (number >= 0) {
            resolve(true);
        }
        if (number < 0) {
            alert("Número inserido é menor que 0. Por favor, insira um número válido");
            reject(false);
        }
    });
}