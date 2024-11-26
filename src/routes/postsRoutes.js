import express from "express";
import { listarPosts } from "../controllers/postsController.js";

 const routes = (app) => {
    // Configura o servidor para interpretar requisições com JSON no corpo
    app.use(express.json());
    // Rota GET para "/posts" que retorna todos os posts do banco de dados
    app.get("/posts", listarPosts);
}

export default routes;