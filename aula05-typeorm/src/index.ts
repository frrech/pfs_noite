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
        app.use('/produtos', Injector.createProdutoRouter().setupRoutes(app));
        app.use('/categorias', Injector.createCategoriaRouter().setupRoutes(app));
        app.use('/users', Injector.createUserRouter().setupRoutes(app));
        app.use('/pedidos', Injector.createPedidoRouter().setupRoutes(app));
        app.use((err: any, req: any, res: any) => {
            console.error("Erro não tratado:", err);
            res.status(500).json({ error: "Ocorreu um erro inesperado." });
        });
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}.`);
        });
    }).catch((error) => {
        console.error("Erro ao conectar com o banco de dados:", error);
    });
}

main();