// Importa o framework Express, usado para criar e gerenciar rotas e middlewares
import express from "express";
// Importa o módulo Multer, utilizado para lidar com uploads de arquivos em requisições
import multer from "multer";
// Importa as funções do controlador de posts, que contêm a lógica para lidar com as rotas de posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
    // Define o destino onde os arquivos enviados serão armazenados
    destination: function (req, file, cb) {
        // Salva os arquivos na pasta "uploads/"
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo no armazenamento local
    filename: function (req, file, cb) {
        // Utiliza o nome original do arquivo enviado
        cb(null, file.originalname);
    }
});

// Configura o middleware do Multer para lidar com uploads de arquivos
// Define o destino padrão "./uploads" e utiliza o armazenamento configurado anteriormente
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação em uma função que recebe o aplicativo Express como argumento
 const routes = (app) => {

    // Configura o servidor para interpretar requisições com JSON no corpo
    app.use(express.json());
    app.use(cors(corsOptions));
    
    // Define uma rota GET em "/posts" para listar todos os posts do banco de dados. A função `listarPosts` do controlador é usada para lidar com essa rota
    app.get("/posts", listarPosts);
    
    // Define uma rota POST em "/posts" para criar um novo post. A função `postarNovoPost` do controlador é usada para lidar com essa rota
    app.post("/posts", postarNovoPost);
    
    // Define uma rota POST em "/upload" para realizar o upload de uma imagem. O middleware Multer (`upload.single("imagem")`) processa o arquivo enviado. A função `uploadImagem` do controlador é usada para manipular o upload
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // inserir comentário
    app.put("/upload/:id", atualizarNovoPost)

};

// Exporta as rotas para serem usadas em outros módulos da aplicação
export default routes;