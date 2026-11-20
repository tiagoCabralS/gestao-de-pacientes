export function cpfValidator(cpf) {
    if (cpf.length < 11 || cpf.length > 11){
        return false
    }
    const ehNumeroValido = cpf.trim() !== '' && !Number.isNaN(Number(cpf));

    if (!ehNumeroValido) return false

    return true
}

export function telefoneValidator(telefone){
  const apenasNumeros = String(telefone).replace(/\D/g, '');

  const tamanhoValido = apenasNumeros.length === 10 || apenasNumeros.length === 11;

  return tamanhoValido;
}

export const dataValidacao = (req, res, next) => {
    if (!cpfValidator(req.body.cpf)) {
        return res.status(422).json({"erro": "CPF inválido"})
    }
    if (!telefoneValidator(req.body.telefone)) {
        return res.status(422).json({"erro": "Telefone inválido"})
    }

    next()
}
console.log(telefoneValidator('11111111111'))

