#!/bin/bash

# API Test Script - CRUD operations for all endpoints
# Base URL
BASE_URL="http://localhost:3000"

echo "========================================"
echo "API TESTS - aula05-typeorm"
echo "========================================"

# Test 1: Create a Categoria
echo -e "\n[1] CREATE CATEGORIA"
categoriaResponse=$(curl -X POST "$BASE_URL/categorias" \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "nome": "Eletrônicos"}' \
  -s)
echo $categoriaResponse | jq .
categoriaId=$(echo $categoriaResponse | jq -r '.id')

# Test 2: List all Categorias
echo -e "\n[2] LIST ALL CATEGORIAS"
curl -X GET "$BASE_URL/categorias" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 3: Get Categoria by ID
echo -e "\n[3] GET CATEGORIA BY ID (id=1)"
curl -X GET "$BASE_URL/categorias/1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 4: Update Categoria
echo -e "\n[4] UPDATE CATEGORIA (id=1)"
curl -X PUT "$BASE_URL/categorias/1" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Eletrônicos e Informática"}' \
  -s | jq .

# Test 5: Create a Produto
echo -e "\n[5] CREATE PRODUTO"
produtoResponse=$(curl -X POST "$BASE_URL/produtos" \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "nome": "Notebook", "preco": 3500, "categoriaId": 1}' \
  -s)
echo $produtoResponse | jq .
produtoId=$(echo $produtoResponse | jq -r '.id')

# Test 6: List all Produtos
echo -e "\n[6] LIST ALL PRODUTOS"
curl -X GET "$BASE_URL/produtos" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 7: Get Produto by ID
echo -e "\n[7] GET PRODUTO BY ID (id=1)"
curl -X GET "$BASE_URL/produtos/1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 8: Update Produto
echo -e "\n[8] UPDATE PRODUTO (id=1)"
curl -X PUT "$BASE_URL/produtos/1" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Notebook Gamer", "preco": 4500}' \
  -s | jq .

# Test 9: Create a User
echo -e "\n[9] CREATE USER"
userResponse=$(curl -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@example.com"}' \
  -s)
echo $userResponse | jq .
userId=$(echo $userResponse | jq -r '.id')

# Test 10: List all Users
echo -e "\n[10] LIST ALL USERS"
curl -X GET "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 11: Get User by ID
echo -e "\n[11] GET USER BY ID (id=1)"
curl -X GET "$BASE_URL/users/1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 12: Update User
echo -e "\n[12] UPDATE USER (id=1)"
curl -X PUT "$BASE_URL/users/1" \
  -H "Content-Type: application/json" \
  -d '{"name": "João da Silva", "email": "joao.silva@example.com"}' \
  -s | jq .

# Test 13: Create a Pedido
echo -e "\n[13] CREATE PEDIDO"
pedidoResponse=$(curl -X POST "$BASE_URL/pedidos" \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "produto": "Notebook", "total": 3500, "userId": 1}' \
  -s)
echo $pedidoResponse | jq .
pedidoId=$(echo $pedidoResponse | jq -r '.id')

# Test 14: List all Pedidos
echo -e "\n[14] LIST ALL PEDIDOS"
curl -X GET "$BASE_URL/pedidos" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 15: Get Pedido by ID
echo -e "\n[15] GET PEDIDO BY ID (id=1)"
curl -X GET "$BASE_URL/pedidos/1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 16: Add Pedido to User
echo -e "\n[16] ADD PEDIDO TO USER (userId=1, pedidoId=1)"
curl -X POST "$BASE_URL/users/1/pedidos" \
  -H "Content-Type: application/json" \
  -d '{"id": 2, "produto": "Mouse", "total": 100, "userId": 1}' \
  -s | jq .

# Test 17: Error Test - Invalid ID (should return 400)
echo -e "\n[17] ERROR TEST - Invalid ID (should return 400)"
curl -X GET "$BASE_URL/users/-1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 18: Error Test - Non-existent User (should return 404)
echo -e "\n[18] ERROR TEST - Non-existent User (should return 404)"
curl -X GET "$BASE_URL/users/9999" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 19: Delete Pedido
echo -e "\n[19] DELETE PEDIDO (id=1)"
curl -X DELETE "$BASE_URL/pedidos/1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 20: Delete User
echo -e "\n[20] DELETE USER (id=1)"
curl -X DELETE "$BASE_URL/users/1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 21: Delete Produto
echo -e "\n[21] DELETE PRODUTO (id=1)"
curl -X DELETE "$BASE_URL/produtos/1" \
  -H "Content-Type: application/json" \
  -s | jq .

# Test 22: Delete Categoria
echo -e "\n[22] DELETE CATEGORIA (id=1)"
curl -X DELETE "$BASE_URL/categorias/1" \
  -H "Content-Type: application/json" \
  -s | jq .

echo -e "\n========================================"
echo "TESTS COMPLETED"
echo "========================================"
