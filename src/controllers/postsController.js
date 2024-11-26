import getTodosPosts from "../models/postsModel.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar todos os posts do banco de dados
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e retorna os posts como resposta em formato JSON
    res.status(200).json(posts);
    }