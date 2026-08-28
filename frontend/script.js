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

if (btnCardapio) {
  btnCardapio.addEventListener("click", async function () {
    const pagina1 = document.getElementById("pagina1");
    const pagina2 = document.getElementById("pagina2");

    pagina1.classList.add("escondido");
    pagina2.classList.remove("escondido");

    displayCardapio();
  });
}
if (btnVoltar) {
  btnVoltar.addEventListener("click", async function () {
    const pagina1 = document.getElementById("pagina1");
    const pagina2 = document.getElementById("pagina2");

    pagina1.classList.remove("escondido");
    pagina2.classList.add("escondido");
  });
}

async function displayCardapio() {
  try {
    const resposta = await fetch(`${URL_API}/cardapio`);
    const itens = await resposta.json();

    // Pega a div da página onde os cards vão aparecer
    const container = document.querySelector(".cardapio-container");
    // Limpa tudo que já tinha lá dentro (pra não duplicar se clicar de novo)
    container.innerHTML = "";

    // Nomes bonitos pra exibir na tela (o "pao" vira "Pães")
    const categorias = ["pao", "recheio", "molho"];
    const nomes = { pao: "Pães", recheio: "Recheios", molho: "Molhos" };

    for (const cat of categorias) {
      const h3 = document.createElement("h3");
      h3.textContent = nomes[cat];
      container.appendChild(h3);

      // Cria a "fileira" que vai guardar os 4 cards dessa categoria
      const grid = document.createElement("div");
      grid.classList.add("card-grid");

      for (const item of itens) {
        // Se o item não for da categoria atual, pula pra próximo
        if (item.categoria !== cat) continue;

        // Cria a "caixa" de um card individual
        const div = document.createElement("div");
        div.classList.add("card-item");

        // Cria a imagem
        const img = document.createElement("img");
        img.src = `imagens ${item.categoria}/${item.nome.toLowerCase().replace(/\s/g, "-")}.png`;
        img.alt = item.nome;

        // Cria o nome do item
        const nome = document.createElement("p");
        nome.classList.add("card-nome");
        nome.textContent = item.nome;

        // Cria o preço (sempre com 2 casas decimais)
        const preco = document.createElement("p");
        preco.classList.add("card-preco");
        preco.textContent = `R$ ${item.preco.toFixed(2)}`;

        // Encaixa: img + nome + preço DENTRO do card
        div.appendChild(img);
        div.appendChild(nome);
        div.appendChild(preco);

        // Encaixa o card DENTRO da fileira
        grid.appendChild(div);
      }
      // Encaixa a fileira inteira DENTRO do container (na página)
      container.appendChild(grid);
    }
  } catch (erro) {
    // Se o servidor cair ou der erro, mostra no console em vez de quebrar a página
    console.error("Erro ao carregar cardápio:", erro);
  }
}

/* 
  1. Pega os dados do servidor
  2. Limpa o container
  3. Pra cada categoria (pão, recheio, molho):
     → Cria um <h3> com o nome
     → Cria uma fileira (div flex)
     → Pra cada item dessa categoria:
       → Cria um card (div)
       → Coloca imagem + nome + preço dentro
       → Joga o card na fileira
   → Joga a fileira no container
*/