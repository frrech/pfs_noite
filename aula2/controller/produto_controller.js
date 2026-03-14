const produto_service = require('./service/produto_service')

function listProdutos(req, res){
    try{
        let produtos = produto_service.listProdutos()
        res.status(200).json(produtos)
    } catch (error) {
        res.status(error.id).json({message: error.message})
    }
}

function addProduto(req, res){
    try{
        const {nome, preco} = req.body
        const produto = {nome, preco}
        let novoProduto = produto_service.addProduto(produto)
        res.status(201).json(novoProduto)
    } catch (error) {
        res.status(error.id).json({message: error.message})
    }
}

function searchById(req, res){
    try{
        let id = req.params.id
        let produto = produto_service.searchById(id)
        res.status(200).json(produto)
    } catch (error) {
        res.status(error.id).json({message: error.message})
    }
}

function updateProduto(req, res){
    try{
        let id = req.params.id
        const {nome, preco} = req.body
        const produto = {nome, preco}
        let produtoAtualizado = produto_service.updateProduto(id, produto)
        res.status(200).json(produtoAtualizado)
    } catch (error) {
        res.status(error.id).json({message: error.message})
    }
}

function deleteProduto(req, res){
    try{
        let id = req.params.id
        let produto = produto_service.deleteProduto(id)
        res.status(200).json(produto)
    } catch (error) {
        res.status(error.id).json({message: error.message})
    }
}

export default {
    listProdutos,
    addProduto,
    searchById,
    updateProduto,
    deleteProduto
}

