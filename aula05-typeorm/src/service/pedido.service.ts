import {PedidoRepository} from "../repository/pedido.repository";
import {Pedidos} from "../entity/Pedidos";
import {ValidationError} from "../error/validation_error";
import { Produto } from "../entity/Produto";

export class PedidoService {
    private pedidoRepository: PedidoRepository;

    constructor(pedidoRepository: PedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    private verificarPedido(produto: Produto): boolean {
        return !produto || !(produto instanceof Produto) || produto.nome.trim() === "";
    }

    private validateId(id: number): void {
        if (id <= 0) {
            throw new ValidationError("O ID do pedido deve ser um número positivo.", 400);
        }
    }

    private async validatePedidoExists(id: number): Promise<Pedidos> {
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new ValidationError(`Pedido com id ${id} não encontrado.`, 404);
        }
        return pedido;
    }

    public async adicionarPedido(pedido: Pedidos): Promise<void> {
        const { produto } = pedido;
        if (this.verificarPedido(produto)) {
            throw new ValidationError("Produto é obrigatório", 400); // Bad Request
        }
        await this.pedidoRepository.save(pedido);
    }

    public async listarPedidos() {
        return await this.pedidoRepository.findAll();
    }

    public async buscarPedidoPorId(id: number) {
        this.validateId(id);
        const pedido = await this.pedidoRepository.findById(id);
        await this.validatePedidoExists(id);
        return pedido;
    }

    public async removerPedido(id: number): Promise<void> {
        this.validateId(id);
        await this.validatePedidoExists(id);
        const pedido = await this.pedidoRepository.findById(id);
        await this.pedidoRepository.delete(pedido.id);
    }


    public async atualizarPedido(id: number, pedido: Pedidos): Promise<void> {
        this.validateId(id);
        await this.validatePedidoExists(id);
        const existingPedido = await this.pedidoRepository.findById(id);
        if (!existingPedido) {
            throw new ValidationError(`Pedido com id ${id} não encontrado.`, 404); // NOT FOUND
        }
        await this.pedidoRepository.update(id, pedido);
    }
}