/* ==========================================
   CASA DO CAMARÃO
   SCRIPT.JS
========================================== */


/* ==========================================
   CONFIGURAÇÕES
========================================== */

const WHATSAPP = "5548991797448";


/* ==========================================
   PRODUTOS
========================================== */

const produtos = [

    /* =====================
       PEIXES
    ===================== */

    {
        id: 1,
        nome: "Salmão",
        categoria: "peixes",
        preco: 90,
        unidade: "kg",
        imagem: "fotos/salmão.jpg"
    },

    {
        id: 2,
        nome: "Filé de Tilápia",
        categoria: "peixes",
        preco: 48,
        unidade: "kg",
        imagem: "fotos/tilapa.jpeg"
    },

    {
        id: 3,
        nome: "Filé de Linguado",
        categoria: "peixes",
        preco: 45,
        unidade: "kg",
        imagem: "fotos/linguado.jpg"
    },

    {
        id: 4,
        nome: "Filé de Pescada",
        categoria: "peixes",
        preco: 30,
        unidade: "kg",
        imagem: "fotos/pescada.jpg"
    },

    {
        id: 5,
        nome: "Filé de Anchova",
        categoria: "peixes",
        preco: 28,
        unidade: "kg",
        imagem: "fotos/anchova.jpg"
    },

    {
        id: 6,
        nome: "Filé de Abrótea",
        categoria: "peixes",
        preco: 38,
        unidade: "kg",
        imagem: "fotos/brota.jpg"
    },


    /* =====================
       CAMARÕES
    ===================== */

    {
        id: 7,
        nome: "Camarão P Sete-Barbas",
        categoria: "camaroes",
        preco: 45,
        unidade: "kg",
        imagem: "fotos/sete barba.jpg"
    },

    {
        id: 8,
        nome: "Camarão Vanmei Rosa",
        categoria: "camaroes",
        preco: 80,
        unidade: "kg",
        imagem: "fotos/rosa.webp"
    },

    {
        id: 9,
        nome: "Camarão Cinza G",
        categoria: "camaroes",
        preco: 85,
        unidade: "kg",
        imagem: "fotos/cinza m.jpg"
    },

    {
        id: 10,
        nome: "Camarão GG Rosa com Cola",
        categoria: "camaroes",
        preco: 95,
        unidade: "kg",
        imagem: "fotos/cola.jpg"
    },

    {
        id: 11,
        nome: "Camarão GG Cinza",
        categoria: "camaroes",
        preco: 110,
        unidade: "kg",
        imagem: "fotos/cinza gggg.jpg"
    }

];


/* ==========================================
   OPÇÕES DE PESO
========================================== */

const pesos = [

    {
        valor: 0.25,
        nome: "250 g"
    },

    {
        valor: 0.5,
        nome: "500 g"
    },

    {
        valor: 0.75,
        nome: "750 g"
    },

    {
        valor: 1,
        nome: "1 kg"
    },

    {
        valor: 1.5,
        nome: "1,5 kg"
    },

    {
        valor: 2,
        nome: "2 kg"
    }

];


/* ==========================================
   ESTADO DO SITE
========================================== */

let categoriaAtual = "todos";

let buscaAtual = "";

let carrinho = carregarCarrinho();


/* ==========================================
   ELEMENTOS HTML
========================================== */

const productGrid =
    document.getElementById("productGrid");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const cartToggle =
    document.getElementById("cartToggle");

const closeCart =
    document.getElementById("closeCart");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const searchToggle =
    document.getElementById("searchToggle");

const searchPanel =
    document.getElementById("searchPanel");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const mobileToggle =
    document.getElementById("mobileToggle");

const mobileNav =
    document.getElementById("mobileNav");

const toast =
    document.getElementById("toast");


/* ==========================================
   FORMATAR PREÇO
========================================== */

