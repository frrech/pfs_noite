import { AppDataSource } from "./data-source";
import { Injector } from "./injector";
import { AuthMiddleware } from "./middleware/auth.middleware";
const express = require('express');
const app = express();

function main() {
    console.log("Aplicação iniciada.");
    AppDataSource.initialize().then(() => {
        console.log("Conexão com o banco de dados estabelecida.");
        app.use(express.json());
        
        const authMiddleware = new AuthMiddleware();

        // Public routes
        app.use('/auth', Injector.createAuthRouter().setupRoutes(app));
        app.use('/categorias', Injector.createCategoriaRouter().setupRoutes(app));
        app.use('/produtos', Injector.createProdutoRouter().setupRoutes(app));
        
        // Protected routes
        app.use('/users', authMiddleware.authenticate.bind(authMiddleware), Injector.createUserRouter().setupRoutes(app));
        app.use('/pedidos', authMiddleware.authenticate.bind(authMiddleware), Injector.createPedidoRouter().setupRoutes(app));
        
        app.use((err: any, req: any, res: any, next: any) => {
            console.error("Erro não tratado:", err);
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({ error: err.message || "Ocorreu um erro inesperado." });
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}.`);
        });
    }).catch((error) => {
        console.error("Erro ao conectar com o banco de dados:", error);
        process.exit(1);
    });
}

main();