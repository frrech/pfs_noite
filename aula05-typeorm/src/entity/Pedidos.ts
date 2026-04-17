import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./User";
import {Produto } from "./Produto";

@Entity()
export class Pedidos {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descricao: string

    @ManyToOne(() => Produto, produto => produto.id)
    @JoinColumn({ name: "produto_id" })
    produto: Produto;

    @ManyToOne(() => User, user => user.pedidos)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total: number;

    constructor(descricao: string, user: User, produto: Produto) {
        this.descricao = descricao;
        this.user = user;
        this.produto = produto;
        this.total = produto.preco * produto.quantidade;
    }
}