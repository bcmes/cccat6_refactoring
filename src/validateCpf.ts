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
export function validate(cpf: string) {
    if (cpf === null) return false;
    if (cpf === undefined) return false;
    cpf = clean(cpf);
    if (!isValidLength(cpf)) return false;
    if (allDigitsEquals(cpf)) return false;

    let d1 = 0;
    let d2 = 0;
    for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
        const digito = parseInt(cpf.substring(nCount - 1, nCount));
        d1 = d1 + (11 - nCount) * digito;
        d2 = d2 + (12 - nCount) * digito;
    };
    let rest = (d1 % 11);
    let dg1 = (rest < 2) ? 0 : 11 - rest;
    d2 += 2 * dg1;
    rest = (d2 % 11);
    let dg2 = (rest < 2) ? 0 : 11 - rest;

    let nDigVerific = cpf.slice(9);
    const nDigResult = `${dg1}${dg2}`;
    return nDigVerific == nDigResult;

    function isValidLength(cpf: string) {
        return cpf.length === 11;
    }

    function allDigitsEquals(cpf: string) {
        return cpf.split("").every(c => c === cpf[0]);
    }

    function clean(cpf: string) {
        return cpf.replace(/\D/g, '')
    }
}