import {PedidoRepository} from "../repository/pedido.repository";
import {Pedidos} from "../entity/Pedidos";
import {ValidationError} from "../error/validation_error";
import { Produto } from "../entity/Produto";

export class PedidoService {
    private pedidoRepository: PedidoRepository;

    constructor(pedidoRepository: PedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public async adicionarPedido(pedido: Pedidos): Promise<void> {
        const { produto } = pedido;
        if (!produto || !(produto instanceof Produto) || produto.nome.trim() === "") {
            throw new ValidationError("Produto é obrigatório");
        }
        await this.pedidoRepository.save(pedido);
    }

    public async listarPedidos() {
        return await this.pedidoRepository.findAll();
    }

    public async buscarPedidoPorId(id: number) {
        if (id <= 0) {
            throw new ValidationError("O ID do pedido deve ser um número positivo.", 400); // Bad Request
        }
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new ValidationError(`Pedido com id ${id} não encontrado.`, 404); // NOT FOUND
        }
        return pedido;
    }

    public async removerPedido(id: number): Promise<void> {
        if (id <= 0) {
            throw new ValidationError("O ID do pedido deve ser um número positivo.", 400); // Bad Request
        }
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new ValidationError(`Pedido com id ${id} não encontrado.`, 404); // NOT FOUND
        }
        await this.pedidoRepository.delete(pedido.id);
    }

    public async atualizarPedido(id: number, pedido: Pedidos): Promise<void> {
        if (id <= 0) {
            throw new ValidationError("O ID do pedido deve ser um número positivo.", 400); // Bad Request
        }
        const existingPedido = await this.pedidoRepository.findById(id);
        if (!existingPedido) {
            throw new ValidationError(`Pedido com id ${id} não encontrado.`, 404); // NOT FOUND
        }
        await this.pedidoRepository.update(id, pedido);
    }
}