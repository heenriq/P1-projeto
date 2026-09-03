const express = require("express");
const cors = require("cors");
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5500";

app.use(cors());
app.use(express.json());

const cardapio = [
  { categoria: "pao", nome: "Frances", preco: 1.5 },
  { categoria: "pao", nome: "Integral", preco: 2.0 },
  { categoria: "pao", nome: "Australiano", preco: 3.5 },
  { categoria: "pao", nome: "Ciabatta", preco: 2.5 },
  { categoria: "recheio", nome: "Frango", preco: 5.0 },
  { categoria: "recheio", nome: "Carne", preco: 6.5 },
  { categoria: "recheio", nome: "Peixe", preco: 6.0 },
  { categoria: "molho", nome: "Maionese", preco: 0.5 },
  { categoria: "molho", nome: "Mostarda", preco: 0.5 },
  { categoria: "molho", nome: "Especial", preco: 1.5 },
  { categoria: "molho", nome: "Chipotle", preco: 1.75 },
];

// primeira página do BACKEND.
app.get("/", (req, res) => {
  res.send("Byte e Bun API no ar!");
});

// Primeira adição: CARDAPIO.
app.get("/cardapio", (req, res) => {
  res.json(cardapio);
});

// Adicionamos um filtro por categoria no cardapio
app.get("/cardapio/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const filtrados = cardapio.filter((item) => item.categoria === categoria);
  res.json(filtrados);
});

// Fizemos uma função para pegar o preço dos itens.

function buscarPreco(categoria, nome) {
  const item = cardapio.find(
    (item) => (item.categoria === categoria) && (item.nome === nome),
  );
  return item ? item.preco : 0;
}

// Segunda adição: fizemos uma pagina para fazer pedidos

app.post("/pedido", (req, res) => {
  const { pao, recheio, molho } = req.body;
  let cupom = req.body.cupom
  console.log("Cupom recebido:", JSON.stringify(cupom));
  
  // aqui adicionamos uma validação para nao permitir o UNDEFINED.
  if (!pao || !recheio || !molho) {
    return res.json({ erro: "Envie pao, recheio e molho" });
  }
  if (cupom.toUpperCase() === "RAFAELVENTURAPROFESSOR") {
    cupom = true;

    const total =
      (buscarPreco("pao", pao) +
        buscarPreco("recheio", recheio) +
        buscarPreco("molho", molho)) *
      0.85;

    res.json({
      itens: { pao, recheio, molho, cupom },
      total: Number(total.toFixed(2)),
    });
  } else {
    cupom = false;

    const total =
      buscarPreco("pao", pao) +
      buscarPreco("recheio", recheio) +
      buscarPreco("molho", molho);

    res.json({
      itens: { pao, recheio, molho, cupom },
      total: Number(total.toFixed(2)),
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor Rodando em http://localhost:3000");
});