function dinheiro(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==========================================
   NOME DA CATEGORIA
========================================== */

function nomeCategoria(categoria) {

    if (categoria === "peixes") {
        return "Peixes";
    }

    if (categoria === "camaroes") {
        return "Camarões";
    }

    if (categoria === "bolinhos") {
        return "Bolinhos";
    }

    return categoria;

}


/* ==========================================
   PRODUTOS FILTRADOS
========================================== */

function produtosFiltrados() {

    return produtos.filter(produto => {

        const categoriaOk =
            categoriaAtual === "todos" ||
            produto.categoria === categoriaAtual;

        const buscaOk =
            produto.nome
                .toLowerCase()
                .includes(buscaAtual.toLowerCase());

        return categoriaOk && buscaOk;

    });

}


/* ==========================================
   MOSTRAR PRODUTOS
========================================== */

function renderProdutos() {

    const lista = produtosFiltrados();


    if (lista.length === 0) {

        productGrid.innerHTML = `
            <p>
                Nenhum produto encontrado.
            </p>
        `;

        return;

    }


    productGrid.innerHTML =
        lista.map(produto => {

            const opcoesPeso =
                pesos.map(peso => {

                    const precoPeso =
                        produto.preco * peso.valor;

                    return `
                        <option value="${peso.valor}">
                            ${peso.nome} — ${dinheiro(precoPeso)}
                        </option>
                    `;

                }).join("");


            return `

                <article class="product-card">

                    <div class="product-image">

                        <img
                            src="${produto.imagem}"
                            alt="${produto.nome}"
                            loading="lazy"
                        >

                        <span class="product-badge">
                            ${nomeCategoria(produto.categoria)}
                        </span>

                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${nomeCategoria(produto.categoria)}
                        </span>

                        <h3>
                            ${produto.nome}
                        </h3>

                        <div class="product-price">

                            ${dinheiro(produto.preco)}

                            <small>
                                / kg
                            </small>

                        </div>

                        <label
                            class="weight-label"
                            for="peso-${produto.id}"
                        >
                            Escolha o peso
                        </label>

                        <select
                            class="weight-select"
                            id="peso-${produto.id}"
                        >
                            ${opcoesPeso}
                        </select>

                        <button
                            class="add-to-cart"
                            onclick="adicionarCarrinho(${produto.id})"
                        >
                            Adicionar ao carrinho
                        </button>

                    </div>

                </article>

            `;

        }).join("");

}


/* ==========================================
   ADICIONAR AO CARRINHO
========================================== */

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );

    if (!produto) {
        return;
    }


    const select =
        document.getElementById(`peso-${id}`);

    const peso =
        Number(select.value);


    const itemExistente =
        carrinho.find(item => {

            return (
                item.id === id &&
                item.peso === peso
            );

        });


    if (itemExistente) {

        itemExistente.quantidade += 1;

    } else {

        carrinho.push({

            chave: `${id}-${peso}-${Date.now()}`,

            id: produto.id,

            nome: produto.nome,

            precoKg: produto.preco,

            peso: peso,

            quantidade: 1

        });

    }


    salvarCarrinho();

    renderCarrinho();

    mostrarToast(
        `${produto.nome} adicionado.`
    );

}


/* ==========================================
   MOSTRAR CARRINHO
========================================== */

