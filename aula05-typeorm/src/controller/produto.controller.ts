import { ProdutoService } from "../service/produto.service";
import { Produto } from "../entity/Produto";
import { errorProcessing } from "../error/error_processing";

export class ProdutoController {
    private produtoService: ProdutoService;

    constructor(produtoService: ProdutoService) {
        this.produtoService = produtoService;
    }

    public async adicionarProduto(req: any, res: any): Promise<void> {
        try{
            const { id, nome, preco, quantidade, categoria } = req.body;
            await this.produtoService.adicionarProduto({ id, nome, preco, quantidade, categoria } as Produto);
            console.log("Produto adicionado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async listarProdutos(req: any, res: any): Promise<void> {
        try {
            const produtos = await this.produtoService.listarProdutos();
            console.log("Produtos:", produtos);
        } catch (error: any) {
            console.error(`Erro inesperado: ${error.message}`);
        }
    }

    public async buscarProdutoPorId(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const produto = await this.produtoService.buscarProdutoPorId(id);
            console.log("Produto encontrado:", produto);
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async removerProduto(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            await this.produtoService.removerProduto(id);
            console.log("Produto removido com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async atualizarProduto(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const { nome, preco, categoria, quantidade } = req.body;
            await this.produtoService.atualizarProduto(id, new Produto(nome, preco, categoria, quantidade));
            console.log("Produto atualizado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async retirar(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;
            const produtoAtualizado = await this.produtoService.retirar(id, quantidade);
            console.log("Produto atualizado após retirada:", produtoAtualizado);
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async depositar(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;
            const produtoAtualizado = await this.produtoService.depositar(id, quantidade);
            console.log("Produto atualizado após depósito:", produtoAtualizado);
        } catch (error: any) {
            errorProcessing(error);
        }
    }
}