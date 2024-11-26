// Importa o framework Express para criar e gerenciar o servidor
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Define um array de posts de exemplo com id, descrição e imagem
// const posts = [
//     {
//         id: 1,
//         descricao: "Uma foto teste",
//         imagem: "https://placecats.com/millie/300/150",
//     },
//     {
//         id: 2,
//         descricao: "Gato curioso na janela",
//         imagem: "https://placecats.com/neo/300/200",
//     },
//     {
//         id: 3,
//         descricao: "Gato brincando com um novelo de lã",
//         imagem: "https://placecats.com/millie_neo/300/200",
//     },
// ];

// Cria uma aplicação Express
const app = express();
routes(app);


// Inicia o servidor na porta 3000 e imprime uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor escutando...");
});