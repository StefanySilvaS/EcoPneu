const fases = [
  {
    pergunta: "O pneu está inservível. O que o consumidor deve fazer?",
    opcoes: ["Jogar em terreno baldio", "Queimar o pneu", "Levar ao ponto de coleta"],
    correta: 2,
    impacto: "Descartar incorretamente causa acúmulo de água e dengue.",
    imagem: "ponto_coleta.png"
  },
  {
    pergunta: "O que acontece na borracheira?",
    opcoes: ["Recebe e armazena pneus usados", "Recicla imediatamente", "Queima os pneus"],
    correta: 0,
    impacto: "Armazenamento adequado evita riscos ambientais.",
    imagem: "borracheira.png"
  },
  {
    pergunta: "Como os pneus são transportados após a borracheira?",
    opcoes: ["Transportados para triagem", "Deixados na rua", "Queimados na borracharia"],
    correta: 0,
    impacto: "O transporte correto evita contaminação do solo e da água.",
    imagem: "transporte.png"
  },
  {
    pergunta: "O que acontece na triagem?",
    opcoes: ["Separação por tipo e condição", "Queima para energia", "Jogar em aterro"],
    correta: 0,
    impacto: "A triagem é essencial para a reciclagem eficiente.",
    imagem: "triagem.png"
  },
  {
    pergunta: "Qual é o destino final dos pneus reciclados?",
    opcoes: ["Produtos reciclados", "Areia", "Nada"],
    correta: 0,
    impacto: "Os pneus reciclados se transformam em produtos úteis.",
    imagem: "produtos_reciclados.png"
  }
];

let pontos = 0;
let faseAtual = 0;

function mostrarFase() {
  const fase = fases[faseAtual];
  const perguntaEl = document.getElementById("pergunta");
  const imagemEl = document.getElementById("imagemFase");
  const opcoesContainer = document.getElementById("opcoes");
  const feedback = document.getElementById("feedback");

  perguntaEl.innerText = fase.pergunta;
  imagemEl.src = fase.imagem;

  opcoesContainer.innerHTML = "";
  feedback.innerHTML = "";

  fase.opcoes.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<span>${opcao}</span> <span class="iconeOpcao"></span>`;
    btn.onclick = () => verificarResposta(index, btn);
    opcoesContainer.appendChild(btn);
  });

  atualizarProgresso();
}

function verificarResposta(indice, botaoClicado) {
  const fase = fases[faseAtual];
  const feedback = document.getElementById("feedback");
  const botoes = document.querySelectorAll("#opcoes button");

  botoes.forEach(b => b.disabled = true);

  if (indice === fase.correta) {
    pontos++;
    botaoClicado.querySelector(".iconeOpcao").innerText = "✔️";
    botaoClicado.style.backgroundColor = "#c8e6c9";
    feedback.innerHTML = `<span style="color:green;">Correto!</span> ${fase.impacto}`;

    setTimeout(() => {
      faseAtual++;
      if (faseAtual < fases.length) {
        mostrarFase();
      } else {
        mostrarResultado();
      }
    }, 3000);

  } else {
    botaoClicado.querySelector(".iconeOpcao").innerText = "❌";
    botaoClicado.style.backgroundColor = "#ffcdd2";
  
    botoes[fase.correta].querySelector(".iconeOpcao").innerText = "✔️";
    botoes[fase.correta].style.backgroundColor = "#c8e6c9";
    feedback.innerHTML = `<span style="color:red;">Errado!</span> ${fase.impacto}`;

    setTimeout(() => {
      botoes.forEach(b => b.disabled = false);
      botoes.forEach(b => b.querySelector(".iconeOpcao").innerText = "");
      botoes.forEach(b => b.style.backgroundColor = "");
      feedback.innerHTML = "";
    }, 1500);
  }

  atualizarProgresso();
}

function atualizarProgresso() {
  const barra = document.getElementById("barraProgresso");
  barra.style.width = (faseAtual / fases.length) * 100 + "%";
}

function mostrarResultado() {
  document.body.innerHTML = `<div style="text-align:center;margin-top:50px;">
    <h2>Fim do jogo!</h2>
    <p>Pontos: ${pontos} de ${fases.length}</p>
  </div>`;
}

window.onload = mostrarFase;