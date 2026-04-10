import { CategoriaService } from "../service/categoria.service";
import { Categoria } from "../entity/Categoria";
import { errorProcessing } from "../error/error_processing";

export class CategoriaController {
    private categoriaService: CategoriaService;
    constructor(categoriaService: CategoriaService) {
        this.categoriaService = categoriaService;
    }

    public async listarCategorias(req: any, res: any): Promise<void> {
        try {
            const categorias = await this.categoriaService.findAll();
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async buscarCategoriaPorId(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const categoria = await this.categoriaService.findById(Number(id));
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async criarCategoria(req: any, res: any): Promise<void> {
        try {
            const { id, nome } = req.body;
            const novaCategoria = await this.categoriaService.create({ id, nome } as Categoria);
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async atualizarCategoria(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const categoriaAtualizada = await this.categoriaService.update(Number(id), { nome });
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async deletarCategoria(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const sucesso = await this.categoriaService.delete(Number(id));
        } catch (error: any) {
            errorProcessing(error);
        }
    }
}