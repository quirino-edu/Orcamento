const saldo = document.getElementById('saldo');
const dinheiroReceita = document.getElementById('dinheiro-receita');
const dinheiroDespesa = document.getElementById('dinheiro-despesa');
const lista = document.getElementById('lista');
const form = document.getElementById('form');
const texto = document.getElementById('texto');
const valor = document.getElementById('valor');

let transacoes = [];

// Função para gerar um ID único para cada transação
function gerarID() {
  return Math.floor(Math.random() * 100000000);
}

// Adicionar transação
function adicionarTransacao(e) {
  e.preventDefault();

  if (texto.value.trim() === '' || valor.value.trim() === '') {
    alert('Por favor, adicione uma descrição e um valor.');
  } else {
    const transacao = {
      id: gerarID(),
      texto: texto.value,
      valor: +valor.value,
    };

    transacoes.push(transacao);
    adicionarTransacaoDOM(transacao);
    atualizarValores();
    texto.value = '';
    valor.value = '';
  }
}

// Adicionar transações ao DOM (histórico)
function adicionarTransacaoDOM(transacao) {
  const sinal = transacao.valor < 0 ? 'menos' : 'mais';

  const item = document.createElement('li');

  item.classList.add(sinal);

  item.innerHTML = `
    ${transacao.texto} <span>${sinal === 'menos' ? '-' : '+'}R$${Math.abs(transacao.valor).toFixed(2)}</span>
    <button class="delete-btn" onclick="removerTransacao(${transacao.id})">x</button>
  `;

  lista.appendChild(item);
}

// Atualizar o saldo, receitas e despesas
function atualizarValores() {
  const valoresTransacoes = transacoes.map(transacao => transacao.valor);

  const total = valoresTransacoes.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const receita = valoresTransacoes
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const despesa = (
    valoresTransacoes.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  saldo.innerText = `R$${total}`;
  dinheiroReceita.innerText = `R$${receita}`;
  dinheiroDespesa.innerText = `R$${despesa}`;
}

// Remover transação por ID
function removerTransacao(id) {
  transacoes = transacoes.filter(transacao => transacao.id !== id);
  iniciar();
}

// Inicializar o app
function iniciar() {
  lista.innerHTML = '';
  transacoes.forEach(adicionarTransacaoDOM);
  atualizarValores();
}

iniciar();

// Adicionar evento de submit ao formulário
form.addEventListener('submit', adicionarTransacao);
