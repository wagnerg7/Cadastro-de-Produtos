class Produto {
    constructor(nome, valor, quantidade, local) {
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
        this.local = local;
    }
}

const produtos = [];

function adicionarProduto() {
    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    const quantidade = document.getElementById('quantidade').value;
    const local = document.getElementById('local').value;

    const produto = new Produto(nome, valor, quantidade, local);
    produtos.push(produto);

    atualizarTabela();
    fecharModal();
}

function atualizarTabela() {
    const tabela = document.getElementById('tableClient').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    for (const produto of produtos) {
        const row = tabela.insertRow();
        const cellNome = row.insertCell(0);
        const cellValor = row.insertCell(1);
        const cellQuantidade = row.insertCell(2);
        const cellLocal = row.insertCell(3);
        const cellAcao = row.insertCell(4);

        cellNome.innerText = produto.nome;
        cellValor.innerText = produto.valor;
        cellQuantidade.innerText = produto.quantidade;
        cellLocal.innerText = produto.local;

        const editarButton = document.createElement('button');
        editarButton.innerText = 'Editar';
        editarButton.className = 'button edit-button green';
        editarButton.onclick = () => editarProduto(produtos.indexOf(produto));
        cellAcao.appendChild(editarButton);
    }
}

function abrirModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');


    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('local').value = '';
}

// CRUD Móduló 3 - UPDATE (Atualizar)
function editarProduto(index) {
    abrirModal();
    const produto = produtos[index];

    document.getElementById('nome').value = produto.nome;
    document.getElementById('valor').value = produto.valor;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('local').value = produto.local;

    produtos.splice(index, 1);

    atualizarTabela();
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    atualizarTabela();
}



function adicionarBotoesAcao(row, index) {
    const cellAcao = row.insertCell(4);

    const editarButton = document.createElement('button');
    editarButton.innerText = 'Editar';
    editarButton.className = 'button edit-button green';
    editarButton.onclick = () => editarProduto(index);

    const excluirButton = document.createElement('button');
    excluirButton.innerText = 'Excluir';
    excluirButton.className = 'button edit-button red';
    excluirButton.onclick = () => excluirProduto(index);

    cellAcao.appendChild(editarButton);
    cellAcao.appendChild(excluirButton);
}

function atualizarTabela() {
    const tabela = document.getElementById('tableClient').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        const row = tabela.insertRow();
        const cellNome = row.insertCell(0);
        const cellValor = row.insertCell(1);
        const cellQuantidade = row.insertCell(2);
        const cellLocal = row.insertCell(3);

        cellNome.innerText = produto.nome;
        cellValor.innerText = produto.valor;
        cellQuantidade.innerText = produto.quantidade;
        cellLocal.innerText = produto.local;

        adicionarBotoesAcao(row, i);
    }
}

function editarProdutoModal(index) {
    abrirModal();
    const produto = produtos[index];

    document.getElementById('nome').value = produto.nome;
    document.getElementById('valor').value = produto.valor;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('local').value = produto.local;


    const salvarButton = document.getElementById('salvar');
    salvarButton.removeEventListener('click', adicionarProduto);
    salvarButton.addEventListener('click', () => salvarEdicaoProduto(index));
}

function salvarEdicaoProduto(index) {
    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    const quantidade = document.getElementById('quantidade').value;
    const local = document.getElementById('local').value;

    const produtoEditado = new Produto(nome, valor, quantidade, local);
    produtos[index] = produtoEditado;

    atualizarTabela();
    fecharModal();
}


document.getElementById('addProduto').addEventListener('click', abrirModal);

document.getElementById('salvar').addEventListener('click', adicionarProduto);

document.getElementById('cancelar').addEventListener('click', fecharModal);

atualizarTabela();