const URL_API =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://eita-29o3.onrender.com";

const cupom = document.querySelector("#cupom");
const btnCalcularPedido = document.querySelector("#btnCalcularPedido");

// 2. Função para carregar o cardápio
async function carregarCardapio() {
  try {
    const resposta = await fetch(`${URL_API}/cardapio`);
    const itens = await resposta.json();

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
  } catch (erro) {
    console.error("Erro ao carregar cardápio:", erro);
  }
}

carregarCardapio();

function popularSelect(idSelect, itens) {
  const select = document.querySelector(`#${idSelect}`);
  if (!select) return;

  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];
    const option = document.createElement("option");
    option.value = item.nome;
    option.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    select.appendChild(option);
  }
}

if (btnCalcularPedido) {
  btnCalcularPedido.addEventListener("click", async function () {
    const pao = document.querySelector("#selectPao").value;
    const recheio = document.querySelector("#selectRecheio").value;
    const molho = document.querySelector("#selectMolho").value;

    try {
      const resposta = await fetch(`${URL_API}/pedido`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pao: pao, recheio: recheio, molho: molho }),
      });

      const dados = await resposta.json();

      if (dados.erro) {
        cupom.innerText = `Erro: ${dados.erro}`;
        return;
      }

      const totalFormatado = dados.total.toFixed(2);

      cupom.innerText =
        `Pão: ${dados.itens.pao}\n` +
        `Recheio: ${dados.itens.recheio}\n` +
        `Molho: ${dados.itens.molho}\n` +
        `Total: R$ ${totalFormatado}`;
    } catch (erro) {
      console.error("Erro ao enviar pedido:", erro);
    }
  });
}
