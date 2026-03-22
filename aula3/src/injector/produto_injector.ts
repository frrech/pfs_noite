import { ProdutoRepository } from "../repository/produto_repository";
import { ProdutoService } from "../service/produto_service";
import { ProdutoController } from "../controller/produto_controller";
import { Produto } from "../interface/produto_interface";

export class ProdutoInjector {
    private produtoRepository: ProdutoRepository;
    private produtoService: ProdutoService;
    private produtoController: ProdutoController;

    constructor() {
        const produtos: Produto[] = [];
        this.produtoRepository = new ProdutoRepository(produtos);
        this.produtoService = new ProdutoService(this.produtoRepository);
        this.produtoController = new ProdutoController(this.produtoService);
    }

    public getController(): ProdutoController {
        return this.produtoController;
    }
}