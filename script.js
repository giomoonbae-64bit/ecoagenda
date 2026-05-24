/**
 * ==========================================================================
 * EcoAgenda - Código de Lógica JavaScript (LocalStorage, Agendamentos, Bloqueios)
 * ==========================================================================
 */

// CONFIGURAÇÃO DOS HORÁRIOS PADRÃO (08:00 às 18:00, intervalos de 30min)
const HORARIOS_DISPONIVEIS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30"
];

// VARIÁVEIS DE ESTADO GLOBAL
let agendamentos = [];
let datasBloqueadas = [];

// INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  // Carregar dados salvos no localStorage
  carregarDados();

  // Definir limites de data mínima nos inputs (Evitar agendar/bloquear datas passadas)
  configurarLimitesDeData();

  // Renderizar exibições iniciais
  atualizarEstatisticas();
  renderizarAgendamentos();
  renderizarBloqueios();

  // Monitorar hash na URL para navegação direta caso ocorra
  const hash = window.location.hash.replace("#", "");
  if (hash && ["home", "agendar", "admin", "bloqueios"].includes(hash)) {
    showSection(hash);
  }
});

// ==========================================
// 1. PERSISTÊNCIA (localStorage)
// ==========================================

function carregarDados() {
  const agendamentosSalvos = localStorage.getItem("ecoagenda_agendamentos");
  const bloqueiosSalvos = localStorage.getItem("ecoagenda_bloqueios");

  agendamentos = agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
  datasBloqueadas = bloqueiosSalvos ? JSON.parse(bloqueiosSalvos) : [];
}

function salvarDados() {
  localStorage.setItem("ecoagenda_agendamentos", JSON.stringify(agendamentos));
  localStorage.setItem("ecoagenda_bloqueios", JSON.stringify(datasBloqueadas));

  // Atualizar a interface do usuário após modificações nos dados
  atualizarEstatisticas();
}

// ==========================================
// 2. NAVEGAÇÃO & MENU MOBILE
// ==========================================

function showSection(sectionId) {
  // Ocultar todas as seções
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });

  // Mostrar seção selecionada
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add("active");
  }

  // Atualizar estado de ativo no menu de navegação
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Fechar menu mobile se estiver aberto
  const nav = document.getElementById("nav");
  nav.classList.remove("mobile-active");

  // Rolar para o topo da página suavemente
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMenu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("mobile-active");
}

// Configurar data mínima (hoje) para os inputs de data
function configurarLimitesDeData() {
  const localDate = new Date();
  const offset = localDate.getTimezoneOffset();
  const adjustedDate = new Date(localDate.getTime() - (offset * 60 * 1000));
  const hoje = adjustedDate.toISOString().split("T")[0];

  const inputDataAgendamento = document.getElementById("dataAgendamento");
  const inputDataBloqueio = document.getElementById("dataBloqueio");
  const inputEditData = document.getElementById("editData");

  if (inputDataAgendamento) inputDataAgendamento.min = hoje;
  if (inputDataBloqueio) inputDataBloqueio.min = hoje;
  if (inputEditData) inputEditData.min = hoje;
}

// ==========================================
// 3. ESTATÍSTICAS AMBIENTAIS (ECO IMPACT)
// ==========================================

function atualizarEstatisticas() {
  const totalAgendamentos = agendamentos.length;

  // Cada agendamento digital economiza:
  // - 1 folha de papel A4 física
  // - 10 litros de água (usados no processamento e produção de papel)
  // - 0.0001 de árvore preservada
  const folhasEconomizadas = totalAgendamentos;
  const aguaPreservada = totalAgendamentos * 10;

  // Atualizar elementos na DOM
  const elArvores = document.getElementById("statArvores");
  const elAgua = document.getElementById("statAgua");
  const elAgendamentos = document.getElementById("statAgendamentos");

  if (elArvores) elArvores.textContent = folhasEconomizadas;
  if (elAgua) elAgua.textContent = `${aguaPreservada}L`;
  if (elAgendamentos) elAgendamentos.textContent = totalAgendamentos;
}

// ==========================================
// 4. MÁSCARA E AUXILIAR DE TELEFONE
// ==========================================

function mascaraTelefone(input) {
  let val = input.value.replace(/\D/g, ""); // Remove não-dígitos
  if (val.length > 11) {
    val = val.substring(0, 11);
  }

  // Aplica máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (val.length > 6) {
    val = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
  } else if (val.length > 2) {
    val = `(${val.substring(0, 2)}) ${val.substring(2)}`;
  } else if (val.length > 0) {
    val = `(${val}`;
  }

  input.value = val;
}

