/**
 * ==========================================================================
 * EcoAgenda - Lógica JavaScript Reconstruída e Multi-Setorial
 * ==========================================================================
 */

// CONFIGURAÇÃO DOS HORÁRIOS PADRÃO (08:00 às 18:00, intervalos de 30min)
const HORARIOS_DISPONIVEIS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30"
];

// ESTRUTURAS DE PRESET DE INICIALIZAÇÃO (FÁBRICA)
const CATEGORIAS_PADRAO = [
  { id: "c_beleza", nome: "Estética & Beleza", icone: "💇" },
  { id: "c_educacao", nome: "Aulas & Educação", icone: "🎓" },
  { id: "c_saude", nome: "Saúde & Bem-estar", icone: "🏥" },
  { id: "c_tecnologia", nome: "TI & Assistência", icone: "🛠️" },
  { id: "c_negocios", nome: "Consultoria & Negócios", icone: "🏢" }
];

const SERVICOS_PADRAO = [
  // Beleza
  { id: "sb1", categoriaId: "c_beleza", nome: "Corte de Cabelo", descricao: "Corte masculino ou feminino e lavagem inclusa." },
  { id: "sb2", categoriaId: "c_beleza", nome: "Manicure & Pedicure", descricao: "Tratamento completo e esmaltação profissional." },
  { id: "sb3", categoriaId: "c_beleza", nome: "Design de Sobrancelhas", descricao: "Modelagem e limpeza estética facial." },
  { id: "sb4", categoriaId: "c_beleza", nome: "Limpeza de Pele", descricao: "Higienização facial profunda para remoção de cravos." },
  { id: "sb5", categoriaId: "c_beleza", nome: "Massagem Relaxante", descricao: "Sessão de massagem corporal antiestresse de 1 hora." },
  { id: "sb6", categoriaId: "c_beleza", nome: "Barba & Barboterapia", descricao: "Corte de barba com navalha e hidratação com toalha quente." },
  { id: "sb7", categoriaId: "c_beleza", nome: "Maquiagem Profissional", descricao: "Maquiagem de festa, social ou para sessões de fotos." },
  { id: "sb8", categoriaId: "c_beleza", nome: "Depilação Geral", descricao: "Depilação com cera quente descartável natural." },

  // Educação
  { id: "se1", categoriaId: "c_educacao", nome: "Aula Particular de Reforço", descricao: "Apoio escolar e explicação de conteúdo individualizada." },
  { id: "se2", categoriaId: "c_educacao", nome: "Mentoria de Carreira", descricao: "Planejamento profissional, revisão de currículo e portfólio." },
  { id: "se3", categoriaId: "c_educacao", nome: "Conversação em Idiomas", descricao: "Prática oral intensiva em inglês ou espanhol." },
  { id: "se4", categoriaId: "c_educacao", nome: "Preparatório para Concursos", descricao: "Resolução de questões e dicas de provas específicas." },
  { id: "se5", categoriaId: "c_educacao", nome: "Workshop de Tecnologia", descricao: "Introdução prática a ferramentas digitais essenciais." },
  { id: "se6", categoriaId: "c_educacao", nome: "Orientação Acadêmica (TCC)", descricao: "Auxílio na estruturação de monografias e relatórios." },

  // Saúde
  { id: "ss1", categoriaId: "c_saude", nome: "Consulta Médica Geral", descricao: "Consulta de rotina com médico geral para check-ups." },
  { id: "ss2", categoriaId: "c_saude", nome: "Retorno Clínico", descricao: "Análise de exames solicitados anteriormente." },
  { id: "ss3", categoriaId: "c_saude", nome: "Avaliação Nutricional", descricao: "Medição corporal e elaboração de cardápio saudável." },
  { id: "ss4", categoriaId: "c_saude", nome: "Reabilitação Fisioterapêutica", descricao: "Tratamento de dores articulares e musculares." },
  { id: "ss5", categoriaId: "c_saude", nome: "Sessão de Psicoterapia", descricao: "Atendimento terapêutico para cuidado com a saúde mental." },
  { id: "ss6", categoriaId: "c_saude", nome: "Sessão de Pilates Clínico", descricao: "Exercícios guiados de flexibilidade e postura." },
  { id: "ss7", categoriaId: "c_saude", nome: "Exame e Coleta Rápida", descricao: "Coleta laboratorial para exames rápidos agendados." },

  // TI
  { id: "st1", categoriaId: "c_tecnologia", nome: "Manutenção de Computador", descricao: "Conserto de peças, upgrade de SSD ou memória." },
  { id: "st2", categoriaId: "c_tecnologia", nome: "Formatação & Backup", descricao: "Limpeza de sistema e reinstalação segura do Windows/Mac." },
  { id: "st3", categoriaId: "c_tecnologia", nome: "Instalação de Redes e Wi-Fi", descricao: "Configuração de roteadores e repetidores de sinal." },
  { id: "st4", categoriaId: "c_tecnologia", nome: "Limpeza Interna e Pasta Térmica", descricao: "Manutenção física preventiva contra superaquecimento." },
  { id: "st5", categoriaId: "c_tecnologia", nome: "Recuperação de Arquivos", descricao: "Recuperação de dados deletados ou HDs danificados." },
  { id: "st6", categoriaId: "c_tecnologia", nome: "Visita Técnica e Orçamento", descricao: "Avaliação técnica local para orçamentos de redes ou CFTV." },

  // Negócios
  { id: "sn1", categoriaId: "c_negocios", nome: "Consultoria Financeira", descricao: "Análise de gastos e planejamento de orçamento pessoal ou MEI." },
  { id: "sn2", categoriaId: "c_negocios", nome: "Assessoria Jurídica Inicial", descricao: "Esclarecimento de dúvidas sobre contratos ou processos básicos." },
  { id: "sn3", categoriaId: "c_negocios", nome: "Sessão de Coaching e Foco", descricao: "Desenvolvimento de metas, hábitos e produtividade." },
  { id: "sn4", categoriaId: "c_negocios", nome: "Reunião de Alinhamento de Projetos", descricao: "Reunião comercial ou de andamento de demandas em andamento." },
  { id: "sn5", categoriaId: "c_negocios", nome: "Briefing e Criação de Escopo", descricao: "Levantamento detalhado para novos projetos e orçamentos." },
  { id: "sn6", categoriaId: "c_negocios", nome: "Mentoria de Novos Negócios", descricao: "Validação de ideias de negócios e primeiros passos de mercado." }
];

