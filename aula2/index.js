const express = require('express');
const app = express();
const port = 3000;
const produto_router = require('./router/produto_router')

app.use(express.json())
app.use(produto_router)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
