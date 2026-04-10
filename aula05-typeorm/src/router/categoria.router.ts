import { CategoriaController } from "../controller/categoria.controller";

export class CategoriaRouter {
    private categoriaController: CategoriaController;

    constructor(categoriaController: CategoriaController) {
        this.categoriaController = categoriaController;
    }

    public setupRoutes(app: any): void {
        app.get("/categorias", (req: any, res: any) => this.categoriaController.listarCategorias(req, res));
        app.get("/categorias/:id", (req: any, res: any) => this.categoriaController.buscarCategoriaPorId(req, res));
        app.post("/categorias", (req: any, res: any) => this.categoriaController.criarCategoria(req, res));
        app.put("/categorias/:id", (req: any, res: any) => this.categoriaController.atualizarCategoria(req, res));
        app.delete("/categorias/:id", (req: any, res: any) => this.categoriaController.deletarCategoria(req, res));
    }
}