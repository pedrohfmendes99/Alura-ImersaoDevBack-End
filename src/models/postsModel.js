// Importa a função de conexão com o banco de dados
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão definida como variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts no banco de dados
// Async indica que uma função retornará uma Promise. Isso significa que a função pode levar algum tempo para ser executada, como uma requisição a uma API, e não bloqueará a execução do restante do código.
// Await é usada dentro de uma função assíncrona (marcada com async) para esperar que uma Promise seja resolvida antes de continuar a execução. É como fazer uma pausa na função até que um resultado seja obtido.
 export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instalike"
    const db = conexao.db("imersao-instalike");
    // Seleciona a coleção "posts" do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
        const db = conexao.db("imersao-instalike");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost)
}