# Gestão de Pacientes

Aplicação web para cadastro de pacientes de uma clínica (CRUD com login).
Trabalho de Desenvolvimento Web Avançado (IFSP).

**Integrantes:** Tiago Cabral, Yuri Corrêa, Yuri Gabriel

**Tecnologia do frontend:** React

## Estrutura

- `backend/`: API RESTful em Node.js + Express
- `frontend/`: interface web

## Como rodar

### Backend
```bash
cd backend
npm install
node ./api.js
```
Roda em http://localhost:3000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Roda em http://localhost:5173 

## Login de teste

- Usuário: `yuriGabriel`
- Senha: `senhaDoYuri123`

## Rotas da API

| Método | Rota | Descrição | Exige token |
|--------|------|-----------|-------------|
| POST | /usuario/login | Retorna o token | Não |
| GET | /paciente/all | Lista pacientes | Sim |
| GET | /paciente/:id | Resgata informações de um paciente | Sim |
| POST | /paciente/create | Cria paciente | Sim |
| POST | /paciente/:id/edit | Atualiza paciente | Sim |
| DELETE | /paciente/:id/delete | Exclui paciente | Sim |
