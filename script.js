const produtos = [
    {
        nome: "Bolo de Fubá",
        preco: 29.50,
        categoria: "tradicional",
        descricao: "Clássico bolo de Fubá",
        estrela: 5,
        vendas: 142,
        imagem: "./imgs/fuba.jpg"
    },
    {
        nome: "Bolo de Cenoura",
        preco: 42.90,
        categoria: "tradicional",
        descricao: "Clássico bolo de cenoura com cobertura de chocolate",
        estrela: 4,
        vendas: 118,
        imagem: "imgs/cenoura.jpg"
    },
    {
        nome: "Bolo de Leite Ninho",
        preco: 49.50,
        categoria: "tradicional",
        descricao: "Clássico bolo de leite ninho",
        estrela: 5,
        vendas: 107,
        imagem: "imgs/leite.png"
    },
    {
        nome: "Bolo de Iogurte",
        preco: 42.50,
        categoria: "tradicional",
        descricao: "Bolo de Iogurte com mousse de limão",
        estrela: 4,
        vendas: 54,
        imagem: "imgs/limao.png"
    },
    {
        nome: "Bolo de Muracujá",
        preco: 42.90,
        categoria: "gourmet",
        descricao: "Delicioso bolo de maracujá com cobertura mousse de maracujá ",
        estrela: 5,
        vendas: 52,
        imagem: "imgs/maracuja.jpg"
    },
    {
        nome: "Bolo de Churros",
        preco: 49.50,
        categoria: "tradicional",
        descricao: "Bolo de churros com cobertura de doce de leite",
        estrela: 5,
        vendas: 67,
        imagem: "imgs/churros.jpg"
    },
    {
        nome: "Bolo de Paçoca",
        preco: 49.50,
        categoria: "tradicional",
        descricao: "Bolo de paçoca com cobertura de doce de leite",
        estrela: 4,
        vendas: 22,
        imagem: "imgs/pacoca.jpeg"
    },
    {
        nome: "Bolo Vulcão de Cenoura",
        preco: 49.90,
        categoria: "tradicional",
        descricao: "Classico bolo de cenoura com muito chocolate",
        estrela: 5,
        vendas: 50,
        imagem: "imgs/vulcao.png"
    },
    {
        nome: "Cueca Virada",
        preco: 19.90,
        categoria: "doces",
        descricao: "Deliciosa cueca virada (25 unidades)",
        estrela: 5,
        vendas: 50,
        imagem: "imgs/cuecavirada.webp"
    },
    {
        nome: "Beijo de Mulata",
        preco: 22.50,
        categoria: "doces",
        descricao: "Deliciosa beijo de mulata (25 unidades)",
        estrela: 5,
        vendas: 50,
        imagem: "imgs/beijo-de-mulata.jpg"
    }

];

let currentPage = 1;
const itemsPerPage = 8;

const grid = document.getElementById('productGrid');
const cart = [];

function renderProdutos(filtro = "todos") {
    grid.innerHTML = "";

    const produtosFiltrados = produtos.filter(p => filtro === "todos" || p.categoria === filtro);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const produtosPaginados = produtosFiltrados.slice(startIndex, endIndex);

    produtosPaginados.forEach((produto, index) => {
        grid.innerHTML += `
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition">
            <div class="h-[200px] overflow-hidden">
                <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-full object-cover">
            </div>
            <div class="p-4 flex flex-col justify-between h-[220px]">
                <div>
                    <h4 class="font-semibold text-lg text-gray-800 mb-1">${produto.nome}</h4>
                    <p class="text-gray-500 text-sm mb-2">${produto.descricao}</p>
                    <div class="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                        ${'★'.repeat(produto.estrela)}${'☆'.repeat(5 - produto.estrela)}
                        <span class="text-gray-500 text-xs ml-2">(${produto.vendas})</span>
                    </div>
                    <p class="text-purple-600 text-xl font-bold">R$ ${produto.preco.toFixed(2)}</p>
                </div>
                <button onclick="addToCart(${index})"
                    class="mt-4 bg-purple-600 text-white w-full py-2 rounded-full font-medium hover:bg-purple-700 transition">
                    <i class="fas fa-plus mr-1"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
        `;
    });

    renderPagination(produtosFiltrados.length, filtro);
}

function renderPagination(totalItems, filtro) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `
            <button onclick="goToPage(${i}, '${filtro}')"
                class="mx-1 px-4 py-2 rounded-full ${i === currentPage ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-purple-200 transition">
                ${i}
            </button>
        `;
    }
}

function goToPage(page, filtro) {
    currentPage = page;
    renderProdutos(filtro);
}

function addToCart(index) {
    const produto = produtos[index];
    cart.push(produto);
    document.getElementById("cartCount").innerText = cart.length;
    document.getElementById("cartCount").classList.add("animate-bounce");
    setTimeout(() => document.getElementById("cartCount").classList.remove("animate-bounce"), 500);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCartItems();
    document.getElementById("cartCount").innerText = cart.length;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-purple-600', 'text-white'));
        btn.classList.add('bg-purple-600', 'text-white');
        currentPage = 1;
        renderProdutos(btn.dataset.category || "todos");
    });
});

document.getElementById("cartBtn").addEventListener("click", toggleCartModal);

function toggleCartModal() {
    document.getElementById("cartModal").classList.toggle("hidden");
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById("cartItems");

    if (cart.length === 0) {
        container.innerHTML = "<p class='text-center text-gray-500'>Seu carrinho está vazio.</p>";
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="flex justify-between items-center border-b py-1">
            <div>
                <span>${item.nome}</span>
                <span class="font-bold text-purple-600 ml-2">R$ ${item.preco.toFixed(2)}</span>
            </div>
            <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');

    // Adiciona o aviso de entrega
    container.insertAdjacentHTML("beforeend", `
        <div class="mt-4 bg-yellow-100 text-yellow-800 text-sm p-3 rounded-lg border border-yellow-300">
            <i class="fas fa-truck mr-1"></i>
            Entregas em <strong>Araraquara</strong> são realizadas somente aos <strong>sábados e domingos</strong>.
        </div>
    `);
}


document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const pedidoId = Math.random().toString(36).substring(2, 10).toUpperCase(); // Gera ID tipo 96ZATEMMT

    const total = cart.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
    const lista = cart.map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2)}`).join(`\n`);

    const mensagem =
        `*Sandra Boleira*

*� Código do Pedido:* ${pedidoId}
*� Cliente:* ${nome}
*� Telefone:* ${telefone}
*� Endereço:* ${endereco}

*� Itens do Pedido:*
${lista}

*� Total: R$ ${total}*

*� Obrigado pela preferência! �*`;

    const url = `https://wa.me/5517996490503?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
});

renderProdutos();
