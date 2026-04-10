import { ProdutoRepository } from "./repository/produto_repository";
import { ProdutoController } from "./controller/produto_controller";
import { ProdutoRouter } from "./router/produto_router";
import { ProdutoService } from "./service/produto_service";
import { InjectorInterface } from "./injector_interface";
export class Injector implements InjectorInterface {   
    constructor() {
        this.criarProdutoRouter();
    } 
    public criarProdutoRouter(): ProdutoRouter {
        const produtoRepository = new ProdutoRepository();
        const produtoService = new ProdutoService(produtoRepository);
        const produtoController = new ProdutoController(produtoService);
        return new ProdutoRouter(produtoController);
    }
}