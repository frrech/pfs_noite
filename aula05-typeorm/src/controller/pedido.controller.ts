import { PedidoService } from "../service/pedido.service";
import { Pedidos } from "../entity/Pedidos";
import { User } from "../entity/User";
import { Produto } from "../entity/Produto";
import { handleRequest } from "../utils/request_handler";

export class PedidoController {
    private pedidoService: PedidoService;

    constructor(pedidoService: PedidoService) {
        this.pedidoService = pedidoService;
    }

    public async adicionarPedido(req: any, res: any): Promise<void> {
        await handleRequest(req, res, async () => {
            const { produto, user, descricao } = req.body;
            const pedido = new Pedidos(descricao, user as User, produto as Produto);
            await this.pedidoService.adicionarPedido(pedido);
            console.log("Pedido adicionado com sucesso.");
        });
    }

    public async listarPedidos(req: any, res: any): Promise<void> {
        await handleRequest(req, res, () => this.pedidoService.listarPedidos(), 200);
    }

    public async buscarPedidoPorId(req: any, res: any): Promise<void> {
        await handleRequest(req, res, () => this.pedidoService.buscarPedidoPorId(Number(req.params.id)), 200);
    }

    public async removerPedido(req: any, res: any): Promise<void> {
        await handleRequest(req, res, () => this.pedidoService.removerPedido(Number(req.params.id)), 200);
    }

    public async atualizarPedido(req: any, res: any): Promise<void> {
        await handleRequest(req, res, () => this.pedidoService.atualizarPedido(Number(req.params.id), { ...req.body } as Pedidos), 200);
    }
}