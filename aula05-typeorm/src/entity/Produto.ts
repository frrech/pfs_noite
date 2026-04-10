import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm"
import { Categoria } from "./Categoria";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({ type: 'double precision' })
    preco: number
    
    @OneToMany(() => Categoria, categoria => categoria.produtos)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    constructor(nome: string, preco: number, categoria: Categoria) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
    }
}
