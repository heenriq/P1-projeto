// const btnCalcularPedido = document.querySelector("#btnCalcularPedido")
// const cupom = document.querySelector("#cupom")

// btnCalcularPedido.addEventListener("click", function() {
//   const pao = selectPao.value;
//   const recheio = selectRecheio.value;
//   const molho = selectMolho.value;

//   const valorTotal = precos.pao[pao] + precos.recheio[recheio] + precos.molho[molho];
//   console.log(valorTotal)

//   cupom.textContent =
//   `
//   =============================================
//    Pao: ${pao} ....... R$${precos.pao[pao].toFixed(2)}
//    Recheio: ${recheio} ...... R$${precos.recheio[recheio].toFixed(2)}
//    Molho: ${molho} ......R$${precos.molho[molho].toFixed(2)}
//    ------------------------------------------------------
//    Total: R$ ${valorTotal.toFixed(2)}`

// })

// aula 03 -----
// 01 exercicio fetch
async function carregarCardapio() {
  const resposta = await fetch("http://localhost:3000/cardapio");
  const itens = await resposta.json();
  console.log(itens);

  popularSelect(
    "selectPao",
    itens.filter((item) => item.categoria === "pao"),
  );
  popularSelect(
    "selectRecheio",
    itens.filter((item) => item.categoria === "recheio"),
  );
  popularSelect(
    "selectMolho",
    itens.filter((item) => item.categoria === "molho"),
  );
}

carregarCardapio();

//exercicio 03
const URL_API = "http://localhost:3000";
const cupom = document.querySelector("#cupom");

function popularSelect(idSelect, itens) {
  const select = document.querySelector(`#${idSelect}`);
  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];
    const option = document.createElement("option");
    option.value = item.nome;
    option.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    select.appendChild(option);
  }
}

btnCalcularPedido.addEventListener("click", async function () {
  // 1. Pega os valores selecionados nos TRES selects
  const pao = selectPao.value;
  const recheio = selectRecheio.value;
  const molho = selectMolho.value;

  // 2. Envia para o servidor (observe as chaves dentro do body)
  const resposta = await fetch("http://localhost:3000/pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pao: pao, recheio: recheio, molho: molho }),
  });

  const dados = await resposta.json();

  const totalFormatado = dados.total.toFixed(2);

  cupom.innerText =
    `Pão: ${dados.itens.pao}\n` +
    `Recheio: ${dados.itens.recheio}\n` +
    `Molho: ${dados.itens.molho}\n` +
    `Total: R$ ${totalFormatado}`;
});
