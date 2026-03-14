let lista_produtos = []

let autoIncrement = 0

function listProdutos(){
    return lista_produtos
}

function addProduto(produto){
    produto.id = autoIncrement
    lista_produtos.push(produto)
    autoIncrement++
    return produto
}

function searchById(id){
    return lista_produtos.find(produto => produto.id == id)
}

function updateProduto(id, produto){
    let index = lista_produtos.findIndex(produto => produto.id == id)
    lista_produtos[index] = produto
    return produto
}

function deleteProduto(id){
    lista_produtos.splice(lista_produtos.findIndex(produto => produto.id == id), 1)
    return true
}

export default {
    listProdutos,
    addProduto,
    searchById,
    updateProduto,
    deleteProduto
}