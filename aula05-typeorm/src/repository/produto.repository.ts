import { Produto } from "../entity/Produto";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export class ProdutoRepository {
    private repository: Repository<Produto>;

    constructor() {
        this.repository = AppDataSource.getRepository(Produto);
    }

    async save(produto: Produto): Promise<Produto> {
        return this.repository.save(produto);
    }

    async findAll(): Promise<Produto[]> {
        return await this.repository.find({ relations: ["categoria"] });
    }

    async findById(id: number): Promise<Produto | null> {
        if (id){
            return await this.repository.findOne({ where: { id }, relations: ["categoria"] });
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        if (id){
            await this.repository.delete(id);
        }
        return
    }

    async update(id: number, produto: Partial<Produto>): Promise<Produto | null> {
        if (id){
            const existingProduto = await this.findById(id);
            if (!existingProduto) {
                return null;
            }
            const updatedProduto = { ...existingProduto, ...produto };
            await this.repository.save(updatedProduto);
            return updatedProduto;
        }
        return null;
    }

    depositar(id: number, quantidade: number): Promise<Produto | null> {
        return this.findById(id).then(produto => {
            if (!produto) {
                return null;
            }
            produto.quantidade += quantidade;
            return this.repository.save(produto);
        });
    }

    retirar(id: number, quantidade: number): Promise<Produto | null> {
        return this.findById(id).then(produto => {
            if (!produto) {
                return null;
            }
            produto.quantidade -= quantidade;
            return this.repository.save(produto);
        });
    }
}