import "reflect-metadata"
import { DataSource } from "typeorm"
import { Produto } from "./entity/Produto"
import { Categoria } from "./entity/Categoria"
import { User } from "./entity/User"
import { Pedidos } from "./entity/Pedidos"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Produto, Categoria, User, Pedidos],
    migrations: [],
    subscribers: [],
})
