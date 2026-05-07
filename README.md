# pfs_noite

Projeto com exercícios de backend em Node.js / TypeScript.

## Estrutura

- `aula2/` - exercício em JavaScript com Express
- `aula3/` - exercício em TypeScript com Express
- `aula05-typeorm/` - exercício com TypeORM e autenticação JWT

## Requisitos

- Node.js 16+ ou 18+
- npm
- Banco de dados configurado para `aula05-typeorm` (TypeORM / data source)

---

## Como usar

### 1. Aula 2

```powershell
cd pfs_noite\aula2
npm install
```

Caso não tenha script, rode diretamente:

```powershell
node index.js
```

### 2. Aula 3

```powershell
cd pfs_noite\aula3
npm install
```

Depois:

```powershell
npm run build
npm start
```

ou, se for para desenvolvimento:

```powershell
npm run dev
```

### 3. Aula 05 - TypeORM

```powershell
cd pfs_noite\aula05-typeorm
npm install
```

Verifique se o banco está configurado em `src/data-source.ts` ou em variáveis de ambiente.

Depois:

```powershell
npm run build
npm start
```

ou para desenvolvimento:

```powershell
npm run dev
```

Para rodar os testes, no Powershell:
```powershell
./tests-auth.ps1
```
Ou no bash:
```bash
./tests-auth.sh
```

---

## Notas

- Em cada pasta, confirme os scripts disponíveis em package.json.
- Para `aula05-typeorm`, verifique a conexão com o banco antes de iniciar o servidor.
- Se usar `nodemon`/`ts-node-dev`, o comando pode ser:

```powershell
npm run dev
```

---

## Exemplo geral

```powershell
cd c:\Users\03676283090\Documents\projetos\pfs_noite\aula05-typeorm
npm install
npm run start
```
Feito com assistência de IA.