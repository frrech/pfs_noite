# API Test Script - CRUD operations for all endpoints
# Base URL
$BASE_URL = "http://localhost:3000"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "API TESTS - aula05-typeorm" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Test 1: Create a Categoria
Write-Host "`n[1] CREATE CATEGORIA" -ForegroundColor Yellow
$categoriaResponse = curl.exe -X POST "$BASE_URL/categorias" `
  -H "Content-Type: application/json" `
  -d '{"id": 1, "nome": "Eletrônicos"}' `
  -s | ConvertFrom-Json

Write-Host $categoriaResponse | ConvertTo-Json
$categoriaId = $categoriaResponse.id

# Test 2: List all Categorias
Write-Host "`n[2] LIST ALL CATEGORIAS" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/categorias" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 3: Get Categoria by ID
Write-Host "`n[3] GET CATEGORIA BY ID (id=1)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/categorias/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 4: Update Categoria
Write-Host "`n[4] UPDATE CATEGORIA (id=1)" -ForegroundColor Yellow
curl.exe -X PUT "$BASE_URL/categorias/1" `
  -H "Content-Type: application/json" `
  -d '{"nome": "Eletrônicos e Informática"}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 5: Create a Produto
Write-Host "`n[5] CREATE PRODUTO" -ForegroundColor Yellow
$produtoResponse = curl.exe -X POST "$BASE_URL/produtos" `
  -H "Content-Type: application/json" `
  -d '{"id": 1, "nome": "Notebook", "preco": 3500, "categoriaId": 1}' `
  -s | ConvertFrom-Json

Write-Host $produtoResponse | ConvertTo-Json
$produtoId = $produtoResponse.id

# Test 6: List all Produtos
Write-Host "`n[6] LIST ALL PRODUTOS" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/produtos" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 7: Get Produto by ID
Write-Host "`n[7] GET PRODUTO BY ID (id=1)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/produtos/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 8: Update Produto
Write-Host "`n[8] UPDATE PRODUTO (id=1)" -ForegroundColor Yellow
curl.exe -X PUT "$BASE_URL/produtos/1" `
  -H "Content-Type: application/json" `
  -d '{"nome": "Notebook Gamer", "preco": 4500}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 9: Create a User
Write-Host "`n[9] CREATE USER" -ForegroundColor Yellow
$userResponse = curl.exe -X POST "$BASE_URL/users" `
  -H "Content-Type: application/json" `
  -d '{"name": "João Silva", "email": "joao@example.com"}' `
  -s | ConvertFrom-Json

Write-Host $userResponse | ConvertTo-Json
$userId = $userResponse.id

# Test 10: List all Users
Write-Host "`n[10] LIST ALL USERS" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/users" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 11: Get User by ID
Write-Host "`n[11] GET USER BY ID (id=1)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/users/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 12: Update User
Write-Host "`n[12] UPDATE USER (id=1)" -ForegroundColor Yellow
curl.exe -X PUT "$BASE_URL/users/1" `
  -H "Content-Type: application/json" `
  -d '{"name": "João da Silva", "email": "joao.silva@example.com"}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 13: Create a Pedido
Write-Host "`n[13] CREATE PEDIDO" -ForegroundColor Yellow
$pedidoResponse = curl.exe -X POST "$BASE_URL/pedidos" `
  -H "Content-Type: application/json" `
  -d '{"id": 1, "produto": "Notebook", "total": 3500, "userId": 1}' `
  -s | ConvertFrom-Json

Write-Host $pedidoResponse | ConvertTo-Json
$pedidoId = $pedidoResponse.id

# Test 14: List all Pedidos
Write-Host "`n[14] LIST ALL PEDIDOS" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/pedidos" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 15: Get Pedido by ID
Write-Host "`n[15] GET PEDIDO BY ID (id=1)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/pedidos/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 16: Add Pedido to User
Write-Host "`n[16] ADD PEDIDO TO USER (userId=1, pedidoId=1)" -ForegroundColor Yellow
curl.exe -X POST "$BASE_URL/users/1/pedidos" `
  -H "Content-Type: application/json" `
  -d '{"id": 2, "produto": "Mouse", "total": 100, "userId": 1}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 17: Error Test - Invalid ID (should return 400)
Write-Host "`n[17] ERROR TEST - Invalid ID (should return 400)" -ForegroundColor Red
curl.exe -X GET "$BASE_URL/users/-1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 18: Error Test - Non-existent User (should return 404)
Write-Host "`n[18] ERROR TEST - Non-existent User (should return 404)" -ForegroundColor Red
curl.exe -X GET "$BASE_URL/users/9999" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 19: Delete Pedido
Write-Host "`n[19] DELETE PEDIDO (id=1)" -ForegroundColor Yellow
curl.exe -X DELETE "$BASE_URL/pedidos/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 20: Delete User
Write-Host "`n[20] DELETE USER (id=1)" -ForegroundColor Yellow
curl.exe -X DELETE "$BASE_URL/users/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 21: Delete Produto
Write-Host "`n[21] DELETE PRODUTO (id=1)" -ForegroundColor Yellow
curl.exe -X DELETE "$BASE_URL/produtos/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 22: Delete Categoria
Write-Host "`n[22] DELETE CATEGORIA (id=1)" -ForegroundColor Yellow
curl.exe -X DELETE "$BASE_URL/categorias/1" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TESTS COMPLETED" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
