const produto_repository = require('./repository/produto_repository')

function validateProduto(produto){
    return (produto && produto.nome && produto.preco && 
            typeof produto == 'object' && typeof produto.nome == 'string' && typeof produto.preco == 'number')
}

function listProdutos(){
    return produto_repository.listProdutos()
}

function addProduto(produto){
    if(!validateProduto(produto)){
        const error = new Error('Produto inválido')
        error.id = 400
        throw error
    }
    return produto_repository.addProduto(produto)
}

function searchById(id){
    if(typeof id != 'number'){
        const error = new Error('Id inválido')
        error.id = 404
        throw error
    }
    return produto_repository.searchById(id)
}

function deleteProduto(id){
    if(id == null){
        const error = new Error('Id inválido')
        error.id = 404
        throw error
    }
    return produto_repository.deleteProduto(id)
}

function updateProduto(id, produto){
    if(!validateProduto(produto)){
        const error = new Error('Produto inválido')
        error.id = 404
        throw error
    }
    return produto_repository.updateProduto(id, produto)
}

export default {
    listProdutos,
    addProduto,
    searchById,
    updateProduto,
    deleteProduto
}