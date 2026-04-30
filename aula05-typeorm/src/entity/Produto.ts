import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Categoria } from "./Categoria";
import { Pedidos } from "./Pedidos";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({ type: 'double precision' })
    preco: number

    @Column({ type: "decimal", precision: 10, scale: 2 })
    quantidade: number;

    @ManyToOne(() => Categoria, categoria => categoria.produtos)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    @OneToMany(() => Pedidos, pedidos => pedidos.produto)
    pedidos: Pedidos[];

    constructor(nome: string, preco: number, categoria: Categoria, quantidade: number) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.quantidade = quantidade;
    }
}
