# 🥪 P1 Projeto — Primeiro Projeto de Pedro H. Santos

Aplicação web full stack de uma lanchonete fictícia, com montagem interativa de sanduíches (pão + recheio + molho), cálculo automático de preço e sistema de cupom de desconto.

> No código (nome do pacote, endpoint inicial da API etc.) o projeto ainda mantém o codinome interno **"Byte e Bun"**, herdado da primeira versão — mas o projeto em si se chama **P1 Projeto**.

O projeto é dividido em **backend** (API REST em Node.js/Express) e **frontend** (HTML, CSS e JavaScript puro), e evoluiu em três branches, cada uma acrescentando uma funcionalidade nova sobre a anterior.

---

## 📚 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Branches do repositório](#-branches-do-repositório)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Como rodar o projeto localmente](#-como-rodar-o-projeto-localmente)
- [Endpoints da API](#-endpoints-da-api)
- [Deploy](#-deploy)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 🍞 Sobre o projeto

O **P1 Projeto** é uma calculadora de sanduíche interativa: o usuário escolhe um tipo de pão, um recheio e um molho em três menus suspensos, e a aplicação consulta o backend para calcular o valor total do pedido.

O projeto nasceu como um desafio final de estudos e foi crescendo em funcionalidades a cada branch, simulando um fluxo real de desenvolvimento incremental (feature branches).

## 🌿 Branches do repositório

| Branch | Descrição |
|---|---|
| `main` | Versão base: seleção de pão/recheio/molho e cálculo do total do pedido via API. |
| `cardapio` | Adiciona uma segunda tela ("Ver Cardápio") que exibe todos os itens disponíveis em cards com imagem, nome e preço, organizados por categoria. |
| `new-feature` | Adiciona um campo de **cupom de desconto**: ao digitar o código `RAFAELVENTURAPROFESSOR`, o pedido recebe 15% de desconto automaticamente. |

> 💡 Cada branch pode ser testada individualmente — os arquivos de frontend e backend são autocontidos em cada uma.

## 🛠 Tecnologias utilizadas

**Backend**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) `^5.2.1`
- [CORS](https://www.npmjs.com/package/cors) `^2.8.6`

**Frontend**
- HTML5
- CSS3
- JavaScript (Vanilla, sem frameworks)

## 📁 Estrutura de pastas

```
P1-projeto/
├── backend/
│   ├── server.js         # API Express (rotas de cardápio e pedido)
│   ├── package.json
│   └── .gitignore
└── frontend/
    ├── index.html         # Tela da calculadora de sanduíche
    ├── script.js          # Consumo da API e lógica da interface
    ├── style.css
    └── favicon.png
```

> Na branch `cardapio`, a pasta `frontend/` também contém as imagens dos pães, recheios e molhos usadas na tela de cardápio visual.

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (recomendado v18+)
- Um navegador para abrir o frontend

### 1. Clone o repositório
```bash
git clone https://github.com/heenriq/P1-projeto.git
cd P1-projeto
```

Se quiser testar uma branch específica:
```bash
git checkout cardapio      # ou new-feature
```

### 2. Suba o backend
```bash
cd backend
npm install
npm start
```
O servidor sobe em `http://localhost:3000`.

### 3. Abra o frontend
Abra o arquivo `frontend/index.html` diretamente no navegador, ou sirva a pasta com uma extensão como o **Live Server** do VS Code (porta padrão esperada: `5500`).

O `script.js` já detecta automaticamente se está rodando em `localhost` (usa a API local) ou em produção (usa a API hospedada no Render).

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Mensagem de status ("Byte e Bun API no ar!" — codinome interno da API). |
| `GET` | `/cardapio` | Retorna todos os itens do cardápio (pães, recheios e molhos). |
| `GET` | `/cardapio/:categoria` | Retorna apenas os itens de uma categoria (`pao`, `recheio` ou `molho`). |
| `POST` | `/pedido` | Recebe `{ pao, recheio, molho }` (e `cupom` na branch `new-feature`) e retorna o total calculado. |

**Exemplo de requisição `POST /pedido`:**
```json
{
  "pao": "Frances",
  "recheio": "Frango",
  "molho": "Especial"
}
```

**Exemplo de resposta:**
```json
{
  "itens": { "pao": "Frances", "recheio": "Frango", "molho": "Especial" },
  "total": 7.0
}
```

## ☁️ Deploy

O backend do projeto está hospedado no [Render](https://render.com/), e o frontend se conecta automaticamente a ele quando não está rodando em `localhost`.

## 👤 Autor

**Pedro H. Santos**

## 📄 Licença

Este projeto está sob a licença ISC — veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