// VARIÁVEIS DE ESTADO GLOBAL
let agendamentos = [];
let datasBloqueadas = [];
let categorias = [];
let servicos = [];
let categoriaSelecionadaAgendar = "";

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
  renderizarCategoriasHome();
  renderizarCategoriasAgendar();
  renderizarCategoriasAdmin();
  renderizarServicosAdmin();

  // Monitorar hash na URL para navegação direta caso ocorra
  const hash = window.location.hash.replace("#", "");
  if (hash && ["home", "agendar", "admin", "bloqueios", "servicos"].includes(hash)) {
    showSection(hash);
  }
});

// ==========================================
// 1. PERSISTÊNCIA (localStorage)
// ==========================================

function carregarDados() {
  const agendamentosSalvos = localStorage.getItem("ecoagenda_agendamentos");
  const bloqueiosSalvos = localStorage.getItem("ecoagenda_bloqueios");
  const categoriasSalvas = localStorage.getItem("ecoagenda_categorias");
  const servicosSalvos = localStorage.getItem("ecoagenda_servicos");

  agendamentos = agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
  datasBloqueadas = bloqueiosSalvos ? JSON.parse(bloqueiosSalvos) : [];
  
  if (categoriasSalvas) {
    categorias = JSON.parse(categoriasSalvas);
  } else {
    categorias = [...CATEGORIAS_PADRAO];
    localStorage.setItem("ecoagenda_categorias", JSON.stringify(categorias));
  }

  if (servicosSalvos) {
    servicos = JSON.parse(servicosSalvos);
  } else {
    servicos = [...SERVICOS_PADRAO];
    localStorage.setItem("ecoagenda_servicos", JSON.stringify(servicos));
  }
}

function salvarDados() {
  localStorage.setItem("ecoagenda_agendamentos", JSON.stringify(agendamentos));
  localStorage.setItem("ecoagenda_bloqueios", JSON.stringify(datasBloqueadas));
  localStorage.setItem("ecoagenda_categorias", JSON.stringify(categorias));
  localStorage.setItem("ecoagenda_servicos", JSON.stringify(servicos));

  // Atualizar a interface do usuário após modificações nos dados
  atualizarEstatisticas();
}

