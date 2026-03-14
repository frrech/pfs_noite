const express = require('express');
const app = express();
const port = 3000;
const produto_controller = require('./controller/produto_controller')

app.use(express.json())

app.get('/produtos', produto_controller.listProdutos)
app.post('/produtos', produto_controller.addProduto)
app.get('/produtos/:id', produto_controller.searchById)
app.put('/produtos/:id', produto_controller.updateProduto)
app.delete('/produtos/:id', produto_controller.deleteProduto)