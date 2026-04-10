import { AppDataSource } from "./data-source";
import { Injector } from "./injector";
const express = require('express');
const app = express();

const produtoRouter = Injector.createProdutoRouter();
const categoriaRouter = Injector.createCategoriaRouter();

function main() {
    console.log("Aplicação iniciada.");
    AppDataSource.initialize().then(() => {
        console.log("Conexão com o banco de dados estabelecida.");
        app.use(express.json());
        app.use('/produtos', produtoRouter.setupRoutes(app));
        app.use('/categorias', categoriaRouter.setupRoutes(app));
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}.`);
        });
    }).catch((error) => {
        console.error("Erro ao conectar com o banco de dados:", error);
    });
}

main();