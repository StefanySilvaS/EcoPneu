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

  // Esconde se já estiver aberto
  if (div.style.display === "block") {
    div.style.display = "none";
    return;
  }

  // Conteúdos de cada etapa com imagens
  let textos = {
    coleta: `
  <strong>📍 Onde coletar:</strong><br>
  - Borracharias parceiras<br>
  - Pontos de coleta municipais<br>
  - Empresas de logística reversa<br><br>
  <img src="imagens/coleta1.jpg" alt="Borracharias" style="width:100%; border-radius:10px; margin-top:8px;">
  <img src="imagens/coleta2.jpg" alt="Entrega de pneus" style="width:100%; border-radius:10px; margin-top:8px;">
`,
    recebimento: `
  <strong>🏭 Recebimento e armazenamento:</strong><br>
  - Pneus armazenados em galpões seguros<br>
  - Evita acúmulo de água e mosquitos<br><br>
  <img src="imagens/recebimento1.jpg" alt="Armazenamento seguro" style="width:100%; border-radius:10px; margin-top:8px;">
`,
    triagem: `
      <strong>🔍 Triagem:</strong><br>
      - Pneus em bom estado → reutilização<br>
      - Pneus danificados → reciclagem<br>
      - Destino correto evita impacto ambiental<br><br>
      <img src="imagens/triagem1.jpg" alt="Triagem de pneus" style="width:100%; border-radius:10px; margin-top:8px;">
    `,
    transporte: `
      <strong>🚚 Transporte:</strong><br>
      - Empresas especializadas transportam os pneus<br>
      - Caminhões ou carretas adequadas<br><br>
      <img src="imagens/transporte1.jpg" alt="Transporte de pneus" style="width:100%; border-radius:10px; margin-top:8px;">
    `,
    reciclagem: `
      <strong>♻️ Produtos reciclados:</strong><br>
      - Pisos de borracha<br>
      - Asfalto ecológico<br>
      - Brinquedos ou mobiliário urbano<br><br>
      <img src="imagens/reciclagem1.jpg" alt="Produtos reciclados" style="width:100%; border-radius:10px; margin-top:8px;">
    `
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
function apagarHistorico() {
  if(confirm("Tem certeza que deseja apagar todo o histórico?")) {
    localStorage.removeItem("historico");
    mostrarHistorico();
  }
}