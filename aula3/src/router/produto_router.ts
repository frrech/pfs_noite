import { error } from "console";
import { ProdutoController } from "../controller/produto_controller";
<<<<<<< HEAD
import express, { Express } from "express";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
=======
import { Express } from "express";
>>>>>>> bfce51b1bb518410bbe62ad982c7381d695d14c1

function errorProcessing(error: any): void {
    if (error instanceof Error) {
        console.error(`Erro: ${error.message}`);
    }
    } else if (error.statusCode) {
        console.error(`Erro de validação: ${error.message} (Status Code: ${error.statusCode})`);
    } else {
            console.error(`Erro inesperado: ${error}`);
}
export class ProdutoRouter {
    private app: Express;
    private produtoController: ProdutoController;

    constructor(app: Express, produtoController: ProdutoController) {
        this.app = app;
        this.produtoController = produtoController;
    }

    public configurarRotas(): void {
        this.app.post('/produtos', (req, res) => this.produtoController.adicionarProduto(req, res));
        this.app.get('/produtos', (req, res) => this.produtoController.listarProdutos(req, res));
        this.app.get('/produtos/:id', (req, res) => this.produtoController.buscarProdutoPorId(req, res));
        this.app.delete('/produtos/:id', (req, res) => this.produtoController.removerProduto(req, res));
        this.app.put('/produtos/:id', (req, res) => this.produtoController.atualizarProduto(req, res));
    }
}