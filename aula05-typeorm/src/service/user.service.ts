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
        if (id <= 0) {
            throw new ValidationError("O ID do usuário deve ser um número positivo.", 400); // Bad Request
        }
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new ValidationError(`Usuário com id ${id} não encontrado.`, 404); // NOT FOUND
        }
        return user;
    }

    public async removerUser(id: number): Promise<void> {
        if (id <= 0) {
            throw new ValidationError("O ID do usuário deve ser um número positivo.", 400); // Bad Request
        }
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new ValidationError(`Usuário com id ${id} não encontrado.`, 404); // NOT FOUND
        }
        await this.userRepository.delete(user.id);
    }

    public async atualizarUser(id: number, user: User): Promise<void> {
        if (id <= 0) {
            throw new ValidationError("O ID do usuário deve ser um número positivo.", 400); // Bad Request
        }
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new ValidationError(`Usuário com id ${id} não encontrado.`, 404); // NOT FOUND
        }
        const { name, email } = user;
        if (this.verificarUser(name, email)) {
            throw new ValidationError("Nome e email são obrigatórios");
        }
        await this.userRepository.update(id, user);
    }

    public async adicionarPedido(userId: number, pedido: Pedidos): Promise<void> {
        if (userId <= 0) {
            throw new ValidationError("O ID do usuário deve ser um número positivo.", 400); // Bad Request
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ValidationError(`Usuário com id ${userId} não encontrado.`, 404); // NOT FOUND
        }
        if (!pedido || !pedido.produto) {
            throw new ValidationError("O pedido deve conter pelo menos um produto.", 400); // Bad Request
        }
            if (pedido.total <= 0) {
                throw new ValidationError("O total do pedido deve ser um número positivo.", 400); // Bad Request
            }
            await this.userRepository.addPedido(userId, pedido);
    }
}