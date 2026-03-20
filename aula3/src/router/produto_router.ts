import { ProdutoController } from "../controller/produto_controller";
import express, { Express } from "express";

const app = express();
const port = 3000;
app.use(express.json());

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