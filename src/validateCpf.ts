/*Pontos de refatoração:
- linhas em branco dentro de método, delete, e aumente o line hight da IDE.
- código morto: código comentado, simplesmente apague, é pra isso que existe git. Se for usar de vez enguando, faz feature-flag.
- nome sem sentido com o proposito do processo a ser resolvido, a começar pela Classe, método e seus membros internos (variáveis, etc..)
- não misturar portugues com english
- comentários tentando exclarecer o código obscuro. Retire o comentario e refatore, com funcoes internas, etc..
- numeros mágicos, crie constantes.
- fragmento de código duplicado, extraia para um método.
- variaveis declaradas longe da utilizacao. Declare próximo do uso.
- condições confusas, apresentadas por aninhamentos, ficando longe da marge. Resolva negando primeiro, chamada de clausula guarda.
- um if-else com atribuição, deve-se usar ternário. Nunca use ternários aninhados, nesse caso volta pra if.
-> Obs.: Só é seguro refatorar com a pré-existência dos testes.
-> Obs.: Cobertura é diferente de validação de comportamento
-> Obs.: Teste de unidade é o teste de uma entidade ( um trecho de código que é independente de recursos, que tem regras isoladas, geralmente do dominio )
-> Obs.: Given When Then precisam estar claramente presentes, mas nao precisam estar didaticamente separados
-> Obs.: Testes devem:
    - Rápido: Se executar o mais rápido possível
    - Idependentes: Ser completamente idenpedentes uns dos outros
    - Repetivel: Se executado N vezes repetidamente, devem dar o mesmo resultado
    - Auto-Validado: Ter boas validações
    - Timely: Idealmente devem ser escritos antes do código
*/

const FACTOR_FIRST_DIGIT = 10;
const FACTOR_SECOND_DIGIT = 11;

export function validate(rawCpf: string) {
    if (!rawCpf) return false;
    const cpf = removeNonDigits(rawCpf);
    if (!isValidLength(cpf)) return false;
    if (allDigitsEqual(cpf)) return false;
    const firstDigit = calculateDigit(cpf, FACTOR_FIRST_DIGIT);
    const secondDigit = calculateDigit(cpf, FACTOR_SECOND_DIGIT);
    return extractDigit(cpf) === `${firstDigit}${secondDigit}`;
}

function removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
}

function isValidLength(cpf: string) {
    return cpf.length === 11;
}

function allDigitsEqual(cpf: string) {
    const [firstDigit] = cpf;
    return cpf.split("").every(digit => digit === firstDigit);
}

function calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
        if (factor > 1) total += parseInt(digit) * factor--;
    }
    const remainder = total % 11;
    return (remainder < 2) ? 0 : 11 - remainder;
}

function extractDigit(cpf: string) {
    return cpf.slice(9);
}