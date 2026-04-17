import { PedidoService } from "../service/pedido.service";
import { Pedidos } from "../entity/Pedidos";
import { errorProcessing } from "../error/error_processing";

export class PedidoController {
    private pedidoService: PedidoService;

    constructor(pedidoService: PedidoService) {
        this.pedidoService = pedidoService;
    }

    public async adicionarPedido(req: any, res: any): Promise<void> {
        try {
            const { id, produto } = req.body;
            await this.pedidoService.adicionarPedido({ id, produto } as Pedidos);
            console.log("Pedido adicionado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async listarPedidos(req: any, res: any): Promise<void> {
        try {
            const pedidos = await this.pedidoService.listarPedidos();
            console.log("Pedidos:", pedidos);
        } catch (error: any) {
            console.error(`Erro inesperado: ${error.message}`);
        }
    }

    public async buscarPedidoPorId(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const pedido = await this.pedidoService.buscarPedidoPorId(id);
            console.log("Pedido encontrado:", pedido);
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async removerPedido(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            await this.pedidoService.removerPedido(id);
            console.log("Pedido removido com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async atualizarPedido(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const { produto } = req.body;
            await this.pedidoService.atualizarPedido(id, new Pedidos(produto));
            console.log("Pedido atualizado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }
}