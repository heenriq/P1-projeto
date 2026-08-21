const express = require("express");
const cors = require("cors");
const app = express();

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
  { categoria: "recheio", nome: "Carne", preco: 6.5 },
  { categoria: "molho", nome: "Maionese", preco: 0.5 },
  { categoria: "molho", nome: "Mostarda", preco: 0.5 },
  { categoria: "molho", nome: "Especial", preco: 1.5 },
  { categoria: "molho", nome: "Chipotle", preco: 1.75 },
];

// ----- exercicio 01 -----
app.get("/", (req, res) => {
  res.send("Byte e Bun API no ar!");
});

// ------ exercicio 02 -----
app.get("/cardapio", (req, res) => {
  res.json(cardapio);
});

// ------ exercicio 03 -----//
app.get("/cardapio/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const filtrados = cardapio.filter((item) => item.categoria === categoria);
  res.json(filtrados);
});

// ---- exercicio 04 - final

function buscarPreco(categoria, nome) {
  const item = cardapio.find(
    (item) => (item.categoria === categoria) & (item.nome === nome),
  );
  return item ? item.preco : 0;
}

app.post("/pedido", (req, res) => {
  const { pao, recheio, molho } = req.body;

  if (!pao || !recheio || !molho) {
    return res.json({ erro: "Envie pao, recheio e molho" });
  }

  const total =
    buscarPreco("pao", pao) +
    buscarPreco("recheio", recheio) +
    buscarPreco("molho", molho);

  res.json({
    itens: { pao, recheio, molho },
    total: Number(total.toFixed(2)),
  });
});

app.listen(3000, () => {
  console.log("Servidor Rodando em http://localhost:3000");
});
