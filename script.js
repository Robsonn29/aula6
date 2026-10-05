import { aleatorio, nomes } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const caixaResultado = document.querySelector(".caixa-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Sorteia o nome
let nome = aleatorio(nomes);


// Substitui "você" pelo nome sorteado
function substituiNome() {

    for (const pergunta of perguntas) {

        pergunta.enunciado = pergunta.enunciado.replace(
            /você/gi,
            nome
        );
    }
}


// Mostra a pergunta
function mostraPergunta() {

    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;

    mostraAlternativas();
}


// Mostra as alternativas
function mostraAlternativas() {

    caixaAlternativas.innerHTML = "";

    for (const alternativa of perguntaAtual.alternativas) {

        const botaoAlternativas = document.createElement("button");

        botaoAlternativas.textContent = alternativa.texto;

        botaoAlternativas.addEventListener("click", function () {

            const afirmacaoAleatoria = aleatorio(
                alternativa.afirmacao
            );

            historiaFinal += afirmacaoAleatoria + " ";

            atual++;

            mostraPergunta();
        });

        caixaAlternativas.appendChild(botaoAlternativas);
    }
}


// Mostra o resultado
function mostraResultado() {

    caixaPerguntas.textContent =
        `Seu perfil no futebol, ${nome}!`;

    caixaAlternativas.innerHTML = "";

    textoResultado.textContent = historiaFinal;

    caixaResultado.classList.add("mostrar");
}


// Jogar novamente
function jogaNovamente() {

    atual = 0;
    historiaFinal = "";

    // Sorteia outro nome
    nome = aleatorio(nomes);

    // Remove o resultado
    caixaResultado.classList.remove("mostrar");

    // Recarrega as perguntas
    location.reload();
}


// Botão de jogar novamente
botaoJogarNovamente.addEventListener(
    "click",
    jogaNovamente
);


// Substitui o "você" pelo nome
substituiNome();


// Inicia o quiz
mostraPergunta();