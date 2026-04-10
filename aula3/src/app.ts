import express, { Request, Response } from 'express';
import { Injector } from './produto_injector';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });
const injector = new Injector();
injector.criarProdutoRouter().configurarRotas();

app.get('/hello', (req: Request, res: Response) => {
 res.json({ message: "Hello World from Typescript" });
})


app.listen(port, () => {
 console.log(`Servidor rodando em http://localhost:${port}`);
});
