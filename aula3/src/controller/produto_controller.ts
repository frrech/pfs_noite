import { ProdutoService } from "../service/produto_service";
import { errorProcessing } from "../error/validation_error";


export class ProdutoController {
    private produtoService: ProdutoService;

    constructor(produtoService: ProdutoService) {
        this.produtoService = produtoService;
    }

    public adicionarProduto(req: any, res: any): void {
        try{
            const { id, nome, preco } = req.body;
            this.produtoService.adicionarProduto(id, nome, preco);
            console.log("Produto adicionado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public listarProdutos(req: any, res: any): void {
        try {
            const produtos = this.produtoService.listarProdutos();
            console.log("Produtos:", produtos);
        } catch (error: any) {
            console.error(`Erro inesperado: ${error.message}`);
        }
    }

    public buscarProdutoPorId(req: any, res: any): void {
        try {
            const { id } = req.params;
            const produto = this.produtoService.buscarProdutoPorId(id);
            console.log("Produto encontrado:", produto);
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public removerProduto(req: any, res: any): void {
        try {
            const { id } = req.params;
            this.produtoService.removerProduto(id);
            console.log("Produto removido com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public atualizarProduto(req: any, res: any): void {
        try {
            const { id } = req.params;
            const { nome, preco } = req.body;
            this.produtoService.atualizarProduto(id, nome, preco);
            console.log("Produto atualizado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }
}