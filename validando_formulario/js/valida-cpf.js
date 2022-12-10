export default function ehUmCPF(campo) {
    /*função tradicional que recebe valor de campo com método replace tendo dois parametros
    1º: indica o conteúdo que será substituido no caso os caracteres especiais;
    2º: indica o conteúdo que será utilizado para substitui-lo neste caso vazio.
    Através desta função, efetuamos a remoção dos caracteres especiais nos casos de inputs com 
    essa característica, normalizando esses valores e tornando mais fácil a comparação e validação 
    entre os tipos de CPF inseridos.*/ 
    const cpf = campo.value.replace(/\.|-/g, "");
    //teste das três funções que fazem a validação do preenchimento do cpf
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
    //caso true
    //campo.setCustomValidity que receberá a nossa mensagem customizada: "Este cpf não é válido."
    /*Vamos entender o código? O customError só é ativado no momento em que o setCustomValidity 
    não for false. Esta lógica precisava ser implementada manualmente, e para isso adicionamos o 
    campo.setCustomValidity com um valor qualquer diretamente no ehUmCPF. Através da inserção deste 
    valor o customError deixou de ser false, e portanto a mensagem pôde ser exibida.
    Com o método setCustomValidity é possível alterar o valor de customError. Com isso, a mensagem 
    do erro específica de acordo com o valor da propriedade do erro dentro do validityState irá aparecer 
    pois o valor de customError não será mais false.*/
        campo.setCustomValidity('Esse cpf não é válido')
    }
}
    /*configurarando a validação de números repetidos, já que não existem CPFs com todos 
    os números iguais, como por exemplo "111.111.111-11".*/
function validaNumerosRepetidos(cpf) {
    /*lista de todas as combinações de 11 números repetidos 
    Dessa forma conseguimos verificar se o número que inserimos no campo de CPF está nessa lista de números repetidos.*/
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    /*Para isso criaremos um return com o método numerosRepetidos.includes(cpf). 
    Caso o valor do CPF inserido seja encontrado na lista de repetições, o método retornará true, 
    caso contrário retornará false.*/
    return numerosRepetidos.includes(cpf)
}
    //Estrutura de validação
    function validaPrimeiroDigito(cpf) {
        let soma = 0;
        let multiplicador = 10;
        //declaração do laço de repetição loop que percorre o cpf multiplicando os valores da posição inicial do cpf por 10 de forma decrescente 
        /*lógica: Através dos 9 números que se antecedem ao traço faremos a validação do primeiro dígito verificador
        que se posiciona após o traço.
        Então ao percorrer os 9 primeiros dígitos do laço de repetição a variavel soma vai começar a 
        recolher o cpf pela posição que condiz com o laço de repetição posição 1.2.3....e até a 9 que 
        vai se multiplicar com o multiplicador que começou pelo o 10 e depois vai diminuindo que é 
        o que acontece em multiplicador--
        Então temos o resultado final da multiplicação de cada uma das posições mais a soma delas.*/  
        for (let tamanho = 0; tamanho < 9; tamanho++) {
            soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }
    /*Após o calculo do laço de repetição faz-se a multiplicação por 10 e com seu resultado é feito o módulo da divisão de 11
    Com esse calculo chegamos ao primeiro digito*/
    soma = (soma * 10) % 11;
    //Por ultimo se tem uma condicional que se o valor daquela soma for igual a 10 ou 11 a soma seria 0   
    
    if (soma == 10 || soma == 11) {
        soma = 0;
    }
    //Sendo diferente se retorna o primeiro digito verificador 
    return soma != cpf[9];
}

    //Estrutura de validação semelhante ao primeiro digito se altera somente as quantidades posições que sera feita o laço de repetição 
    function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;
    
    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[10];
}