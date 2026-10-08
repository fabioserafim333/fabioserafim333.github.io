const produtos = [

    {
        id: 1,
        nome: "Urban Classic",
        categoria: "casual",
        preco: 249.90,
        imagem: "👟"
    },

    {
        id: 2,
        nome: "Street Runner",
        categoria: "corrida",
        preco: 329.90,
        imagem: "👟"
    },

    {
        id: 3,
        nome: "Urban Air",
        categoria: "tenis",
        preco: 399.90,
        imagem: "👟"
    },

    {
        id: 4,
        nome: "Daily Walk",
        categoria: "casual",
        preco: 189.90,
        imagem: "👞"
    },

    {
        id: 5,
        nome: "Speed Pro",
        categoria: "corrida",
        preco: 449.90,
        imagem: "👟"
    },

    {
        id: 6,
        nome: "Street Black",
        categoria: "tenis",
        preco: 299.90,
        imagem: "👟"
    },

    {
        id: 7,
        nome: "Essential White",
        categoria: "tenis",
        preco: 219.90,
        imagem: "👟"
    },

    {
        id: 8,
        nome: "Urban Leather",
        categoria: "casual",
        preco: 379.90,
        imagem: "👞"
    }

];


let carrinho = JSON.parse(
    localStorage.getItem("urbanstep-carrinho")
) || [];


function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById("produtos-container");

    container.innerHTML = "";


    if (lista.length === 0) {

        container.innerHTML = `
            <p>
                Nenhum produto encontrado.
            </p>
        `;

        return;
    }


    lista.forEach(produto => {

        const card = document.createElement("div");

        card.className = "produto";


        card.innerHTML = `

            <div class="produto-imagem">
                ${produto.imagem}
            </div>

            <div class="produto-info">

                <p class="produto-categoria">
                    ${produto.categoria}
                </p>

                <h3>
                    ${produto.nome}
                </h3>

                <p class="produto-preco">
                    ${formatarPreco(produto.preco)}
                </p>

                <button
                    class="adicionar"
                    onclick="adicionarAoCarrinho(${produto.id})"
                >
                    Adicionar ao carrinho
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


function adicionarAoCarrinho(id) {

    const produto =
        produtos.find(item => item.id === id);


    const itemExistente =
        carrinho.find(item => item.id === id);


    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            preco: produto.preco,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

}


function removerDoCarrinho(id) {

    carrinho =
        carrinho.filter(item => item.id !== id);

    salvarCarrinho();

    atualizarCarrinho();

}


function alterarQuantidade(id, quantidade) {

    const item =
        carrinho.find(item => item.id === id);


    if (!item) {
        return;
    }


    item.quantidade += quantidade;


    if (item.quantidade <= 0) {

        removerDoCarrinho(id);

        return;

    }


    salvarCarrinho();

    atualizarCarrinho();

}


function atualizarCarrinho() {

    const container =
        document.getElementById("itens-carrinho");

    const contador =
        document.getElementById("contador-carrinho");

    const totalElemento =
        document.getElementById("total-carrinho");


    container.innerHTML = "";


    let quantidadeTotal = 0;

    let valorTotal = 0;


    if (carrinho.length === 0) {

        container.innerHTML = `
            <div class="carrinho-vazio">
                Seu carrinho está vazio.
            </div>
        `;

    }


    carrinho.forEach(item => {

        quantidadeTotal += item.quantidade;

        valorTotal +=
            item.preco * item.quantidade;


        const elemento =
            document.createElement("div");

        elemento.className =
            "carrinho-item";


        elemento.innerHTML = `

            <div>

                <h4>
                    ${item.nome}
                </h4>

                <p>
                    ${formatarPreco(item.preco)}
                </p>

                <button
                    class="remover"
                    onclick="removerDoCarrinho(${item.id})"
                >
                    Remover
                </button>

            </div>


            <div class="quantidade">

                <button
                    onclick="alterarQuantidade(${item.id}, -1)"
                >
                    −
                </button>

                <strong>
                    ${item.quantidade}
                </strong>

                <button
                    onclick="alterarQuantidade(${item.id}, 1)"
                >
                    +
                </button>

            </div>

        `;


        container.appendChild(elemento);

    });


    contador.textContent =
        quantidadeTotal;


    totalElemento.textContent =
        formatarPreco(valorTotal);

}


function salvarCarrinho() {

    localStorage.setItem(
        "urbanstep-carrinho",
        JSON.stringify(carrinho)
    );

}


function abrirCarrinho() {

    document
        .getElementById("carrinho-overlay")
        .classList.add("aberto");

}


function fecharCarrinho() {

    document
        .getElementById("carrinho-overlay")
        .classList.remove("aberto");

}


function fecharCarrinhoFora(event) {

    if (
        event.target.id === "carrinho-overlay"
    ) {

        fecharCarrinho();

    }

}


function filtrarProdutos() {

    const busca =
        document
            .getElementById("campo-busca")
            .value
            .toLowerCase();


    const categoria =
        document
            .getElementById("filtro-categoria")
            .value;


    const resultado =
        produtos.filter(produto => {

            const correspondeNome =
                produto.nome
                    .toLowerCase()
                    .includes(busca);


            const correspondeCategoria =
                categoria === "todos" ||
                produto.categoria === categoria;


            return (
                correspondeNome &&
                correspondeCategoria
            );

        });


    mostrarProdutos(resultado);

}


function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    alert(
        "Compra realizada com sucesso! " +
        "Esta é uma loja fictícia."
    );


    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho();

    fecharCarrinho();

}


// Inicialização

mostrarProdutos();

atualizarCarrinho();
