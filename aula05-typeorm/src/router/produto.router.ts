import { ProdutoController } from "../controller/produto.controller";

export class ProdutoRouter {
    private produtoController: ProdutoController;

    constructor(produtoController: ProdutoController) {
        this.produtoController = produtoController;
    }

    public setupRoutes(app: any): void {
        app.post("/produtos", (req: any, res: any) => this.produtoController.adicionarProduto(req, res));
        app.get("/produtos", (req: any, res: any) => this.produtoController.listarProdutos(req, res));
        app.get("/produtos/:id", (req: any, res: any) => this.produtoController.buscarProdutoPorId(req, res));
        app.delete("/produtos/:id", (req: any, res: any) => this.produtoController.removerProduto(req, res));
        app.put("/produtos/:id", (req: any, res: any) => this.produtoController.atualizarProduto(req, res));
        app.post("/produtos/:id/depositar", (req: any, res: any) => this.produtoController.depositar(req, res));
        app.post("/produtos/:id/retirar", (req: any, res: any) => this.produtoController.retirar(req, res));
    }

}