import { ProdutoRepository } from "../repository/produto_repository";
import { ValidationError } from "../error/validation_error";

export class ProdutoService {
    private produtoRepository: ProdutoRepository;

    constructor(produtoRepository: ProdutoRepository) {
        this.produtoRepository = produtoRepository;
    }

    private verificarProduto(id: number, nome: string, preco: number): boolean {
        return id <= 0 || nome.trim() === "" || preco <= 0;
    }

    public adicionarProduto(id: number, nome: string, preco: number): void {
        if (this.verificarProduto(id, nome, preco)) {
            let error = new ValidationError("O ID do produto deve ser um número positivo.", 400);// Bad Request
            throw error;
        }
        const produto = { id, nome, preco };
        if (this.produtoRepository.buscarProdutoPorId(id)) {
            let error = new ValidationError(`Produto com id ${id} já existe.`, 409); // Conflict
            throw error;
        }
        this.produtoRepository.adicionarProduto(produto);
    }

    public listarProdutos() {
        return this.produtoRepository.listarProdutos();
    }

    public buscarProdutoPorId(id: number) {
        if (id <= 0) {
            let error = new ValidationError("O ID do produto deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        const produto = this.produtoRepository.buscarProdutoPorId(id);
        if (!produto) {
            let error = new ValidationError(`Produto com id ${id} não encontrado.`, 404); // NOT FOUND
            throw error;
        }
        return produto;
    }

    public removerProduto(id: number): void {
        if (id <= 0) {
            const error = new ValidationError("O ID do produto deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        const produto = this.produtoRepository.buscarProdutoPorId(id);
        if (!produto) {
            const error = new ValidationError(`Produto com id ${id} não encontrado.`, 404); // NOT FOUND
            throw error;
        }
        this.produtoRepository.removerProduto(id);
    }

    public atualizarProduto(id: number, nome: string, preco: number): void {
        if (this.verificarProduto(id, nome, preco)) {
            const error = new ValidationError("O ID do produto deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        const produtoAtualizado = { id, nome, preco };
        const produtoExistente = this.produtoRepository.buscarProdutoPorId(id);

        if (!produtoExistente) {
            const error = new ValidationError(`Produto com id ${id} não encontrado.`, 404); // NOT FOUND
            throw error;
        }
        this.produtoRepository.atualizarProduto(id, produtoAtualizado);
    }
}