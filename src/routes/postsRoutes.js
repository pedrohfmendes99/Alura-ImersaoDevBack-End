import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

 const routes = (app) => {
    // Configura o servidor para interpretar requisições com JSON no corpo
    app.use(express.json());
    // Rota GET para "/posts" que retorna todos os posts do banco de dados
    app.get("/posts", listarPosts);
    // Rota POST para criar um post
    app.post("/posts", postarNovoPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)

}

export default routes;