// Resetar configurações de fábrica (Todos os presets)
function resetarPresetsFabrica() {
  if (confirm("⚠️ Tem certeza de que deseja apagar todos os serviços e categorias personalizadas e restaurar as opções de fábrica? Todos os agendamentos e bloqueios existentes serão mantidos.")) {
    categorias = [...CATEGORIAS_PADRAO];
    servicos = [...SERVICOS_PADRAO];
    salvarDados();
    
    // Atualizar UI
    renderizarCategoriasHome();
    renderizarCategoriasAgendar();
    renderizarCategoriasAdmin();
    renderizarServicosAdmin();
    
    // Resetar campos de agendamento ativos
    categoriaSelecionadaAgendar = "";
    document.querySelectorAll(".category-card-btn").forEach(btn => btn.classList.remove("active"));
    const selectServico = document.getElementById("tipoServico");
    if (selectServico) selectServico.innerHTML = '<option value="">Selecione uma categoria acima...</option>';

    showToast("Configurações originais de fábrica restauradas!", "success");
  }
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
// 6. JORNADA DO CLIENTE: SELEÇÃO DE CATEGORIAS E SERVIÇOS
// ==========================================

// Renderiza os atalhos de categoria na Home
function renderizarCategoriasHome() {
  const container = document.getElementById("gridCategoriasHome");
  if (!container) return;

  container.innerHTML = "";

  categorias.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-shortcut-card";
    card.onclick = () => selecionarSetorEAgendar(cat.id);

    // Contar serviços nessa categoria
    const totalServ = servicos.filter(s => s.categoriaId === cat.id).length;

    card.innerHTML = `
      <div class="shortcut-icon">${cat.icone}</div>
      <h3>${escapeHTML(cat.nome)}</h3>
      <span class="shortcut-count">${totalServ} serviços disponíveis</span>
    `;

    container.appendChild(card);
  });
}

// Redireciona da Home para aba de Agendar com categoria ativa
function selecionarSetorEAgendar(categoriaId) {
  showSection("agendar");
  selecionarCategoriaAgendar(categoriaId);
}

// Renderiza os botões visuais de categorias na tela de agendamento
function renderizarCategoriasAgendar() {
  const container = document.getElementById("seletorCategoriasAgendar");
  if (!container) return;

  container.innerHTML = "";

  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "category-card-btn";
    btn.setAttribute("data-id", cat.id);
    btn.onclick = () => selecionarCategoriaAgendar(cat.id);

    btn.innerHTML = `
      <span class="cat-btn-icon">${cat.icone}</span>
      <span class="cat-btn-text">${escapeHTML(cat.nome)}</span>
    `;

    container.appendChild(btn);
  });
}

