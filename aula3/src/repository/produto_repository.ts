import { Produto } from "../model/produto";
import { ProdutoRepositoryInterface } from "./produto_repository.interface";

export class ProdutoRepository implements ProdutoRepositoryInterface {
    private produtos: Produto[] = [];

    public async adicionarProduto(produto: Produto): Promise<any | Error> {
        // Verificar se o produto já existe
        if (this.produtos.some(p => p.id === produto.id)) {
            return Promise.reject(new Error("Produto com este ID já existe."));
        }

        return Promise.resolve(this.produtos.push(produto));
    }

    public async listarProdutos(): Promise<Produto[]> {
        return Promise.resolve(this.produtos);
    }

    public async buscarProdutoPorId(id: number): Promise<Produto | undefined> {
        return Promise.resolve(this.produtos.find(produto => produto.id === id));
    }

    public async removerProduto(id: number): Promise<void> {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        return Promise.resolve();
    }

    public async atualizarProduto(id: number, nome: string, preco: number): Promise<void> {
        const index = this.produtos.findIndex(produto => produto.id === id);
        if (index !== -1) {
            this.produtos[index] = { ...this.produtos[index], nome, preco };
            return Promise.resolve();
        }
        return Promise.resolve(undefined);
    }
        
}