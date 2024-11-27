// Importa as funções do modelo de dados para interagir com o banco de dados
import {getTodosPosts , criarPost, atualizarPost} from "../models/postsModel.js";
// Importa o módulo fs (file system) para manipulação de arquivos no sistema operacional
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";


// Define uma função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Obtém todos os posts do banco de dados
    const posts = await getTodosPosts();
    // Retorna os posts como uma resposta em JSON com o status 200 (OK)
    res.status(200).json(posts);
}

// Define uma função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Captura os dados do novo post enviados no corpo da requisição
    const novoPost = req.body;

    try {
        // Chama a função para criar o post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Retorna o post criado como uma resposta em JSON com o status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Exibe o erro no console, caso ocorra
        console.error(erro.message);
        // Retorna uma resposta de erro com status 500 (Erro interno do servidor)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Define uma função assíncrona para realizar o upload de uma imagem
export async function uploadImagem(req, res) {
    // Cria um objeto para representar o novo post com informações básicas da imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Nome do arquivo enviado
        alt: "" // Texto alternativo vazio, pode ser preenchido posteriormente
    };

    try {
        // Salva o novo post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Gera um novo caminho para renomear a imagem com o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia o arquivo enviado para o novo caminho
        fs.renameSync(req.file.path, imagemAtualizada);

        // Retorna o post criado como uma resposta em JSON com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Exibe o erro no console, caso ocorra
        console.error(erro.message);
        // Retorna uma resposta de erro com status 500 (Erro interno do servidor)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Inserir comentários
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    const post = {
        imgUrl: urlImagem,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}