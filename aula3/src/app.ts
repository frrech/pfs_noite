import express, { Request, Response } from 'express';
<<<<<<< HEAD
import { Injector } from './produto_injector';
=======
import { ProdutoRouter } from './router/produto_router';
import { ProdutoInjector } from './injector/produto_injector';

>>>>>>> bfce51b1bb518410bbe62ad982c7381d695d14c1
const app = express();
const port = 3000;

app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });
const injector = new Injector();
injector.criarProdutoRouter().configurarRotas();
=======

const injector = new ProdutoInjector();
const produtoController = injector.getController();

const produtoRouter = new ProdutoRouter(app, produtoController);
produtoRouter.configurarRotas();
>>>>>>> bfce51b1bb518410bbe62ad982c7381d695d14c1

app.get('/hello', (req: Request, res: Response) => {
    res.json({ message: "Hello World from Typescript" });
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
