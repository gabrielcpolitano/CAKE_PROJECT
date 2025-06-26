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
                    <p class="text-purple-600 text-xl font-bold">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button onclick='addToCart(${JSON.stringify(produto)})'
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

function addToCart(produto) {
    cart.push(produto);
    document.getElementById("cartCount").innerText = cart.length;
    document.getElementById("cartCount").classList.add("animate-bounce");
    setTimeout(() => document.getElementById("cartCount").classList.remove("animate-bounce"), 500);

    // Mensagem temporária com fade
    const msg = document.getElementById("addToCartMessage");
    msg.textContent = `${produto.nome} adicionado ao carrinho!`;
    msg.classList.remove("opacity-0");
    msg.classList.add("opacity-100");

    setTimeout(() => {
        msg.classList.remove("opacity-100");
        msg.classList.add("opacity-0");
    }, 2000);
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
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML += "<p class='text-center text-gray-500 mb-4'>Seu carrinho está vazio.</p>";
    } else {
        container.innerHTML += cart.map((item, index) => `
            <div class="flex justify-between items-center border-b py-1">
                <div>
                    <span>${item.nome}</span>
                    <span class="font-bold text-purple-600 ml-2">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }

    const total = cart.reduce((acc, item) => acc + item.preco, 0).toFixed(2).replace('.', ',');

    container.insertAdjacentHTML("beforeend", `
        <div class="mt-4 text-right font-semibold text-lg text-gray-700">
            Total: <span class="text-purple-600">R$ ${total}</span>
        </div>
    `);
}

// ENVIO PARA FORMSPREE COM VALIDAÇÃO DE TELEFONE
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();

    const telefoneValido = /^(\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/.test(telefone);
    if (!telefoneValido) {
        alert("Por favor, insira um número de telefone válido. Ex: (16) 99999-9999");
        return;
    }

    const total = cart.reduce((acc, item) => acc + item.preco, 0).toFixed(2).replace('.', ',');
    const lista = cart.map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}`).join(`\n`);

    const pedido =
        `🧁 Itens do Pedido:\n${lista}\n\n` +
        `💰 Total: R$ ${total}`;

    fetch("https://formspree.io/f/xldnopqr", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            telefone,
            endereco,
            pedido
        })
    })
    .then(response => {
        if (response.ok) {
            cart.length = 0;
            renderCartItems();
            document.getElementById("cartCount").innerText = "0";
            document.getElementById("checkoutForm").reset();
            toggleCartModal();
            document.getElementById("successMessage").classList.remove("hidden");
        } else {
            alert("Erro ao enviar pedido. Tente novamente.");
        }
    })
    .catch(() => {
        alert("Erro de conexão ao enviar o pedido.");
    });
});

function closeSuccessMessage() {
    document.getElementById("successMessage").classList.add("hidden");
}

// MÁSCARA DE TELEFONE AO DIGITAR
const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", function (e) {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 11) input = input.slice(0, 11);

    let formatted = "";
    if (input.length > 0) formatted += "(";
    if (input.length >= 1) formatted += input.substring(0, 2);
    if (input.length >= 3) formatted += ") " + input.substring(2, 7);
    if (input.length >= 8) formatted += "-" + input.substring(7);

    e.target.value = formatted;
});

// *** INSERINDO MENSAGENS DE ENTREGA DEPOIS DO FORMULÁRIO ***

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkoutForm");
    if (form) {
        const entregaContainer = document.createElement("div");
        entregaContainer.innerHTML = `
            <div class="mt-6 bg-yellow-100 text-yellow-800 text-sm p-3 rounded-lg border border-yellow-300 flex items-center gap-2">
                <i class="fas fa-truck"></i>
                <span>Entregas em <strong>Araraquara</strong> são realizadas somente aos <strong>sábados e domingos</strong>.</span>
            </div>
            <div class="mt-2 bg-green-100 text-green-800 text-sm p-3 rounded-lg border border-green-300 flex items-center gap-2">
                <i class="fas fa-check-circle"></i>
                <span><strong>Entrega grátis</strong> para todos os pedidos!</span>
            </div>
        `;
        form.insertAdjacentElement("afterend", entregaContainer);
    }
});

renderProdutos();