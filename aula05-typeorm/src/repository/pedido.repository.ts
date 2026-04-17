import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Pedidos } from "../entity/Pedidos";

export class PedidoRepository {
    private repository: Repository<Pedidos>;

    constructor() {
        this.repository = AppDataSource.getRepository(Pedidos);
    }

    async save(pedido: Pedidos): Promise<Pedidos> {
        return this.repository.save(pedido);
    }

    async findAll(): Promise<Pedidos[]> {
        return await this.repository.find({ relations: ["pedidos"] });
    }

    async findById(id: number): Promise<Pedidos | null> {
        if (id){
            return await this.repository.findOne({ where: { id }, relations: ["pedidos"] });
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        if (id){
            await this.repository.delete(id);
        }
        return
    }

    async update(id: number, Pedidos: Partial<Pedidos>): Promise<Pedidos | null> {
        if (id){
            const existingPedidos = await this.findById(id);
            if (!existingPedidos) {
                return null;
            }
            Object.assign(existingPedidos, Pedidos);
            return this.repository.save(existingPedidos);
        }
        return null;
    }

    async addPedido(PedidosId: number, pedido: any): Promise<Pedidos | null> {
        const Pedidos = await this.findById(PedidosId);
        if (!Pedidos) {
            return null;
        }
        Pedidos.produto = pedido;
        return this.repository.save(Pedidos);
    }
}