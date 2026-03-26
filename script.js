function iniciar() {
  let form = document.getElementById("formulario");
  form.style.display = "block";
  form.style.animation = "aparecer 0.5s ease";
  document.getElementById("btnIniciar").style.display = "none";
  form.scrollIntoView({ behavior: "smooth" });
}

function agendarColeta() {
  let nome = document.getElementById("nome").value;
  let quantidade = document.getElementById("quantidade").value;
  let tipo = document.getElementById("tipo").value;
  let endereco = document.getElementById("endereco").value;
  let data = document.getElementById("data").value;

  if (nome === "" || quantidade === "" || endereco === "" || data === "" || tipo === "") {
    alert("⚠️ Preencha todos os campos!");
    return;
  }

  let mensagemDiv = document.getElementById("mensagem");
  mensagemDiv.innerHTML = "✅ Coleta agendada com sucesso!";
  mensagemDiv.style.animation = "aparecer 0.5s ease";

  let novaColeta = { nome, quantidade, tipo, endereco, data };
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push(novaColeta);
  localStorage.setItem("historico", JSON.stringify(historico));

  mostrarHistorico();

  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("data").value = "";
}

function mostrarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  let div = document.getElementById("historico");
  div.innerHTML = "";

  historico.forEach((item) => {
    div.innerHTML += `
      <div class="item-historico">
        <strong>${item.nome}</strong> - ${item.quantidade} pneus (${item.tipo})<br>
        📍 ${item.endereco}<br>
        📅 ${item.data}
      </div>
    `;
  });
}

function mostrarDetalhe(etapa) {
  let div = document.getElementById(etapa);
  if (!div) return;

  if (div.style.display === "block") {
    div.style.display = "none";
    return;
  }

  let textos = {
    coleta: "✔ Solicite a coleta pelo site<br>✔ Leve até borracharias<br>✔ Procure pontos de coleta na sua cidade",
    recebimento: "✔ Pneus são armazenados corretamente<br>✔ Evita acúmulo de água e mosquitos",
    triagem: "✔ Pneus bons → reutilização<br>♻️ Pneus danificados → reciclagem<br>❌ Sem uso → descarte correto",
    transporte: "✔ Empresas especializadas fazem o transporte<br>✔ Caminhões levam até recicladoras",
    reciclagem: "✔ Produção de asfalto ecológico<br>✔ Pisos de borracha<br>✔ Materiais reutilizados"
  };

  div.innerHTML = textos[etapa];
  div.style.display = "block";
}

function voltarInicio() {
  let form = document.getElementById("formulario");
  form.style.display = "none";
  document.getElementById("btnIniciar").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.onload = function () {
  mostrarHistorico();
};