import { UserService } from "../service/user.service";
import { User } from "../entity/User";
import { errorProcessing } from "../error/error_processing";
import { Pedidos } from "../entity/Pedidos";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async adicionarUser(req: any, res: any): Promise<void> {
        try {
            const { id, name, email } = req.body;
            await this.userService.adicionarUser({ id, name, email } as User);
            console.log("Usuário adicionado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async listarUsers(req: any, res: any): Promise<void> {
        try {
            const users = await this.userService.listarUsers();
            console.log("Usuários:", users);
        } catch (error: any) {
            console.error(`Erro inesperado: ${error.message}`);
        }
    }

    public async buscarUserPorId(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.userService.buscarUserPorId(id);
            console.log("Usuário encontrado:", user);
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async removerUser(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            await this.userService.removerUser(id);
            console.log("Usuário removido com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async atualizarUser(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const { name, email, pedidos } = req.body;
            await this.userService.atualizarUser(id, new User(name, email, pedidos as Pedidos[]));
            console.log("Usuário atualizado com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

    public async adicionarPedido(req: any, res: any): Promise<void> {
        try {
            const { userId } = req.params;
            const { produto } = req.body;
            await this.userService.adicionarPedido(userId, produto);
            console.log("Pedido adicionado ao usuário com sucesso.");
        } catch (error: any) {
            errorProcessing(error);
        }
    }

}