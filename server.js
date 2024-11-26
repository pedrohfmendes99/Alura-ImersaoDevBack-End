import express from "express";

// Array de posts
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 2,
        descricao: "Gato curioso na janela",
        imagem: "https://placecats.com/neo/300/200",
    },
    {
        id: 3,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats.com/millie_neo/300/200",
    },
    {
        id: 4,
        descricao: "Gato descansando no sofá",
        imagem: "https://placecats.com/neo_banana/300/200",
    },
    {
        id: 5,
        descricao: "Gato explorando o jardim",
        imagem: "https://placecats.com/neo_2/300/200",
    },
    {
        id: 6,
        descricao: "Gato assistindo TV",
        imagem: "https://placecats.com/bella/300/200",
    },
];

const app = express();

// Indicando que a aplicação usa a funcionalidade de converter estruturas em JSON
app.use(express.json());

// Sinalizando que estamos consumindo a porta 3000 - http://localhost:3000/ - e gera um log no terminal de que o servidor está sendo executado/escutando
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Quando passado na URL ".../posts", devolverá a lista completa do array - http://localhost:3000/posts
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

// A função está recebendo um número ID, depois entra no array de posts e entra em cada um dos objetos que estão dentro do Array. Consulta se o ID bate o passado na função (linha 53)
function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

// Quando passado na URL "posts/id", devolverá o ID equivalente da lista de array - http://localhost:3000/posts/2
app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});