function renderCarrinho() {

    if (carrinho.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <strong>
                    Seu carrinho está vazio.
                </strong>

                <p>
                    Escolha seus produtos
                    e monte seu pedido.
                </p>

            </div>

        `;

    } else {

        cartItems.innerHTML =
            carrinho.map(item => {

                const valorUnitario =
                    item.precoKg * item.peso;

                const subtotal =
                    valorUnitario * item.quantidade;


                return `

                    <div class="cart-item">

                        <div class="cart-item-top">

                            <div>

                                <h4>
                                    ${item.nome}
                                </h4>

                                <p class="cart-item-details">

                                    ${formatarPeso(item.peso)}

                                    • ${dinheiro(valorUnitario)}
                                    cada

                                </p>

                            </div>

                            <button
                                class="remove-item"
                                onclick="removerItem('${item.chave}')"
                            >
                                Remover
                            </button>

                        </div>


                        <div class="cart-item-bottom">

                            <div class="cart-quantity">

                                <button
                                    onclick="alterarQuantidade('${item.chave}', -1)"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantidade}
                                </span>

                                <button
                                    onclick="alterarQuantidade('${item.chave}', 1)"
                                >
                                    +
                                </button>

                            </div>

                            <strong class="cart-item-price">
                                ${dinheiro(subtotal)}
                            </strong>

                        </div>

                    </div>

                `;

            }).join("");

    }


    atualizarResumoCarrinho();

}


/* ==========================================
   FORMATAR PESO
========================================== */

function formatarPeso(peso) {

    if (peso < 1) {

        return `${peso * 1000} g`;

    }

    return `${String(peso).replace(".", ",")} kg`;

}


/* ==========================================
   ALTERAR QUANTIDADE
========================================== */

function alterarQuantidade(
    chave,
    quantidade
) {

    const item =
        carrinho.find(
            item => item.chave === chave
        );

    if (!item) {
        return;
    }


    item.quantidade += quantidade;


    if (item.quantidade <= 0) {

        carrinho =
            carrinho.filter(
                item => item.chave !== chave
            );

    }


    salvarCarrinho();

    renderCarrinho();

}


/* ==========================================
   REMOVER ITEM
========================================== */

function removerItem(chave) {

    carrinho =
        carrinho.filter(
            item => item.chave !== chave
        );

    salvarCarrinho();

    renderCarrinho();

}


/* ==========================================
   CALCULAR TOTAL
========================================== */

function calcularTotal() {

    return carrinho.reduce(
        (total, item) => {

            return total +
                (
                    item.precoKg *
                    item.peso *
                    item.quantidade
                );

        },
        0
    );

}


/* ==========================================
   CONTADOR / TOTAL
========================================== */

function atualizarResumoCarrinho() {

    const quantidade =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    cartCount.textContent =
        quantidade;


    cartTotal.textContent =
        dinheiro(
            calcularTotal()
        );

}


/* ==========================================
   SALVAR CARRINHO
========================================== */

function salvarCarrinho() {

    localStorage.setItem(
        "casaDoCamaraoCarrinho",
        JSON.stringify(carrinho)
    );

}


/* ==========================================
   CARREGAR CARRINHO
========================================== */

function carregarCarrinho() {

    try {

        const salvo =
            localStorage.getItem(
                "casaDoCamaraoCarrinho"
            );


        if (!salvo) {
            return [];
        }


        return JSON.parse(salvo);

    } catch (erro) {

        return [];

    }

}


/* ==========================================
   ABRIR CARRINHO
========================================== */

function abrirCarrinho() {

    cartDrawer.classList.add(
        "active"
    );

    cartOverlay.classList.add(
        "active"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "cart-open"
    );

}


/* ==========================================
   FECHAR CARRINHO
========================================== */

function fecharCarrinho() {

    cartDrawer.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "cart-open"
    );

}


/* ==========================================
   FINALIZAR PEDIDO PELO WHATSAPP
========================================== */

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "Adicione algum produto ao carrinho primeiro."
        );

        return;

    }


    let mensagem =
        "Olá! Gostaria de fazer um pedido na Casa do Camarão.\n\n";


    mensagem +=
        "*MEU PEDIDO*\n\n";


    carrinho.forEach(item => {

        const valorUnitario =
            item.precoKg * item.peso;

        const subtotal =
            valorUnitario * item.quantidade;


        mensagem +=
            `• ${item.nome}\n`;

        mensagem +=
            `  ${formatarPeso(item.peso)} x ${item.quantidade}\n`;

        mensagem +=
            `  ${dinheiro(subtotal)}\n\n`;

    });


    mensagem +=
        `*TOTAL ESTIMADO: ${dinheiro(calcularTotal())}*\n\n`;


    mensagem +=
        "Gostaria de confirmar a disponibilidade dos produtos.";


    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;


    window.open(
        url,
        "_blank"
    );

}


/* ==========================================
   FILTROS
========================================== */

function selecionarCategoria(categoria) {

    categoriaAtual =
        categoria;


    document
        .querySelectorAll(
            ".filter, .category-tile"
        )
        .forEach(botao => {

            botao.classList.toggle(
                "active",
                botao.dataset.category === categoria
            );

        });


    renderProdutos();


    if (categoria !== "todos") {

        document
            .getElementById("produtos")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

}


/* ==========================================
   EVENTOS DAS CATEGORIAS
========================================== */

document
    .querySelectorAll(
        ".filter, .category-tile"
    )
    .forEach(botao => {

        botao.addEventListener(
            "click",
            () => {

                selecionarCategoria(
                    botao.dataset.category
                );

            }
        );

    });


/* ==========================================
   BUSCA
========================================== */

searchToggle.addEventListener(
    "click",
    () => {

        searchPanel.classList.add(
            "active"
        );

        searchInput.focus();

    }
);


closeSearch.addEventListener(
    "click",
    () => {

        searchPanel.classList.remove(
            "active"
        );

        searchInput.value = "";

        buscaAtual = "";

        renderProdutos();

    }
);


searchInput.addEventListener(
    "input",
    event => {

        buscaAtual =
            event.target.value;

        renderProdutos();

    }
);


/* ==========================================
   CARRINHO - EVENTOS
========================================== */

cartToggle.addEventListener(
    "click",
    abrirCarrinho
);


closeCart.addEventListener(
    "click",
    fecharCarrinho
);


cartOverlay.addEventListener(
    "click",
    fecharCarrinho
);


checkoutBtn.addEventListener(
    "click",
    finalizarPedido
);


/* ==========================================
   MENU MOBILE
========================================== */

mobileToggle.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle(
            "active"
        );

    }
);


document
    .querySelectorAll(
        ".mobile-nav a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "active"
                );

            }
        );

    });


/* ==========================================
   TOAST
========================================== */

let toastTimer;


function mostrarToast(texto) {

    toast.textContent =
        texto;


    toast.classList.add(
        "active"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "active"
                );

            },
            2200
        );

}


/* ==========================================
   ESC PARA FECHAR
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            fecharCarrinho();

            searchPanel.classList.remove(
                "active"
            );

        }

    }
);


/* ==========================================
   INICIAR SITE
========================================== */

renderProdutos();

renderCarrinho();