// ==========================================
// 5. REGRA DE NEGÓCIO: HORÁRIOS DISPONÍVEIS & DATAS BLOQUEADAS
// ==========================================

function carregarHorariosDisponiveis() {
  const inputData = document.getElementById("dataAgendamento");
  const selectHorario = document.getElementById("horarioAgendamento");
  const hintData = document.getElementById("hintDataBloqueada");
  const erroData = document.getElementById("erroData");

  if (!inputData || !selectHorario) return;

  const dataSelecionada = inputData.value;
  selectHorario.innerHTML = "";
  hintData.textContent = "";
  erroData.textContent = "";

  if (!dataSelecionada) {
    selectHorario.innerHTML = '<option value="">Selecione uma data primeiro...</option>';
    return;
  }

  // Verificar se a data selecionada está bloqueada
  const dataBloqueada = datasBloqueadas.find(b => b.data === dataSelecionada);
  if (dataBloqueada) {
    erroData.textContent = "Esta data está bloqueada pelo administrador.";
    hintData.innerHTML = `⚠️ <strong>Motivo do bloqueio:</strong> ${dataBloqueada.motivo || "Não especificado"}`;
    selectHorario.innerHTML = '<option value="">Indisponível (Data Bloqueada)</option>';
    return;
  }

  // Filtrar horários ocupados para a data selecionada
  // Se for uma edição de agendamento existente, não considerar o próprio horário como ocupado
  const editandoId = document.getElementById("editandoId").value;

  const horariosOcupados = agendamentos
    .filter(a => a.data === dataSelecionada && a.id !== editandoId)
    .map(a => a.horario);

  const horariosDisponiveisFiltrados = HORARIOS_DISPONIVEIS.filter(h => !horariosOcupados.includes(h));

  if (horariosDisponiveisFiltrados.length === 0) {
    selectHorario.innerHTML = '<option value="">Nenhum horário disponível para esta data</option>';
  } else {
    selectHorario.innerHTML = '<option value="">Selecione um horário...</option>';
    horariosDisponiveisFiltrados.forEach(h => {
      const option = document.createElement("option");
      option.value = h;
      option.textContent = h;
      selectHorario.appendChild(option);
    });
  }
}

// ==========================================
// 6. CRIAÇÃO DE NOVO AGENDAMENTO
// ==========================================

function salvarAgendamento(event) {
  event.preventDefault();

  const nomeInput = document.getElementById("nomeCompleto");
  const telefoneInput = document.getElementById("telefone");
  const servicoSelect = document.getElementById("tipoServico");
  const dataInput = document.getElementById("dataAgendamento");
  const horarioSelect = document.getElementById("horarioAgendamento");
  const editandoId = document.getElementById("editandoId").value;

  // Reseta mensagens de erro
  document.getElementById("erroNome").textContent = "";
  document.getElementById("erroTelefone").textContent = "";
  document.getElementById("erroServico").textContent = "";
  document.getElementById("erroData").textContent = "";
  document.getElementById("erroHorario").textContent = "";

  let erro = false;

  // Validações básicas de campos
  if (!nomeInput.value.trim()) {
    document.getElementById("erroNome").textContent = "Por favor, informe seu nome completo.";
    erro = true;
  }
  if (!telefoneInput.value.trim() || telefoneInput.value.length < 14) {
    document.getElementById("erroTelefone").textContent = "Informe um telefone válido (ex: (11) 98888-7777).";
    erro = true;
  }
  if (!servicoSelect.value) {
    document.getElementById("erroServico").textContent = "Selecione o serviço/atendimento.";
    erro = true;
  }
  if (!dataInput.value) {
    document.getElementById("erroData").textContent = "Selecione uma data.";
    erro = true;
  }
  if (!horarioSelect.value) {
    document.getElementById("erroHorario").textContent = "Selecione um horário disponível.";
    erro = true;
  }

  if (erro) return;

  const dataSelecionada = dataInput.value;
  const horarioSelecionado = horarioSelect.value;

  // Verificar conflito de datas bloqueadas no momento do salvamento
  const dataBloqueada = datasBloqueadas.find(b => b.data === dataSelecionada);
  if (dataBloqueada) {
    showToast("Esta data foi bloqueada pelo administrador.", "danger");
    return;
  }

  // Verificar se há conflito de horário por garantia
  const conflito = agendamentos.some(a => a.data === dataSelecionada && a.horario === horarioSelecionado && a.id !== editandoId);
  if (conflito) {
    showToast("Este horário já foi reservado por outro cliente.", "danger");
    return;
  }

  if (editandoId) {
    // Modo Edição
    const index = agendamentos.findIndex(a => a.id === editandoId);
    if (index !== -1) {
      agendamentos[index].nome = nomeInput.value.trim();
      agendamentos[index].telefone = telefoneInput.value.trim();
      agendamentos[index].servico = servicoSelect.value;
      agendamentos[index].data = dataSelecionada;
      agendamentos[index].horario = horarioSelecionado;
      showToast("Agendamento atualizado com sucesso!", "success");
    }
  } else {
    // Modo Criação
    const novoAgendamento = {
      id: generateId(),
      nome: nomeInput.value.trim(),
      telefone: telefoneInput.value.trim(),
      servico: servicoSelect.value,
      data: dataSelecionada,
      horario: horarioSelecionado,
      status: "pendente", // Status padrão inicial: pendente
      dataCriacao: new Date().toISOString()
    };
    agendamentos.push(novoAgendamento);
    showToast("Agendamento realizado com sucesso!", "success");
  }

  salvarDados();
  limparFormulario();
  renderizarAgendamentos();

  // Direcionar para o painel admin ou manter na tela mostrando feedback de sucesso
  setTimeout(() => {
    showSection("admin");
  }, 1000);
}

