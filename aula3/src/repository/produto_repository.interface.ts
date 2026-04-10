import { Produto } from "../model/produto";
export interface ProdutoRepositoryInterface {
    adicionarProduto(produto: Produto): Promise<void>;
    listarProdutos(): Promise<Produto[]>;
    buscarProdutoPorId(id: number): Promise<Produto | undefined>;
    removerProduto(id: number): Promise<void>;
    atualizarProduto(id: number, nome: string, preco: number): Promise<void>;
}