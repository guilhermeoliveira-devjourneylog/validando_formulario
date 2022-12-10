export default function ehMaiorDeIdade(campo) {
    //variavel que adiciona uma nova data a ser convertida em um valor inteligivel para o javascript
    const dataNascimento = new Date(campo.value);
    // verifica o validaIdade e recebe um parâmetro dataNascimento
    if (!validaIdade(dataNascimento)) {
        //campo.setCustomValidity receberá a nossa mensagem customizada: "A pessoa usuária não é maior de idade."
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}
    /*esta função possui os seguintes elementos:
    - a variável dataAtual que receberá a data do momento atual em que estamos;
    - a variável dataMais18 que receberá os parâmetros de ano, mês e dia da data 
    de nascimento inserida no campo e adicionará a ela ao número 18. Assim podemos 
    saber em que ano aquela pessoa fez 18;
    - um return que verificará se data atual é maior ou igual a dataMais18, confirmando 
    que a pessoa usuária já completou 18 anos.*/
function validaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;

}

/*Se incluirmos a data de nascimento no campo "Data de nascimento", o Console retornará 
true, pois eu sou maior de idade. Entretanto se alterarmos o ano para "2010", o Console retornará false, 
pois até aquele momento o usuario possui menos de 18 anos.*/