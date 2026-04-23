import { UserRepository } from "../repository/user.repository";
import { ValidationError } from "../error/validation_error";
import { User } from "../entity/User";
import { Pedidos } from "../entity/Pedidos";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    private verificarUser(name: string, email: string): boolean {
        return name.trim() === "" || email.trim() === "";
    }

    private validateId(id: number): void {
        if (id <= 0) {
            throw new ValidationError("O ID do usuário deve ser um número positivo.", 400);
        }
    }

    private async validateUserExists(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new ValidationError(`Usuário com id ${id} não encontrado.`, 404);
        }
        return user;
    }

    public async adicionarUser(user: User): Promise<void> {
        const { name, email } = user;

        if (this.verificarUser(name, email)) {
            throw new ValidationError("Nome e email são obrigatórios");
        }

        await this.userRepository.save(user);
    }

    public async listarUsers() {
        return await this.userRepository.findAll();
    }

    public async buscarUserPorId(id: number) {
        this.validateId(id);
        return await this.validateUserExists(id);
    }

    public async removerUser(id: number): Promise<void> {
        this.validateId(id);
        await this.validateUserExists(id);
        await this.userRepository.delete(id);
    }

    public async atualizarUser(id: number, user: User): Promise<void> {
        this.validateId(id);
        await this.validateUserExists(id);
        const { name, email } = user;
        if (this.verificarUser(name, email)) {
            throw new ValidationError("Nome e email são obrigatórios");
        }
        await this.userRepository.update(id, user);
    }

    public async adicionarPedido(userId: number, pedido: Pedidos): Promise<void> {
        this.validateId(userId);
        await this.validateUserExists(userId);
        if (!pedido || !pedido.produto) {
            throw new ValidationError("O pedido deve conter pelo menos um produto.", 400);
        }
        if (pedido.total <= 0) {
            throw new ValidationError("O total do pedido deve ser um número positivo.", 400);
        }
        await this.userRepository.addPedido(userId, pedido);
    }
}