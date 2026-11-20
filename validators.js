function nomeValidator(nome){
    if (!nome || nome.length < 3){
        return false
    }

    return true
}

function cpfValidator(cpf) {
    if (cpf.length < 11 || cpf.length > 11){
        return false
    }
    const ehNumeroValido = cpf.trim() !== '' && !Number.isNaN(Number(cpf));

    if (!ehNumeroValido) return false

    return true
}

function telefoneValidator(telefone){
  const apenasNumeros = String(telefone).replace(/\D/g, '');

  const tamanhoValido = apenasNumeros.length === 10 || apenasNumeros.length === 11;

  return tamanhoValido;
}

function sexoValidator(sexo){
    return sexo === "M" || sexo === "F"
}

export const dataValidacao = (req, res, next) => {
    if (!cpfValidator(req.body.cpf)) {
        return res.status(422).json({"erro": "CPF inválido"})
    }
    if (!telefoneValidator(req.body.telefone)) {
        return res.status(422).json({"erro": "Telefone inválido"})
    }
    if (!nomeValidator(req.body.nome)) {
        return res.status(422).json({"erro": "Nome inválido"})
    }
    if (!sexoValidator(req.body.sexo)) {
        return res.status(422).json({"erro": "Sexo inválido"})
    }

    next()
}
console.log(telefoneValidator('11111111111'))

