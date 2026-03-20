import express, { Request, Response } from 'express';
import { ProdutoRouter } from './router/produto_router';
const app = express();
const port = 3000;

app.use(express.json());
const produtoRouter = new ProdutoRouter();
produtoRouter.configurarRotas();
app.get('/hello', (req: Request, res: Response) => {
 res.json({ message: "Hello World from Typescript" });
})

app.listen(port, () => {
 console.log(`Servidor rodando em http://localhost:${port}`);
});
