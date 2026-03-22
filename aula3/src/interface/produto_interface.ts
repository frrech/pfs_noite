export interface Produto {
    id: number;
    nome: string;
    preco: number;
}

export interface ProdutoSetter {
    setProdutos(produtos: Produto[]): void;
}
