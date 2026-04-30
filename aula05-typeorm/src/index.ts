import { AppDataSource } from "./data-source";
import { Injector } from "./injector";
import { AuthMiddleware } from "./middleware/auth.middleware";
const express = require('express');
const app = express();

function main() {
    console.log("Aplicação iniciada.");
    AppDataSource.initialize().then( () => {
        console.log("Conexão com o banco de dados estabelecida.");
        app.use(express.json());
        
        const authMiddleware = new AuthMiddleware();

        // Public routes (no authentication required)
        app.use('/auth', Injector.createAuthRouter().setupRoutes(app));
        app.use('/categorias', Injector.createCategoriaRouter().setupRoutes(app));
        app.use('/produtos', Injector.createProdutoRouter().setupRoutes(app));
        
        // Protected routes (authentication required)
        app.use('/users', authMiddleware.authenticate, Injector.createUserRouter().setupRoutes(app));
        app.use('/pedidos', authMiddleware.authenticate, Injector.createPedidoRouter().setupRoutes(app));
        
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