// Lógica de ativação da categoria e recarga de serviços filtrados
function selecionarCategoriaAgendar(categoriaId) {
  categoriaSelecionadaAgendar = categoriaId;

  // Atualizar visual dos botões
  document.querySelectorAll(".category-card-btn").forEach(btn => {
    if (btn.getAttribute("data-id") === categoriaId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Limpar erro de serviço
  document.getElementById("erroServico").textContent = "";

  // Carregar os serviços dessa categoria no select do form
  const selectServico = document.getElementById("tipoServico");
  if (!selectServico) return;

  selectServico.innerHTML = '<option value="">Selecione o serviço...</option>';

  const servicosFiltrados = servicos.filter(s => s.categoriaId === categoriaId);

  if (servicosFiltrados.length === 0) {
    selectServico.innerHTML = '<option value="">Nenhum serviço cadastrado para esta categoria...</option>';
    return;
  }

  servicosFiltrados.forEach(s => {
    const option = document.createElement("option");
    option.value = s.nome;
    option.textContent = s.nome;
    selectServico.appendChild(option);
  });
}

// ==========================================
// 7. CRIAÇÃO DE NOVO AGENDAMENTO
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
  if (!categoriaSelecionadaAgendar) {
    document.getElementById("erroServico").textContent = "Por favor, selecione uma categoria/setor acima.";
    erro = true;
  } else if (!servicoSelect.value) {
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
    showToast("Este horário já foi reservado.", "danger");
    return;
  }

  if (editandoId) {
    // Modo Edição
    const index = agendamentos.findIndex(a => a.id === editandoId);
    if (index !== -1) {
      agendamentos[index].nome = nomeInput.value.trim();
      agendamentos[index].telefone = telefoneInput.value.trim();
      agendamentos[index].categoriaId = categoriaSelecionadaAgendar;
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
      categoriaId: categoriaSelecionadaAgendar,
      servico: servicoSelect.value,
      data: dataSelecionada,
      horario: horarioSelecionado,
      status: "pendente",
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

  // Desmarcar categoria selecionada
  categoriaSelecionadaAgendar = "";
  document.querySelectorAll(".category-card-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("tipoServico").innerHTML = '<option value="">Selecione uma categoria acima...</option>';

  // Limpar spans de erro
  document.getElementById("erroNome").textContent = "";
  document.getElementById("erroTelefone").textContent = "";
  document.getElementById("erroServico").textContent = "";
  document.getElementById("erroData").textContent = "";
  document.getElementById("erroHorario").textContent = "";

  // Resetar botão principal de salvar
  document.getElementById("btnSalvarAgendamento").innerHTML = "<span>✅</span> Confirmar agendamento";
}

// ==========================================
// 8. PAINEL ADMIN: LISTAGEM & OPERAÇÕES
// ==========================================

// Preenche filtros de categorias no admin
function renderizarCategoriasAdmin() {
  const selectFiltro = document.getElementById("filtroSetor");
  if (!selectFiltro) return;

  selectFiltro.innerHTML = '<option value="">Todos os setores</option>';

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = `${cat.icone} ${cat.nome}`;
    selectFiltro.appendChild(option);
  });
}

function renderizarAgendamentos() {
  const container = document.getElementById("listaAgendamentos");
  const emptyState = document.getElementById("emptyAdmin");

  if (!container) return;

  // Pegar filtros
  const busca = document.getElementById("filtroBusca").value.toLowerCase();
  const status = document.getElementById("filtroStatus").value;
  const data = document.getElementById("filtroData").value;
  const setor = document.getElementById("filtroSetor").value;

  // Filtrar dados
  const agendamentosFiltrados = agendamentos.filter(a => {
    const atendeBusca = !busca || 
                       a.nome.toLowerCase().includes(busca) || 
                       a.telefone.includes(busca) || 
                       a.servico.toLowerCase().includes(busca);
    const atendeStatus = !status || a.status === status;
    const atendeData = !data || a.data === data;
    const atendeSetor = !setor || a.categoriaId === setor;
    return atendeBusca && atendeStatus && atendeData && atendeSetor;
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

    // Achar ícone e nome da categoria
    const catInfo = categorias.find(c => c.id === a.categoriaId) || { nome: "Outro", icone: "💼" };

    // Formatar data em padrão brasileiro
    const [ano, mes, dia] = a.data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    card.innerHTML = `
      <div class="appointment-info">
        <div class="client-identity">
          <div class="client-name">${escapeHTML(a.nome)}</div>
          <div class="client-phone">📞 ${escapeHTML(a.telefone)}</div>
        </div>
        <div class="appointment-category-service">
          <span class="category-indicator-badge" title="Setor: ${escapeHTML(catInfo.nome)}">${catInfo.icone} ${escapeHTML(catInfo.nome)}</span>
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
  document.getElementById("filtroSetor").value = "";
  renderizarAgendamentos();
}

function confirmarAgendamento(id) {
  const index = agendamentos.findIndex(a => a.id === id);
  if (index !== -1) {
    agendamentos[index].status = "confirmado";
    salvarDados();
    renderizarAgendamentos();
    showToast("Agendamento confirmado!", "success");
  }
}

function excluirAgendamento(id) {
  if (confirm("Tem certeza que deseja excluir este agendamento?")) {
    agendamentos = agendamentos.filter(a => a.id !== id);
    salvarDados();
    renderizarAgendamentos();
    showToast("Agendamento excluído.", "warning");
  }
}

// ==========================================
// 9. MODAL DE EDIÇÃO DE AGENDAMENTO
// ==========================================

function abrirModalEdicao(id) {
  const a = agendamentos.find(item => item.id === id);
  if (!a) return;

  document.getElementById("editId").value = a.id;
  document.getElementById("editNome").value = a.nome;
  document.getElementById("editTelefone").value = a.telefone;
  document.getElementById("editData").value = a.data;

  // Carregar categorias no modal
  const selectModalCat = document.getElementById("editCategoria");
  if (selectModalCat) {
    selectModalCat.innerHTML = "";
    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = `${cat.icone} ${cat.nome}`;
      selectModalCat.appendChild(option);
    });
    selectModalCat.value = a.categoriaId;
  }

  // Carregar os serviços correspondentes à categoria no modal
  carregarServicosModalEdicao(a.categoriaId, a.servico);

  // Carregar horários para edição
  carregarHorariosModal(a.horario);

  document.getElementById("modalOverlay").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

function carregarServicosModalEdicao(categoriaId, servicoSelecionado = "") {
  const selectServico = document.getElementById("editServico");
  if (!selectServico) return;

  selectServico.innerHTML = "";
  const servicosFiltrados = servicos.filter(s => s.categoriaId === categoriaId);

  servicosFiltrados.forEach(s => {
    const option = document.createElement("option");
    option.value = s.nome;
    option.textContent = s.nome;
    if (s.nome === servicoSelecionado) {
      option.selected = true;
    }
    selectServico.appendChild(option);
  });
}

function aoMudarCategoriaModal() {
  const selectModalCat = document.getElementById("editCategoria");
  if (!selectModalCat) return;
  carregarServicosModalEdicao(selectModalCat.value);
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
    showToast("Data bloqueada pelo administrador.", "danger");
    return;
  }

  // Filtrar horários ocupados (exclui o atual para permitir manter)
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
  const categoriaId = document.getElementById("editCategoria").value;
  const servico = document.getElementById("editServico").value;
  const data = document.getElementById("editData").value;
  const horario = document.getElementById("editHorario").value;

  if (!nome || !telefone || !categoriaId || !servico || !data || !horario) {
    showToast("Preencha todos os campos obrigatórios.", "danger");
    return;
  }

  // Validação extra de data bloqueada
  const dataBloqueada = datasBloqueadas.find(b => b.data === data);
  if (dataBloqueada) {
    showToast("Data bloqueada. Selecione outra data.", "danger");
    return;
  }

  // Conflito de horário
  const conflito = agendamentos.some(a => a.data === data && a.horario === horario && a.id !== id);
  if (conflito) {
    showToast("Horário indisponível ou em conflito.", "danger");
    return;
  }

  const index = agendamentos.findIndex(a => a.id === id);
  if (index !== -1) {
    agendamentos[index].nome = nome;
    agendamentos[index].telefone = telefone;
    agendamentos[index].categoriaId = categoriaId;
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
// 10. BLOQUEIO DE DATAS
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
  carregarHorariosDisponiveis();

  inputData.value = "";
  inputMotivo.value = "";

  showToast("Data bloqueada com sucesso!", "success");
}

function desbloquearData(id) {
  if (confirm("Tem certeza que deseja remover o bloqueio desta data?")) {
    datasBloqueadas = datasBloqueadas.filter(b => b.id !== id);
    salvarDados();
    renderizarBloqueios();
    carregarHorariosDisponiveis();
    showToast("Bloqueio removido.", "warning");
  }
}

function renderizarBloqueios() {
  const container = document.getElementById("listaBloqueios");
  const emptyState = document.getElementById("emptyBloqueios");

  if (!container) return;

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
// 11. GERENCIAMENTO DE SERVIÇOS E CATEGORIAS (ADMIN)
// ==========================================

// Preenche o dropdown de categoria no formulário de novos serviços
function renderizarCategoriasAdminServicos() {
  const selectForm = document.getElementById("categoriaServicoForm");
  if (!selectForm) return;

  selectForm.innerHTML = '<option value="">Selecione uma categoria...</option>';

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = `${cat.icone} ${cat.nome}`;
    selectForm.appendChild(option);
  });
}

function renderizarServicosAdmin() {
  renderizarCategoriasAdminServicos(); // Mantém o formulário sincronizado

  const container = document.getElementById("listaServicosAdmin");
  const emptyState = document.getElementById("emptyServicosAdmin");

  if (!container) return;

  container.innerHTML = "";

  if (servicos.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  // Ordenar por categoria e depois por nome
  const servicosOrdenados = [...servicos].sort((a, b) => {
    const catA = categorias.find(c => c.id === a.categoriaId)?.nome || "";
    const catB = categorias.find(c => c.id === b.categoriaId)?.nome || "";
    if (catA !== catB) return catA.localeCompare(catB);
    return a.nome.localeCompare(b.nome);
  });

  servicosOrdenados.forEach(s => {
    const item = document.createElement("div");
    item.className = "servico-item";

    const catInfo = categorias.find(c => c.id === s.categoriaId) || { nome: "Outro", icone: "💼" };

    item.innerHTML = `
      <div class="servico-info">
        <h4>💼 ${escapeHTML(s.nome)}</h4>
        <span class="servico-category-tag">${catInfo.icone} ${escapeHTML(catInfo.nome)}</span>
        <p>${escapeHTML(s.descricao || "Sem descrição cadastrada")}</p>
      </div>
      <div class="servico-actions">
        <button class="btn btn-sm btn-outline" onclick="abrirEdicaoServico('${s.id}')" title="Editar">
          Editar
        </button>
        <button class="btn btn-sm btn-outline btn-danger" onclick="excluirServico('${s.id}')" title="Excluir">
          Excluir
        </button>
      </div>
    `;

    container.appendChild(item);
  });
}

function salvarServico() {
  const inputNome = document.getElementById("nomeServico");
  const selectCategoria = document.getElementById("categoriaServicoForm");
  const inputDescricao = document.getElementById("descricaoServico");
  const inputId = document.getElementById("editandoServicoId");

  if (!inputNome || !inputNome.value.trim() || !selectCategoria.value) {
    showToast("Por favor, preencha o nome do serviço e a categoria.", "danger");
    return;
  }

  const nome = inputNome.value.trim();
  const categoriaId = selectCategoria.value;
  const descricao = inputDescricao.value.trim();
  const id = inputId.value;

  // Duplicidade de nome
  const duplicado = servicos.some(s => s.nome.toLowerCase() === nome.toLowerCase() && s.categoriaId === categoriaId && s.id !== id);
  if (duplicado) {
    showToast("Serviço já existente nesta categoria.", "danger");
    return;
  }

  if (id) {
    // Editar
    const index = servicos.findIndex(s => s.id === id);
    if (index !== -1) {
      servicos[index].nome = nome;
      servicos[index].categoriaId = categoriaId;
      servicos[index].descricao = descricao;
      showToast("Serviço atualizado com sucesso!", "success");
    }
  } else {
    // Adicionar novo
    const novoServico = {
      id: generateId(),
      categoriaId: categoriaId,
      nome: nome,
      descricao: descricao
    };
    servicos.push(novoServico);
    showToast("Serviço cadastrado com sucesso!", "success");
  }

  salvarDados();
  renderizarServicosAdmin();
  renderizarCategoriasHome();
  renderizarCategoriasAgendar();
  limparFormularioServico();
}

function abrirEdicaoServico(id) {
  const s = servicos.find(item => item.id === id);
  if (!s) return;

  document.getElementById("editandoServicoId").value = s.id;
  document.getElementById("nomeServico").value = s.nome;
  document.getElementById("categoriaServicoForm").value = s.categoriaId;
  document.getElementById("descricaoServico").value = s.descricao || "";

  const btn = document.getElementById("btnSalvarServico");
  if (btn) btn.innerHTML = "<span>💾</span> Salvar alterações";
}

function limparFormularioServico() {
  document.getElementById("nomeServico").value = "";
  document.getElementById("categoriaServicoForm").value = "";
  document.getElementById("descricaoServico").value = "";
  document.getElementById("editandoServicoId").value = "";

  const btn = document.getElementById("btnSalvarServico");
  if (btn) btn.innerHTML = "<span>➕</span> Cadastrar serviço";
}

function excluirServico(id) {
  const s = servicos.find(item => item.id === id);
  if (!s) return;

  const emUso = agendamentos.some(a => a.servico === s.nome);
  let msg = "Deseja excluir este serviço?";
  if (emUso) {
    msg = `⚠️ Este serviço está sendo utilizado em agendamentos.\nExcluí-lo impedirá novos agendamentos, mas os registros antigos não serão afetados. Deseja prosseguir?`;
  }

  if (confirm(msg)) {
    servicos = servicos.filter(item => item.id !== id);
    salvarDados();
    renderizarServicosAdmin();
    renderizarCategoriasHome();
    renderizarCategoriasAgendar();
    showToast("Serviço excluído.", "warning");
    
    if (document.getElementById("editandoServicoId").value === id) {
      limparFormularioServico();
    }
  }
}

// ==========================================
// 12. TOAST NOTIFICATION SYSTEM
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
  if (tipo === "info") icone = "ℹ️";

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
// 13. UTILITÁRIOS
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
