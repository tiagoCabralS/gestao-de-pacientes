function cpfValidator(cpf) {
    if (cpf.length < 11 || cpf.length > 11){
        return false
    }
    const ehNumeroValido = cpf.trim() !== '' && !Number.isNaN(Number(cpf));

    if (!ehNumeroValido) return false

    return true
}

console.log(cpfValidator('1111111111a'))