import { Categoria } from "../entity/Categoria";
import { CategoriaRepository } from "../repository/categoria.repository";
import { ValidationError } from "../error/validation_error";
export class CategoriaService {
    private categoriaRepository: CategoriaRepository;

    constructor(categoriaRepository?: CategoriaRepository) {
        this.categoriaRepository = categoriaRepository || new CategoriaRepository();
    }

    async findAll(): Promise<Categoria[]> {
        try {
            return await this.categoriaRepository.findAll();
        } catch (error) {
            throw new ValidationError("Erro ao buscar categorias: " + error.message, 500);
        }
    }

    async findById(id: number): Promise<Categoria | null> {
        if (id <= 0) {
            throw new ValidationError("O ID da categoria deve ser um número positivo.", 400);
        }
        return this.categoriaRepository.findById(id);
    }

    async create(categoria: Categoria): Promise<Categoria> {
        if (categoria.id && categoria.id <= 0) {
            throw new ValidationError("O ID da categoria deve ser um número positivo.", 400);
        }
        return this.categoriaRepository.create(categoria);
    }

    async update(id: number, categoria: Partial<Categoria>): Promise<Categoria | null> {
        if (id <= 0) {
            throw new ValidationError("O ID da categoria deve ser um número positivo.", 400);
        }
        if (categoria.id && categoria.id <= 0) {
            throw new ValidationError("O ID da categoria deve ser um número positivo.", 400);
        }
        return this.categoriaRepository.update(id, categoria);
    }

    async delete(id: number): Promise<boolean> {
        if (id <= 0) {
            throw new ValidationError("O ID da categoria deve ser um número positivo.", 400);
        }
        return this.categoriaRepository.delete(id);
    }
}