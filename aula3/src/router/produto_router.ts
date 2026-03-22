import { ProdutoController } from "../controller/produto_controller";
import { Express } from "express";

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