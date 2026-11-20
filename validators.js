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


console.log(telefoneValidator('11111111111'))

