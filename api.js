import express from "express"
import cors from "cors";
import jwt from "jsonwebtoken";

import { Paciente, Endereco, Usuario } from "./classes.js";

// Array de usuarios que podem fazer LOGIN
let usuariosCadastrados = [
    new Usuario(1, "yuriGabriel", "Yuri Gabriel", "13676767676", "yuri@email.com", "senhaDoYuri123")
]

// Array de Pacientes cadastrados
let pacientesCadastrados = [
    new Paciente(1, "Tiago Santos Cabral da Silva", "2007-08-13", "Homem", "67676767676", "13676767676", "tiagocabral.gja@gmail.com", new Endereco("11111111", "Rua Das Águas", "69", "Joinvile", "Pindamonhangaba", "Acre"), "M", "O+", [], [], 80.5, 267),
    new Paciente(2, "Yuri", "2007-08-13", "Homem", "67676767676", "13676767676", "yuri@email.com", new Endereco("11111111", "Rua Das Águas", "69", "Joinvile", "Pindamonhangaba", "Acre"), "F", "O+", [], [], 80.5, 267)
]

const PORT = 3000
const ACCES_TOKEN_KEY = "iuhiewuohc8e3chnc2n83fncn3c"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"]
}))

app.use(express.json()); // Se estiver enviando via JSON (Fetch/Axios)
app.use(express.urlencoded({ extended: true })); // Se for envio de formulário padrão HTML


// Rotas da API:

// LOGIN do Usuario
app.post("/usuario/login", (req, res) => {
    const {username, senha} = req.body

    let usuarioEncontrado = false
    for (let usuario of usuariosCadastrados){
        if (usuario._username === username && usuario._senha === senha){
            usuarioEncontrado = true
        }
    }

    if (!usuarioEncontrado){
        return res.status(403).json({error: "Usuário ou senha inválidos!"})
    }

    const token = jwt.sign({username}, ACCES_TOKEN_KEY, {
        expiresIn: "15m",
    })

    return res.json({ token })
})

// VALIDAÇÃO do Usuario
app.get("/usuario/validacao", (req, res) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(403).json({error: "Não autorizado"}) 

    jwt.verify(token, ACCES_TOKEN_KEY, (err, username) => {
        if (err) return res.status(403).json({error: "Não autorizado"})
        
        return res.json({message: "Acesso autorizado!", username})
    })
})

const UserValidacao = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).json({error: "Não autorizado"})

    jwt.verify(token, ACCES_TOKEN_KEY, (err, username) => {
        if (err) return res.status(401).json({error: "Não autorizado"})

        next()
    })
}

// GET todos os pacientes cadastrados
app.get("/paciente/all", UserValidacao, (req, res) => {
    return res.json(pacientesCadastrados)
})

// GET Paciente
app.get("/paciente/:id", UserValidacao, (req, res) => {
    let id = Number(req.params.id)
    let pacienteEncontrado = pacientesCadastrados.find(
        paciente => paciente && paciente.id === id
    )
    if (!pacienteEncontrado){
        return res.status(404).json({
            erro: `Paciente com id ${id} não foi encontrado`
        })
    }
    return res.json(pacienteEncontrado)
})

// POST novo Paciente
app.post("/paciente/create", UserValidacao, (req, res) => { 
    let id = null
    let ultimo_id = null
    try {
        ultimo_id = Number(pacientesCadastrados.at(-1).id)
    }
    catch (error){
        ultimo_id = 0
    }
    if (ultimo_id && ultimo_id != undefined){
        id = ultimo_id + 1
    }
    else{
        id = 1
    }
    const { 
        nome, data_nascimento, genero, cpf, telefone, email, cep, rua, numero, bairro, cidade, estado, sexo, tipoSanguineo, alergias, comorbidades, peso, altura 
    } = req.body
    
    const endereco = new Endereco(cep, rua, numero, bairro, cidade, estado)

    let novoPaciente = new Paciente(id, nome, data_nascimento, genero, cpf, telefone, email, endereco, sexo, tipoSanguineo, alergias, comorbidades, peso, altura)

    pacientesCadastrados.push(novoPaciente)

    return res.json({id: id})
})

// UPDATE Paciente (Caso exista)
app.post("/paciente/:id/edit", UserValidacao, (req, res) => {
    const { id } = req.params
    const { 
        nome, data_nascimento, genero, cpf, telefone, email, cep, rua, numero, bairro, cidade, estado, sexo, tipoSanguineo, alergias, comorbidades, peso, altura
    } = req.body

    let endereco = new Endereco(cep, rua, numero, bairro, cidade, estado)

    let novoPaciente = new Paciente(Number(id), nome, data_nascimento, genero, cpf, telefone, email, endereco, sexo, tipoSanguineo, alergias, comorbidades, peso, altura)

    let usuarioEncontrado = false
    let indice = null
    for (let i = 0; i < pacientesCadastrados.length; i++){
        if (pacientesCadastrados[i].id == id){
            usuarioEncontrado = true
            indice = i
        }
    }

    if (!usuarioEncontrado){
        return res.status(404).json({erro: `Paciente com id ${id} não encontrado.`})
    }
    
    pacientesCadastrados[indice] = novoPaciente

    return res.json(novoPaciente)
})

// DELETE Paciente (Caso exista)
app.post("/paciente/:id/delete", UserValidacao, (req, res) =>{
    let indice = null
    let usuarioEncontrado = false
    const { id } = req.params
    for (let i in pacientesCadastrados){
        if (pacientesCadastrados[i].id == id){
            indice = i
            usuarioEncontrado = true
        }
    }

    if (!usuarioEncontrado){
        return res.status(404).json({
            erro: `Paciente com id ${id} não foi encontrado.`
        })
    }
    
    pacientesCadastrados.splice(indice, 1)
        return res.status(200).json({
            message: `Paciente com id ${id} foi deletado com sucesso.`
        }) 
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`)
})
