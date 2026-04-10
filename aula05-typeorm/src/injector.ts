import { ProdutoRepository } from "./repository/produto.repository";
import { ProdutoService } from "./service/produto.service";
import { ProdutoController } from "./controller/produto.controller";
import { ProdutoRouter } from "./router/produto.router";
import { CategoriaController } from "./controller/categoria.controller";
import { CategoriaRepository } from "./repository/categoria.repository";
import { CategoriaService } from "./service/categoria.service";
import { CategoriaRouter } from "./router/categoria.router";
export class Injector {
    public static createProdutoRouter(): ProdutoRouter {
        const produtoRepository = new ProdutoRepository();
        const produtoService = new ProdutoService(produtoRepository);
        const produtoController = new ProdutoController(produtoService);
        return new ProdutoRouter(produtoController);
    }
    public static createCategoriaRouter(): CategoriaRouter {
        const categoriaRepository = new CategoriaRepository();
        const categoriaService = new CategoriaService(categoriaRepository);
        const categoriaController = new CategoriaController(categoriaService);
        return new CategoriaRouter(categoriaController);
    }
}