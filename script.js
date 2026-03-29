function iniciar() {
  let form = document.getElementById("formulario");
  form.style.display = "block";
  form.style.animation = "aparecer 0.5s ease";

  let btn = document.getElementById("btnIniciar");
  if (btn) btn.style.display = "none";

  form.scrollIntoView({ behavior: "smooth" });
}

function agendarColeta() {
  let nome = document.getElementById("nome").value;
  let quantidade = document.getElementById("quantidade").value;
  let tipo = document.getElementById("tipo").value;
  let endereco = document.getElementById("endereco").value;
  let data = document.getElementById("data").value;

  if (!nome || !quantidade || !tipo || !endereco || !data) {
    alert("⚠️ Preencha todos os campos!");
    return;
  }

  let novaColeta = { nome, quantidade, tipo, endereco, data };

  let historico = JSON.parse(localStorage.getItem("historico") || "[]");

  historico.push(novaColeta);

  localStorage.setItem("historico", JSON.stringify(historico));

  mostrarHistorico();

  document.getElementById("mensagem").innerHTML = "✅ Coleta agendada com sucesso!";

  // limpar campos
  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("data").value = "";
}

function mostrarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historico") || "[]");
  let div = document.getElementById("historico");

  if (!div) return;

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
    coleta: `
      <strong>📍 Onde coletar:</strong><br>
      - Borracharias parceiras<br>
      - Pontos de coleta municipais<br>
      - Empresas de logística reversa<br><br>
      <img src="imagens/coleta1.jpg" style="width:100%; border-radius:10px;">
    `,
    recebimento: `
      <strong>🏭 Recebimento:</strong><br>
      - Armazenamento seguro<br>
      <img src="imagens/recebimento1.jpg" style="width:100%; border-radius:10px;">
    `,
    triagem: `
      <strong>🔍 Triagem:</strong><br>
      - Separação dos pneus
    `,
    transporte: `
      <strong>🚚 Transporte:</strong><br>
      - Envio para reciclagem
    `,
    reciclagem: `
      <strong>♻️ Reciclagem:</strong><br>
      - Novos produtos
    `
  };

  div.innerHTML = textos[etapa];
  div.style.display = "block";
}

function apagarHistorico() {
  let confirmar = confirm("Tem certeza que deseja apagar todo o histórico?");

  if (confirmar) {
    localStorage.removeItem("historico");
    mostrarHistorico();
  }
}

window.onload = function () {
  mostrarHistorico();
};