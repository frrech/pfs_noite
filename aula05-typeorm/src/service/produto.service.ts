import { ProdutoRepository } from "../repository/produto.repository";
import { ValidationError } from "../error/validation_error";
import { Produto } from "../entity/Produto";
import { Categoria } from "../entity/Categoria";

export class ProdutoService {
    private produtoRepository: ProdutoRepository;

    constructor(produtoRepository: ProdutoRepository) {
        this.produtoRepository = produtoRepository;
    }

    private verificarProduto(nome: string, preco: number, categoria: Categoria): boolean {
        return nome.trim() === "" || preco <= 0 || !categoria || !categoria.id || categoria.id <= 0;
    }

    public async adicionarProduto(produto: Produto): Promise<void> {
        const { nome, preco, categoria } = produto;
        if (this.verificarProduto(nome, preco, categoria)) {
            let error = new ValidationError("O ID do produto deve ser um número positivo.", 400);// Bad Request
            throw error;
        }
        if (await this.produtoRepository.findById(produto.id)) {
            let error = new ValidationError(`Produto com id ${produto.id} já existe.`, 409); // Conflict
            throw error;
        }
        await this.produtoRepository.save(produto);
    }

    public async listarProdutos() {
        return await this.produtoRepository.findAll();
    }

    public async buscarProdutoPorId(id: number) {
        if (id <= 0) {
            let error = new ValidationError("O ID do produto deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        const produto = await this.produtoRepository.findById(id);
        if (!produto) {
            let error = new ValidationError(`Produto com id ${id} não encontrado.`, 404); // NOT FOUND
            throw error;
        }
        return produto;
    }

    public async removerProduto(id: number): Promise<void> {
        if (id <= 0) {
            const error = new ValidationError("O ID do produto deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        const produto = await this.produtoRepository.findById(id);
        if (!produto) {
            const error = new ValidationError(`Produto com id ${id} não encontrado.`, 404); // NOT FOUND
            throw error;
        }
        await this.produtoRepository.delete(produto.id);
    }

    public async atualizarProduto(id: number, produto: Produto): Promise<void> {
        const { nome, preco, categoria } = produto;
        if (this.verificarProduto(nome, preco, categoria)) {
            const error = new ValidationError("O ID do produto deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        const produtoExistente = await this.produtoRepository.findById(produto.id);

        if (!produtoExistente) {
            const error = new ValidationError(`Produto com id ${produto.id} não encontrado.`, 404); // NOT FOUND
            throw error;
        }
        await this.produtoRepository.update(produto.id, produto);
    }

    public async depositar(id: number, quantidade: number): Promise<Produto> {
        if (quantidade <= 0) {
            const error = new ValidationError("A quantidade a ser depositada deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        return this.produtoRepository.depositar(id, quantidade).then(produto => {
            if (!produto) {
                const error = new ValidationError(`Produto com id ${id} não encontrado.`, 404); // NOT FOUND
                throw error;
            }
            return produto;
        });
    }

    public async retirar(id: number, quantidade: number): Promise<Produto> {
        if (quantidade <= 0) {
            const error = new ValidationError("A quantidade a ser retirada deve ser um número positivo.", 400); // Bad Request
            throw error;
        }
        return this.produtoRepository.retirar(id, quantidade).then(produto => {
            if (!produto) {
                const error = new ValidationError(`Produto com id ${id} não encontrado.`, 404); // NOT FOUND
                throw error;
            }
            if (produto.quantidade < 0) {
                const error = new ValidationError("A quantidade do produto não pode ser negativa.", 400); // Bad Request
                throw error;
            }
            return produto;
        });
    }
}