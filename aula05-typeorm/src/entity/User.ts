import { Pedidos } from "./Pedidos";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    pedidos: Pedidos[];
    
    constructor(name: string, email: string, pedidos: Pedidos[]) {
        this.name = name;
        this.email = email;
        this.pedidos = pedidos;
    }
}