export class Endereco{
    constructor(cep, rua, numero, bairro, cidade, estado){
        this.cep = cep
        this.rua = rua
        this.numero = numero
        this.bairro = bairro
        this.cidade = cidade
        this.estado = estado
    }
}

export class Paciente{
    constructor(
        id, 
        nome, 
        data_nascimento, 
        genero, 
        cpf, 
        telefone, 
        email, 
        endereco, 
        sexo,
        tipoSanguineo,
        alergias,
        comorbidades,
        peso,
        altura
    ){
        if (!nome || nome.length < 3){
            throw new Error("O nome deve conter pelo menos 3 caracteres.")
        }
        if (!cpf || cpf.length < 11 || cpf.length > 11){
            throw new Error("O CPF deve conter 11 caracteres numéricos.")
        }
        try {
            Number(telefone)
        }
        catch(error){
            throw new Error(error)
        }
        if (!sexo){
            throw new Error("Sexo é um atributo obrigatório.")
        }
        if (!typeof endereco == Endereco){
            throw new Error("Tipo inválido para endereço")
        }
        
        this.id = id
        this.nome = nome
        this.data_nascimento = data_nascimento
        this.genero = genero
        this.cpf = cpf
        this.telefone = telefone
        this.email = email
        this.endereco = endereco
        this.sexo = sexo
        this.tipoSanguineo = tipoSanguineo
        this.alergias = alergias
        this.comorbidades = comorbidades
        this.peso = peso
        this.altura = altura
    }
}

export class Usuario{
    constructor(id, username, nome, telefone, email, senha){
        this._id = id
        this._username = username
        this.nome = nome
        this.telefone = telefone
        this.email = email
        this._senha = senha
    }
}
