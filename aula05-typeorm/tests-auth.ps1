# API Test Script with JWT Authentication
# Base URL
$BASE_URL = "http://localhost:3000"
$TOKEN = ""
$USER_ID = ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "API TESTS - aula05-typeorm (WITH AUTH)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# ==================== AUTH TESTS ====================
Write-Host "`n=== AUTHENTICATION TESTS ===" -ForegroundColor Magenta

# Test 1: Register new user
Write-Host "`n[1] REGISTER USER" -ForegroundColor Yellow
$registerResponse = curl.exe -X POST "$BASE_URL/auth/register" `
  -H "Content-Type: application/json" `
  -d '{"name":"João Silva","email":"joao@example.com","password":"senha123"}' `
  -s | ConvertFrom-Json

Write-Host $registerResponse | ConvertTo-Json
$USER_ID = $registerResponse.user.id

# Test 2: Try duplicate email (should fail 409)
Write-Host "`n[2] REGISTER DUPLICATE EMAIL (should fail 409)" -ForegroundColor Red
curl.exe -X POST "$BASE_URL/auth/register" `
  -H "Content-Type: application/json" `
  -d '{"name":"Outro","email":"joao@example.com","password":"senha456"}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 3: Login with valid credentials
Write-Host "`n[3] LOGIN - VALID CREDENTIALS" -ForegroundColor Yellow
$loginResponse = curl.exe -X POST "$BASE_URL/auth/login" `
  -H "Content-Type: application/json" `
  -d '{"email":"joao@example.com","password":"senha123"}' `
  -s | ConvertFrom-Json

Write-Host $loginResponse | ConvertTo-Json
$TOKEN = $loginResponse.token

# Test 4: Login with wrong password (should fail 401)
Write-Host "`n[4] LOGIN - WRONG PASSWORD (should fail 401)" -ForegroundColor Red
curl.exe -X POST "$BASE_URL/auth/login" `
  -H "Content-Type: application/json" `
  -d '{"email":"joao@example.com","password":"wrongPassword"}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 5: Get current authenticated user
Write-Host "`n[5] GET CURRENT USER (/auth/me with token)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/auth/me" `
  -H "Authorization: Bearer $TOKEN" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 6: Access protected route without token (should fail 401)
Write-Host "`n[6] USERS LIST WITHOUT TOKEN (should fail 401)" -ForegroundColor Red
curl.exe -X GET "$BASE_URL/users" -s | ConvertFrom-Json | ConvertTo-Json

# Test 7: Refresh token
Write-Host "`n[7] REFRESH TOKEN" -ForegroundColor Yellow
$refreshResponse = curl.exe -X POST "$BASE_URL/auth/refresh" `
  -H "Authorization: Bearer $TOKEN" `
  -s | ConvertFrom-Json

Write-Host $refreshResponse | ConvertTo-Json
$TOKEN = $refreshResponse.token

# ==================== PUBLIC ROUTES ====================
Write-Host "`n=== PUBLIC ROUTES (NO AUTH REQUIRED) ===" -ForegroundColor Magenta

# Test 8: Create Categoria
Write-Host "`n[8] CREATE CATEGORIA (public)" -ForegroundColor Yellow
$catResponse = curl.exe -X POST "$BASE_URL/categorias" `
  -H "Content-Type: application/json" `
  -d '{"id":1,"nome":"Eletrônicos"}' `
  -s | ConvertFrom-Json

Write-Host $catResponse | ConvertTo-Json

# Test 9: List Categorias (public)
Write-Host "`n[9] LIST CATEGORIAS (public)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/categorias" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 10: Create Produto (public)
Write-Host "`n[10] CREATE PRODUTO (public)" -ForegroundColor Yellow
$prodResponse = curl.exe -X POST "$BASE_URL/produtos" `
  -H "Content-Type: application/json" `
  -d '{"id":1,"nome":"Notebook","preco":3500,"categoria":{"id":1},"quantidade":5}' `
  -s | ConvertFrom-Json

Write-Host $prodResponse | ConvertTo-Json

# Test 11: List Produtos (public)
Write-Host "`n[11] LIST PRODUTOS (public)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/produtos" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# ==================== PROTECTED ROUTES ====================
Write-Host "`n=== PROTECTED ROUTES (REQUIRE VALID JWT) ===" -ForegroundColor Magenta

# Test 12: List Users (with token)
Write-Host "`n[12] LIST USERS (with valid token)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/users" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 13: Get User by ID (with token)
Write-Host "`n[13] GET USER BY ID (with token)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/users/$USER_ID" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 14: Update User (with token)
Write-Host "`n[14] UPDATE USER (with token)" -ForegroundColor Yellow
curl.exe -X PUT "$BASE_URL/users/$USER_ID" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"name":"João da Silva","email":"joao.silva@example.com","password":"novasenha123"}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 15: Create Pedido (with token)
Write-Host "`n[15] CREATE PEDIDO (with token)" -ForegroundColor Yellow
$pedResponse = curl.exe -X POST "$BASE_URL/pedidos" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"id":1,"descricao":"Pedido Notebook","produto":{"id":1},"user":{"id":'$USER_ID'},"total":3500}' `
  -s | ConvertFrom-Json

Write-Host $pedResponse | ConvertTo-Json

# Test 16: List Pedidos (with token)
Write-Host "`n[16] LIST PEDIDOS (with token)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/pedidos" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 17: Get Pedido by ID (with token)
Write-Host "`n[17] GET PEDIDO BY ID (with token)" -ForegroundColor Yellow
curl.exe -X GET "$BASE_URL/pedidos/1" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# ==================== ERROR CASES ====================
Write-Host "`n=== ERROR CASES ===" -ForegroundColor Magenta

# Test 18: Invalid token format
Write-Host "`n[18] INVALID TOKEN FORMAT (should fail 401)" -ForegroundColor Red
curl.exe -X GET "$BASE_URL/users" `
  -H "Authorization: InvalidToken" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 19: Malformed Bearer header
Write-Host "`n[19] MALFORMED BEARER HEADER (should fail 401)" -ForegroundColor Red
curl.exe -X GET "$BASE_URL/users" `
  -H "Authorization: Bearer invalidtoken123invalid" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 20: Register with short password (should fail 400)
Write-Host "`n[20] SHORT PASSWORD (should fail 400)" -ForegroundColor Red
curl.exe -X POST "$BASE_URL/auth/register" `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@example.com","password":"123"}' `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 21: Delete Pedido (with token)
Write-Host "`n[21] DELETE PEDIDO (with token)" -ForegroundColor Yellow
curl.exe -X DELETE "$BASE_URL/pedidos/1" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

# Test 22: Delete User (with token)
Write-Host "`n[22] DELETE USER (with token)" -ForegroundColor Yellow
curl.exe -X DELETE "$BASE_URL/users/$USER_ID" `
  -H "Authorization: Bearer $TOKEN" `
  -H "Content-Type: application/json" `
  -s | ConvertFrom-Json | ConvertTo-Json

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "ALL TESTS COMPLETED" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nTest Summary:" -ForegroundColor Green
Write-Host "✓ Auth tests: Register, Login, Refresh, GetMe" -ForegroundColor Green
Write-Host "✓ Public routes: Categorias, Produtos (no auth needed)" -ForegroundColor Green
Write-Host "✓ Protected routes: Users, Pedidos (require valid JWT)" -ForegroundColor Green
Write-Host "✓ Error cases: Missing token, invalid token, short password" -ForegroundColor Green
