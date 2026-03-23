import { ProdutoSetter, Produto } from "../interface/produto_interface";

export class ProdutoRepository implements ProdutoSetter{
    private produtos: Produto[] = [];

    constructor(newProdutos: Produto[]){
        this.produtos = newProdutos;
    }

    public setProdutos(produtos: Produto[]): void {
        this.produtos = produtos;
    }

    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto);
    }

    public listarProdutos(): Produto[]{
        return this.produtos;
    }

    public buscarProdutoPorId(id: number): Produto | undefined {
        return this.produtos.find(produto => produto.id === id);
    }

    public removerProduto(id: number): void {
        const index = this.produtos.findIndex(produto => produto.id === id);
        if (index !== -1) {
            this.produtos.splice(index, 1);
        }
    }

    public atualizarProduto(id: number, produtoAtualizado: Produto): void {
        const index = this.produtos.findIndex(produto => produto.id === id);
        if (index !== -1) {
            this.produtos[index] = produtoAtualizado;
        }
    }
        
}