//importes para ativação das funções
import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
//seleção de todos elementos do html com atributos required ou seja todos os elementos de campo obrigatório
const camposDoFormulario = document.querySelectorAll('[required]')
//seleção do atribuito data-fomulario do html
const formulario = document.querySelector('[data-formulario]');
//addEventListener para o evento de envio
formulario.addEventListener("submit", (e) => {
    //por sua vez recolhido pelo preventDefault
    e.preventDefault();
    /*A lista que criamos navegará pelo evento do formulário e selecionará o alvo e.target , 
    os elements que possuem o nome daquele alvo, e também o seu value.*/
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }
    /*localStorage no qual adicionaremos um set.item, que possuirá como parâmetros 
    o cadastro e um JSON.stringify() que converterá para JSON o nosso listaRespostas, 
    tornando possível o salvamento dos dados do formulário.*/
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    /*Também adicionaremos um window.location.href que redirecionará a pessoa usuária 
    para a próxima etapa do formulário — a de reconhecimento facial, recebendo 
    a rota desse arquivo: abrir-conta-form-2.html.*/
    window.location.href = "./abrir-conta-form-2.html";
})
//pegar o campo do formulário para verificar evento de blur: que remove o foco do input sendo o gatilho para as validações
/*Cada campo do formulário será recuperado pela função forEach e chamado de campo, que por sua vez possuirá um 
event listener aguardando o evento blur acontecer.*/
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    //desativando mensagem de erro padrão para customização destas 
    campo.addEventListener("invalid", evento => evento.preventDefault())
})
//lista de erros
const tiposDeErro = [
    //ocorre quando deixamos o campo vazio;
    'valueMissing',
    //ocorre quando erramos o tipo de input no campo, como por exemplo, na inserção de um e-mail sem o símbolo @;
    'typeMismatch',
    //ocorre especialmente no campo de CPF que possui um padrão de expressão regular. Se o input não segui-lo, este erro será ativado;
    'patternMismatch',
    //está relacionado aos atributos minlength e maxLength que inserimos em diversos pontos do código. Ele serve para acusar quando os padrões de comprimento do input não forem atendidos;
    'tooShort',
    //se refere a erros customizados, como nos casos em que inserimos as lógicas de validação ehUmCPF e ehMaiorDeIdade.
    'customError'
]
/*Criamos uma lista reunindo todos os tipos de erros que podem ocorrer e outra lista com as mensagens customizadas para 
cada um deles. Vamos configurar a aplicação para que, ao ativarmos cada erro, a sua respectiva mensagem apareçam na tela.*/
//customização das mensagem de erro
/*Imprimiremos as mensagens de erro customizadas para cada tipo de erro de acordo 
com o campo que estava sendo preenchido foi criado um objeto com os atributos 
referentes ao valor “name” dos inputs.
Para cada atributo, também forneceremos um objeto com os possíveis tipos de erros e as mensagens apropriadas. */
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    /*consertando erro de se adicionarmos qualquer dado válido por cima de um dado 
    inválido, a mensagem de erro permanecerá na tela.
    Para consertar esse problema, configuraremos a aplicação para redefinir o 
    setCustomValidity() do campo com valor vazio.
    Adicionaremos no campo "CPF" um CPF inválido e clicaremos fora do campo. 
    A mensagem de erro será exibida. Se, em seguida, adicionarmos um CPF válido, 
    a mensagem de erro abaixo do campo desaparecerá.*/
    campo.setCustomValidity('');
    //verificando campo de cpf
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    //verificando campo se possui o nome aniversario e se ele esta vazio
    if (campo.name == "aniversario" && campo.value != "") {
    //Caso ambas as condições forem verdadeiras, ele chamará a função ehMaiorDeIdade() para aquele campo.
        ehMaiorDeIdade(campo);
    }
    //lista que executará uma função para cada item de erro
    tiposDeErro.forEach(erro => {
        //Em seu interior criamos um if que observará se o campo.validity é true, e em caso positivo, o erro está ocorrendo. 
        if (campo.validity[erro]) {
            //Incluimmos neste if a variável mensagem para receber uma mensagem de erro de dentro da lista mensagens[]
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    /*variável const mensagemErro que selecionará o span de mensagem-erro do nosso HTML através 
    de um campo.parentNode.querySelector que por sua vez receberá o código que copiamos: mensagem-erro. 
    Este comando selecionará somente o span do input mais próximo.*/
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    //Este trecho checará se o campo é válido ou não.
    const validadorDeInput = campo.checkValidity();
    //impressão de mensagem de erro caso validadorDeInput retorne false
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    //retornará um valor vazio caso o validadorDeInput retorne true  
    } else {
        mensagemErro.textContent = "";
    }
}

/*Para impressão de erro na tela devemos acessar o 
arquivo que representa o local em que devemos imprimir mensagens de erro: o abrir-conta-form.html.
Em seu interior verificaremos cada fieldset no qual existe um input name. Embaixo deste existe um 
span com a classe mensagem-erro — é nele que vamos inserir as mensagens de erro.
Copiaremos o trecho com o nome da classe: mensagem-erro e acessaremos novamente o arquivo script.js.
Os comandos que digitamos possibilitam que o sistema imprima as mensagens de erro padrão. Entretanto, 
queremos que ele imprima as mensagens customizadas. Para isso, acessaremos os arquivos valida-idade.js 
e valida-cpf.js, respectivamente. No interior das funções ehMaiorDeIdade e ehUmCPF de cada arquivo faremos 
as alterações abaixo:

-dentro de ehMaiorDeIdade substituiremos a função de verificação validaIdade por um if que verifica o 
validaIdade e recebe um parâmetro dataNascimento. Em seu interior adicionaremos um campo.setCustomValidity 
que receberá a nossa mensagem customizada: "A pessoa usuária não é maior de idade."*/