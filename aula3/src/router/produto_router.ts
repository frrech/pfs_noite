import { error } from "console";
import { ProdutoController } from "../controller/produto_controller";
import express, { Express } from "express";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    private produtoController: ProdutoController;

    constructor(produtoController: ProdutoController) {
        this.produtoController = produtoController;
    }

    public configurarRotas(): void {
        app.post('/produtos', (req, res) => this.produtoController.adicionarProduto(req, res));
        app.get('/produtos', (req, res) => this.produtoController.listarProdutos(req, res));
        app.get('/produtos/:id', (req, res) => this.produtoController.buscarProdutoPorId(req, res));
        app.delete('/produtos/:id', (req, res) => this.produtoController.removerProduto(req, res));
        app.put('/produtos/:id', (req, res) => this.produtoController.atualizarProduto(req, res));
    }
}