function limparFormulario() {
  document.getElementById("formAgendamento").reset();
  document.getElementById("editandoId").value = "";
  document.getElementById("horarioAgendamento").innerHTML = '<option value="">Selecione uma data primeiro...</option>';
  document.getElementById("hintDataBloqueada").textContent = "";

  // Limpar spans de erro
  document.getElementById("erroNome").textContent = "";
  document.getElementById("erroTelefone").textContent = "";
  document.getElementById("erroServico").textContent = "";
  document.getElementById("erroData").textContent = "";
  document.getElementById("erroHorario").textContent = "";

  // Resetar texto do botão principal de salvar
  document.getElementById("btnSalvarAgendamento").innerHTML = "<span>✅</span> Confirmar agendamento";
}

// ==========================================
// 7. PAINEL ADMIN: LISTAGEM & OPERAÇÕES
// ==========================================

function renderizarAgendamentos() {
  const container = document.getElementById("listaAgendamentos");
  const emptyState = document.getElementById("emptyAdmin");

  if (!container) return;

  // Pegar filtros
  const busca = document.getElementById("filtroBusca").value.toLowerCase();
  const status = document.getElementById("filtroStatus").value;
  const data = document.getElementById("filtroData").value;

  // Filtrar dados
  const agendamentosFiltrados = agendamentos.filter(a => {
    const atendeBusca = !busca || a.nome.toLowerCase().includes(busca) || a.telefone.includes(busca) || a.servico.toLowerCase().includes(busca);
    const atendeStatus = !status || a.status === status;
    const atendeData = !data || a.data === data;
    return atendeBusca && atendeStatus && atendeData;
  });

  // Ordenar por data (mais recente no topo) e depois horário
  agendamentosFiltrados.sort((a, b) => {
    if (a.data !== b.data) {
      return a.data.localeCompare(b.data);
    }
    return a.horario.localeCompare(b.horario);
  });

  // Atualizar chips de resumo quantitativo
  const total = agendamentos.length;
  const pendentes = agendamentos.filter(a => a.status === "pendente").length;
  const confirmados = agendamentos.filter(a => a.status === "confirmado").length;

  document.getElementById("chipTotal").textContent = `Total: ${total}`;
  document.getElementById("chipPendente").textContent = `Pendentes: ${pendentes}`;
  document.getElementById("chipConfirmado").textContent = `Confirmados: ${confirmados}`;

  container.innerHTML = "";

  if (agendamentosFiltrados.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  const appList = document.createElement("div");
  appList.className = "appointment-list";

  agendamentosFiltrados.forEach(a => {
    const card = document.createElement("div");
    card.className = "appointment-card";

    // Formatar data em padrão brasileiro
    const [ano, mes, dia] = a.data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    card.innerHTML = `
      <div class="appointment-info">
        <div class="client-identity">
          <div class="client-name">${escapeHTML(a.nome)}</div>
          <div class="client-phone">📞 ${escapeHTML(a.telefone)}</div>
        </div>
        <div>
          <span class="service-badge">${escapeHTML(a.servico)}</span>
        </div>
        <div class="appointment-time-box">
          <span>📅 ${dataFormatada}</span>
          <span>🕐 ${a.horario}</span>
        </div>
        <div>
          <span class="status-indicator status-${a.status}">
            ${a.status === "confirmado" ? "✔ Confirmado" : "⏳ Pendente"}
          </span>
        </div>
      </div>
      <div class="appointment-actions">
        ${a.status === "pendente" ? `
          <button class="btn btn-sm btn-primary" onclick="confirmarAgendamento('${a.id}')" title="Confirmar Agendamento">
            Confirmar
          </button>
        ` : ""}
        <button class="btn btn-sm btn-outline" onclick="abrirModalEdicao('${a.id}')" title="Editar">
          Editar
        </button>
        <button class="btn btn-sm btn-danger" onclick="excluirAgendamento('${a.id}')" title="Excluir">
          Excluir
        </button>
      </div>
    `;

    appList.appendChild(card);
  });

  container.appendChild(appList);
}

function filtrarAgendamentos() {
  renderizarAgendamentos();
}

function limparFiltros() {
  document.getElementById("filtroBusca").value = "";
  document.getElementById("filtroStatus").value = "";
  document.getElementById("filtroData").value = "";
  renderizarAgendamentos();
}

// Confirmar Agendamento
function confirmarAgendamento(id) {
  const index = agendamentos.findIndex(a => a.id === id);
  if (index !== -1) {
    agendamentos[index].status = "confirmado";
    salvarDados();
    renderizarAgendamentos();
    showToast("Agendamento confirmado com sucesso!", "success");
  }
}

// Excluir Agendamento
function excluirAgendamento(id) {
  if (confirm("Tem certeza que deseja excluir este agendamento?")) {
    agendamentos = agendamentos.filter(a => a.id !== id);
    salvarDados();
    renderizarAgendamentos();
    showToast("Agendamento excluído com sucesso.", "warning");
  }
}

// ==========================================
// 8. MODAL DE EDIÇÃO DE AGENDAMENTO
// ==========================================

function abrirModalEdicao(id) {
  const a = agendamentos.find(item => item.id === id);
  if (!a) return;

  document.getElementById("editId").value = a.id;
  document.getElementById("editNome").value = a.nome;
  document.getElementById("editTelefone").value = a.telefone;
  document.getElementById("editServico").value = a.servico;
  document.getElementById("editData").value = a.data;

  // Carregar os horários para a modal de edição de acordo com a data configurada
  carregarHorariosModal(a.horario);

  document.getElementById("modalOverlay").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

function carregarHorariosModal(horarioSelecionado = "") {
  const inputData = document.getElementById("editData");
  const selectHorario = document.getElementById("editHorario");
  const editId = document.getElementById("editId").value;

  if (!inputData || !selectHorario) return;

  const dataSelecionada = inputData.value;
  selectHorario.innerHTML = "";

  if (!dataSelecionada) {
    selectHorario.innerHTML = '<option value="">Selecione uma data...</option>';
    return;
  }

  // Verificar se a data está bloqueada
  const dataBloqueada = datasBloqueadas.find(b => b.data === dataSelecionada);
  if (dataBloqueada) {
    selectHorario.innerHTML = '<option value="">Indisponível (Data Bloqueada)</option>';
    showToast("Esta data está bloqueada pelo administrador.", "danger");
    return;
  }

  // Filtrar horários ocupados (excluindo o agendamento atual para permitir manter o mesmo horário)
  const horariosOcupados = agendamentos
    .filter(a => a.data === dataSelecionada && a.id !== editId)
    .map(a => a.horario);

  const horariosDisponiveis = HORARIOS_DISPONIVEIS.filter(h => !horariosOcupados.includes(h) || h === horarioSelecionado);

  horariosDisponiveis.forEach(h => {
    const option = document.createElement("option");
    option.value = h;
    option.textContent = h;
    if (h === horarioSelecionado) {
      option.selected = true;
    }
    selectHorario.appendChild(option);
  });
}

function salvarEdicao() {
  const id = document.getElementById("editId").value;
  const nome = document.getElementById("editNome").value.trim();
  const telefone = document.getElementById("editTelefone").value.trim();
  const servico = document.getElementById("editServico").value;
  const data = document.getElementById("editData").value;
  const horario = document.getElementById("editHorario").value;

  if (!nome || !telefone || !servico || !data || !horario) {
    showToast("Por favor, preencha todos os campos obrigatórios na modal.", "danger");
    return;
  }

  // Validação extra de data bloqueada
  const dataBloqueada = datasBloqueadas.find(b => b.data === data);
  if (dataBloqueada) {
    showToast("Data bloqueada. Selecione outra data.", "danger");
    return;
  }

  // Validação de conflito de horário
  const conflito = agendamentos.some(a => a.data === data && a.horario === horario && a.id !== id);
  if (conflito) {
    showToast("Este horário já está ocupado por outro agendamento.", "danger");
    return;
  }

  const index = agendamentos.findIndex(a => a.id === id);
  if (index !== -1) {
    agendamentos[index].nome = nome;
    agendamentos[index].telefone = telefone;
    agendamentos[index].servico = servico;
    agendamentos[index].data = data;
    agendamentos[index].horario = horario;

    salvarDados();
    renderizarAgendamentos();
    fecharModal();
    showToast("Agendamento editado com sucesso!", "success");
  }
}

// ==========================================
// 9. BLOQUEIO DE DATAS
// ==========================================

function bloquearData() {
  const inputData = document.getElementById("dataBloqueio");
  const inputMotivo = document.getElementById("motivoBloqueio");

  if (!inputData || !inputData.value) {
    showToast("Selecione uma data válida para bloquear.", "danger");
    return;
  }

  const dataBloqueio = inputData.value;
  const motivoBloqueio = inputMotivo.value.trim();

  // Verificar se a data já está bloqueada
  if (datasBloqueadas.some(b => b.data === dataBloqueio)) {
    showToast("Esta data já se encontra bloqueada.", "danger");
    return;
  }

  const novoBloqueio = {
    id: generateId(),
    data: dataBloqueio,
    motivo: motivoBloqueio,
    dataCriacao: new Date().toISOString()
  };

  datasBloqueadas.push(novoBloqueio);
  salvarDados();
  renderizarBloqueios();
  
  // Atualizar tela de agendamento em tempo real caso a data esteja selecionada
  carregarHorariosDisponiveis();

  // Limpar inputs de bloqueio
  inputData.value = "";
  inputMotivo.value = "";

  showToast("Data bloqueada com sucesso!", "success");
}

function desbloquearData(id) {
  if (confirm("Tem certeza que deseja remover o bloqueio desta data?")) {
    datasBloqueadas = datasBloqueadas.filter(b => b.id !== id);
    salvarDados();
    renderizarBloqueios();
    
    // Atualizar tela de agendamento em tempo real
    carregarHorariosDisponiveis();
    
    showToast("Bloqueio removido com sucesso.", "warning");
  }
}

function renderizarBloqueios() {
  const container = document.getElementById("listaBloqueios");
  const emptyState = document.getElementById("emptyBloqueios");

  if (!container) return;

  // Ordenar por data
  datasBloqueadas.sort((a, b) => a.data.localeCompare(b.data));

  container.innerHTML = "";

  if (datasBloqueadas.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  datasBloqueadas.forEach(b => {
    const item = document.createElement("div");
    item.className = "bloqueio-item";

    const [ano, mes, dia] = b.data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    item.innerHTML = `
      <div class="bloqueio-info">
        <h4>🚫 ${dataFormatada}</h4>
        <p>${escapeHTML(b.motivo || "Sem motivo especificado")}</p>
      </div>
      <button class="btn btn-sm btn-outline btn-danger" onclick="desbloquearData('${b.id}')">
        Desbloquear
      </button>
    `;

    container.appendChild(item);
  });
}

// ==========================================
// 10. TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(mensagem, tipo = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${tipo}`;

  let icone = "📢";
  if (tipo === "success") icone = "🌿";
  if (tipo === "danger") icone = "⚠️";
  if (tipo === "warning") icone = "🗑️";

  toast.innerHTML = `<span>${icone}</span> <span>${mensagem}</span>`;

  container.appendChild(toast);

  // Remover o toast após 4 segundos
  setTimeout(() => {
    toast.style.animation = "toastIn 0.3s reverse forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// ==========================================
// 11. UTILITÁRIOS
// ==========================================

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
