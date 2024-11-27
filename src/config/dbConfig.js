import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao cluster do banco de dados...");
        await mongoClient.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!");

        return mongoClient;
    } catch (erro) {
        console.error("Falha na conexão com o banco de dados!", erro);
        process.exit();
    }
}

// Este arquivo, chamado "dbConfig.js", configura e exporta uma função assíncrona para conectar-se a um banco de dados MongoDB usando o driver oficial do MongoDB para Node.js.
// A função `conectarAoBanco` recebe uma string de conexão (geralmente fornecida como variável de ambiente) e tenta estabelecer uma conexão com o banco de dados.
// Se a conexão for bem-sucedida, retorna uma instância do `MongoClient` conectada ao cluster do MongoDB.
// Em caso de erro, exibe uma mensagem no console com o problema e encerra o processo.