import { useState, useCallback, useMemo } from "react";
import { CARTAS, TEMAS } from "./data";

// =====================================================
// 🎮 PERFIL EXPRESS - JOGO DE PERGUNTAS E DICAS
// =====================================================

const CORES_CATEGORIA = {
  Pessoa: { bg: "#8b5cf6", badge: "#ede9fe", badgeText: "#6d28d9" },
  Lugar: { bg: "#10b981", badge: "#d1fae5", badgeText: "#047857" },
  Coisa: { bg: "#f59e0b", badge: "#fef3c7", badgeText: "#b45309" },
  Ano: { bg: "#0ea5e9", badge: "#e0f2fe", badgeText: "#0369a1" },
};

const CORES_TEMA = {
  "Ciência & Tech": "#06b6d4",
  "Comida & Bebida": "#f97316",
  "Cultura Brasileira": "#22c55e",
  "Cultura Nerd": "#7c3aed",
  "Esportes": "#3b82f6",
  "Fofocas & Famosos": "#ec4899",
  "Fofocas Internacionais": "#f472b6",
  "Geografia": "#14b8a6",
  "Geral": "#94a3b8",
  "História": "#a78bfa",
  "Influencers & Pop": "#f43f5e",
  "Música & Arte": "#e879f9",
  "Natureza & Animais": "#84cc16",
  "Personalidades": "#8b5cf6",
  "TV & Novelas": "#fbbf24",
};

const EMOJI_TEMA = {
  "Ciência & Tech": "🔬",
  "Comida & Bebida": "🍕",
  "Cultura Brasileira": "🇧🇷",
  "Cultura Nerd": "🎮",
  "Esportes": "⚽",
  "Fofocas & Famosos": "🗣️",
  "Fofocas Internacionais": "🌟",
  "Geografia": "🌍",
  "Geral": "🎲",
  "História": "📜",
  "Influencers & Pop": "📱",
  "Música & Arte": "🎵",
  "Natureza & Animais": "🦁",
  "Personalidades": "👤",
  "TV & Novelas": "📺",
};

// Preferências salvas no localStorage
const PREFS_KEY = "perfil-express-prefs";
const getPrefs = () => {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY)) || {};
  } catch { return {}; }
};
const savePrefs = (prefs) => {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
};

// =====================================================
// 💡 CURIOSIDADES GERAIS - aparecem aleatoriamente
// =====================================================
const CURIOSIDADES = [
  "O coração humano bate mais de 100.000 vezes por dia.",
  "O mel nunca estraga. Arqueólogos encontraram mel de 3.000 anos no Egito ainda comestível.",
  "Um raio é 5 vezes mais quente que a superfície do Sol.",
  "Os flamingos nascem brancos e ficam rosa por causa da alimentação.",
  "O cérebro humano gera eletricidade suficiente para acender uma lâmpada pequena.",
  "A Torre Eiffel cresce até 15 cm no verão por causa do calor que dilata o metal.",
  "Chovem diamantes em Júpiter e Saturno.",
  "O DNA de um ser humano esticado teria 600 viagens de ida e volta da Terra ao Sol.",
  "Há mais estrelas no universo do que grãos de areia em todas as praias da Terra.",
  "O animal mais letal para humanos é o mosquito.",
  "O olho de uma avestruz é maior que seu cérebro.",
  "A Lua está se afastando da Terra 3,8 cm por ano.",
  "Se você dobrar um papel 42 vezes, ele alcançaria a Lua.",
  "A água quente congela mais rápido que a água fria (Efeito Mpemba).",
  "Os golfinhos dormem com um olho aberto.",
  "Uma colher de chá de estrela de nêutrons pesa 6 bilhões de toneladas.",
  "O Monte Everest cresce cerca de 4 mm por ano.",
  "Os polvos têm 3 corações e sangue azul.",
  "Cleópatra viveu mais perto no tempo da ida à Lua do que da construção das pirâmides.",
  "Os tubarões existem há mais tempo que as árvores.",
  "A Groenlândia é tecnicamente a maior ilha do mundo.",
  "Existem mais bactérias no seu corpo do que células humanas.",
  "A Grande Muralha da China NÃO é visível do espaço a olho nu.",
  "Os koalas dormem até 22 horas por dia.",
  "Os romanos usavam urina como enxaguante bucal.",
  "O ponto mais profundo do oceano é mais fundo do que o Everest é alto.",
  "Uma nuvem média pesa cerca de 500 toneladas.",
  "O cheiro de chuva se chama petricor.",
  "O Saara já foi uma floresta verde há milhares de anos.",
  "As bananas são radioativas (contêm potássio-40).",
  "A Rússia tem mais área do que Plutão.",
  "O primeiro alarme de carro foi inventado em 1913.",
  "Você não consegue roncar e sonhar ao mesmo tempo.",
  "O inventor da Pringles está enterrado dentro de uma lata de Pringles.",
  "A Dinamarca tem o dobro de porcos em relação a pessoas.",
  "Um caracol pode dormir por até 3 anos.",
  "As vacas têm melhores amigos e ficam estressadas quando separadas.",
  "A Finlândia tem mais saunas do que carros.",
  "O Oceano Pacífico é maior que todos os continentes juntos.",
  "O coração de uma baleia-azul é do tamanho de um carro pequeno.",
  "As formigas nunca dormem.",
  "O som não se propaga no espaço.",
  "A Antártida é o maior deserto do mundo (deserto frio).",
  "Um fóton leva 8 minutos para ir do Sol à Terra, mas 100.000 anos para sair do núcleo do Sol.",
  "Os bebês nascem com cerca de 300 ossos, adultos têm 206.",
  "A galáxia de Andrômeda está vindo em nossa direção a 400.000 km/h.",
  "O comprimento dos seus braços abertos é aproximadamente sua altura.",
  "Plutão não completou uma órbita inteira desde que foi descoberto em 1930.",
  "O Monte Olimpo em Marte tem quase 3x a altura do Everest.",
  "Cleopatra viveu mais perto da invenção do iPhone do que da construção da Grande Pirâmide.",
  "A velocidade da luz é de aproximadamente 300.000 km por segundo.",
  "O corpo humano brilha no escuro, mas a luz é 1.000 vezes mais fraca do que nossos olhos detectam.",
  "O estômago produz um novo revestimento a cada 3 dias para não se autodigerir.",
  "Os elefantes são os únicos animais que não podem pular.",
  "A NASA enviou animais ao espaço antes de humanos: moscas de fruta em 1947.",
  "O maior organismo vivo é um fungo em Oregon com 9,6 km².",
  "Cada segundo, o Sol converte 4 milhões de toneladas de matéria em energia.",
  "A palavra 'astronauta' vem do grego e significa 'navegante das estrelas'.",
  "Se a Terra fosse do tamanho de uma bola de basquete, a Lua seria uma bola de tênis a 7 metros.",
  "Os vikings usavam crânios como canecas? NÃO, isso é um mito! Usavam chifres.",
  "O primeiro computador pesava 27 toneladas e ocupava uma sala inteira.",
  "O café é a segunda commodity mais negociada do mundo, depois do petróleo.",
  "Os olhos são do mesmo tamanho desde o nascimento, mas o nariz e as orelhas nunca param de crescer.",
  "A Estação Espacial Internacional viaja a 27.600 km/h.",
  "O Monte Roraima, na tríplice fronteira Brasil-Venezuela-Guiana, inspirou o filme UP.",
  "O Brasil tem a maior biodiversidade do planeta.",
  "A areia do deserto do Saara já chegou na Amazônia carregada pelo vento.",
  "O Rio Amazonas despeja no oceano 1/5 de toda a água doce do planeta.",
  "Santos Dumont deixou seus projetos em domínio público para que todos pudessem voar.",
  "A cidade de São Paulo tem mais helicópteros do que qualquer outra cidade do mundo.",
  "O jogo de futebol mais assistido da história foi a final da Copa de 2014.",
  "A caatinga é um bioma exclusivo do Brasil.",
  "Existem mais de 7.000 idiomas falados no mundo atualmente.",
  "O número Pi tem infinitas casas decimais e nunca se repete.",
  "Um ano em Mercúrio dura apenas 88 dias terrestres.",
  "As impressões digitais dos coalas são quase idênticas às dos humanos.",
  "O ouro é tão maleável que 1 grama pode ser esticado em um fio de 3 km.",
  "O Brasil foi o primeiro país a proibir a pena de morte para crimes comuns (1891).",
  "A primeira foto da história levou 8 horas de exposição para ser tirada.",
  "Os corvos são tão inteligentes que conseguem usar ferramentas.",
  "A Grande Barreira de Corais é a maior estrutura feita por seres vivos.",
  "Existem mais formas possíveis de um jogo de xadrez do que átomos no universo observável.",
  "O ar que respiramos é 78% nitrogênio e apenas 21% oxigênio.",
  "As estrelas que vemos no céu podem já ter morrido há milhões de anos.",
  "O ser humano compartilha 50% do DNA com uma banana.",
  "O recorde de maior tempo acordado é de 11 dias (264 horas).",
  "A eletricidade viaja à velocidade da luz: 300.000 km/s.",
  "Um beija-flor bate as asas até 80 vezes por segundo.",
  "O Rio Nilo disputa com o Amazonas o título de rio mais longo do mundo.",
  "As girafas dormem apenas 30 minutos por dia, em intervalos de 5 minutos.",
  "O primeiro emoji foi criado no Japão em 1999.",
  "A cada segundo, nascem cerca de 4 bebês no mundo.",
  "Um trovão só é ouvido a até 24 km de distância.",
  "A maior flor do mundo, a Rafflesia, cheira a carne podre.",
  "O vidro leva 1 milhão de anos para se decompor na natureza.",
  "Os astronautas crescem até 5 cm no espaço por causa da falta de gravidade.",
  "O primeiro vídeo do YouTube foi enviado em 23 de abril de 2005 e se chama 'Me at the zoo'.",
  "O peso de todas as formigas da Terra é maior que o peso de todos os humanos.",
  "As baleias cantam e suas canções podem viajar por milhares de quilômetros no oceano.",
  "Uma pessoa pisca cerca de 28.000 vezes por dia.",
  "O universo tem aproximadamente 13,8 bilhões de anos.",
];

export default function PerfilExpress() {
  const prefsSalvas = getPrefs();
  const [fase, setFase] = useState("menu");
  const [temasSelecionados, setTemasSelecionados] = useState(new Set());
  const [cartasJogadas, setCartasJogadas] = useState([]);
  const [cartaAtual, setCartaAtual] = useState(null);
  const [palpite, setPalpite] = useState("");
  const [pontos, setPontos] = useState(0);
  const [rodada, setRodada] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [shake, setShake] = useState(false);
  const [curiosidade, setCuriosidade] = useState("");
  const [mostrarCuriosidade, setMostrarCuriosidade] = useState(false);
  const [respostaRevelada, setRespostaRevelada] = useState(false);
  const [dicaIndex, setDicaIndex] = useState(0);
  // Preferências: "todas" = mostra todas dicas, "progressivo" = uma por vez
  const [modoDicas, setModoDicas] = useState(prefsSalvas.modoDicas || "todas");
  const [mostrarConfig, setMostrarConfig] = useState(false);

  const salvarPreferencia = (key, value) => {
    const prefs = getPrefs();
    prefs[key] = value;
    savePrefs(prefs);
  };

  // Cartas filtradas por temas selecionados
  const cartasFiltradas = useMemo(() => {
    if (temasSelecionados.size === 0) return CARTAS;
    return CARTAS.filter(c => temasSelecionados.has(c.tema));
  }, [temasSelecionados]);

  // Contagem de cartas por tema
  const contagemPorTema = useMemo(() => {
    const cont = {};
    CARTAS.forEach(c => { cont[c.tema] = (cont[c.tema] || 0) + 1; });
    return cont;
  }, []);

  const toggleTema = (tema) => {
    setTemasSelecionados(prev => {
      const next = new Set(prev);
      if (next.has(tema)) next.delete(tema);
      else next.add(tema);
      return next;
    });
  };

  const selecionarTodos = () => setTemasSelecionados(new Set());
  const limparTodos = () => setTemasSelecionados(new Set(TEMAS));

  const sortearCuriosidade = () => {
    setCuriosidade(CURIOSIDADES[Math.floor(Math.random() * CURIOSIDADES.length)]);
    setMostrarCuriosidade(true);
  };

  const sortearCarta = useCallback(() => {
    const disponiveis = cartasFiltradas.filter((_, i) => !cartasJogadas.includes(i));
    if (disponiveis.length === 0) { setFase("fim"); return; }
    const escolha = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    const idx = cartasFiltradas.indexOf(escolha);
    setCartasJogadas(p => [...p, idx]);
    setCartaAtual(escolha);
    setPalpite("");
    setDicaIndex(0);
    setRodada(p => p + 1);
    setMostrarCuriosidade(false);
    setRespostaRevelada(false);
    setFase("jogando");
  }, [cartasJogadas, cartasFiltradas]);

  const proximaDica = () => {
    if (dicaIndex < cartaAtual.dicas.length - 1) setDicaIndex(p => p + 1);
  };

  const verificarPalpite = () => {
    const n = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").trim();
    if (n(palpite) === n(cartaAtual.resposta)) {
      const pts = modoDicas === "progressivo"
        ? Math.max(cartaAtual.dicas.length - dicaIndex, 1)
        : 10;
      setPontos(p => p + pts);
      setHistorico(p => [...p, { carta: cartaAtual.resposta, cat: cartaAtual.categoria, pontos: pts, acertou: true }]);
      sortearCuriosidade();
      setFase("acertou");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setPalpite("");
  };

  const revelarResposta = () => {
    setRespostaRevelada(true);
  };

  const pularCarta = () => {
    setHistorico(p => [...p, { carta: cartaAtual.resposta, cat: cartaAtual.categoria, pontos: 0, acertou: false, pulou: true }]);
    sortearCarta();
  };

  const reiniciar = () => {
    setFase("menu"); setCartasJogadas([]); setCartaAtual(null);
    setPontos(0); setRodada(0); setHistorico([]);
    setMostrarCuriosidade(false); setRespostaRevelada(false);
  };

  const cor = cartaAtual ? CORES_CATEGORIA[cartaAtual.categoria] || CORES_CATEGORIA["Coisa"] : CORES_CATEGORIA["Coisa"];
  const restantes = cartasFiltradas.length - cartasJogadas.length;

  const s = {
    page: { minHeight: "100dvh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 12px", fontFamily: "'Segoe UI', system-ui, sans-serif" },
    card: { width: "100%", maxWidth: 520 },
    badge: (c) => ({ display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: c.badge, color: c.badgeText, whiteSpace: "nowrap" }),
    btn: (bg, clr = "#fff") => ({ padding: "14px 28px", fontSize: 16, fontWeight: 700, color: clr, background: bg, border: "none", borderRadius: 14, cursor: "pointer", transition: "transform 0.15s", minHeight: 48 }),
    btnSec: { padding: "14px 20px", fontSize: 15, fontWeight: 600, color: "#94a3b8", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, cursor: "pointer", minHeight: 48 },
  };

  const curiosidadeBox = mostrarCuriosidade && curiosidade ? (
    <div style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(139,92,246,0.1))", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "12px 16px", margin: "14px 0", textAlign: "left" }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1 }}>💡 Você sabia?</span>
      <p style={{ color: "#e2e8f0", fontSize: 13, margin: "6px 0 0", lineHeight: 1.5 }}>{curiosidade}</p>
    </div>
  ) : null;

  // ---- MENU ----
  if (fase === "menu") {
    const totalFiltrado = cartasFiltradas.length;
    const nenhumSelecionado = temasSelecionados.size === 0;

    return (
      <div style={s.page}>
        <div style={{ ...s.card, textAlign: "center" }}>
          <div style={{ fontSize: "clamp(40px, 12vw, 56px)", marginBottom: 4 }}>🎯</div>
          <h1 style={{ fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 900, background: "linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 6px", letterSpacing: -1 }}>PERFIL EXPRESS</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>
            Leia as dicas e descubra a resposta!
          </p>

          {/* Filtro de temas */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 14px", marginBottom: 20, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700 }}>🏷️ Escolha os temas:</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={selecionarTodos} style={{ padding: "4px 10px", fontSize: 11, fontWeight: 600, color: nenhumSelecionado ? "#f59e0b" : "#64748b", background: nenhumSelecionado ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${nenhumSelecionado ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 8, cursor: "pointer" }}>
                  Todos
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TEMAS.map(tema => {
                const ativo = nenhumSelecionado || temasSelecionados.has(tema);
                const corTema = CORES_TEMA[tema] || "#94a3b8";
                const emoji = EMOJI_TEMA[tema] || "🎯";
                const qtd = contagemPorTema[tema] || 0;

                return (
                  <button
                    key={tema}
                    onClick={() => toggleTema(tema)}
                    style={{
                      padding: "8px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: ativo ? corTema : "#475569",
                      background: ativo ? `${corTema}15` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${ativo ? `${corTema}40` : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 10,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      opacity: ativo ? 1 : 0.5,
                      minHeight: 38,
                    }}
                  >
                    {emoji} {tema} <span style={{ fontSize: 10, opacity: 0.7 }}>({qtd})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferência de modo de dicas */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
            <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8 }}>⚙️ Modo de jogo:</span>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { id: "todas", label: "📖 Todas as dicas", desc: "Veja todas de uma vez" },
                { id: "progressivo", label: "💡 Uma por vez", desc: "Revele dica por dica" },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => { setModoDicas(m.id); salvarPreferencia("modoDicas", m.id); }}
                  style={{
                    flex: 1, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                    background: modoDicas === m.id ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${modoDicas === m.id ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.06)"}`,
                    textAlign: "center",
                  }}
                >
                  <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: modoDicas === m.id ? "#f59e0b" : "#94a3b8" }}>{m.label}</span>
                  <span style={{ display: "block", fontSize: 10, color: "#64748b", marginTop: 2 }}>{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 20px" }}>
            🃏 <strong style={{ color: "#e2e8f0" }}>{totalFiltrado}</strong> cartas {nenhumSelecionado ? "disponíveis" : "selecionadas"}
          </p>

          <button
            onClick={sortearCarta}
            disabled={totalFiltrado === 0}
            style={{
              ...s.btn("linear-gradient(135deg, #f59e0b, #ef4444)"),
              opacity: totalFiltrado === 0 ? 0.4 : 1,
              cursor: totalFiltrado === 0 ? "default" : "pointer",
            }}
          >
            ▶ JOGAR
          </button>
        </div>
      </div>
    );
  }

  // ---- FIM ----
  if (fase === "fim") {
    const acertos = historico.filter(h => h.acertou).length;
    const taxa = historico.length > 0 ? Math.round((acertos / historico.length) * 100) : 0;
    const emoji = taxa >= 80 ? "🏆" : taxa >= 50 ? "🎉" : "💪";

    return (
      <div style={s.page}>
        <div style={{ ...s.card, textAlign: "center" }}>
          <div style={{ fontSize: "clamp(40px, 12vw, 56px)", marginBottom: 4 }}>{emoji}</div>
          <h2 style={{ fontSize: "clamp(22px, 6vw, 30px)", fontWeight: 800, color: "#f59e0b", margin: "0 0 4px" }}>FIM DE JOGO!</h2>
          <p style={{ fontSize: "clamp(32px, 10vw, 44px)", fontWeight: 900, color: "#fff", margin: "0 0 2px" }}>{pontos} pts</p>
          <p style={{ color: "#94a3b8", margin: "0 0 16px", fontSize: 14 }}>{acertos} de {historico.length} acertos ({taxa}%)</p>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 16, marginBottom: 20, textAlign: "left", maxHeight: 300, overflowY: "auto" }}>
            {historico.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < historico.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>
                  {h.acertou ? "✅" : h.pulou ? "⏭️" : "❌"} {h.carta}
                  <span style={{ fontSize: 10, marginLeft: 6, color: CORES_CATEGORIA[h.cat]?.bg || "#94a3b8" }}>{h.cat}</span>
                </span>
                <span style={{ color: "#94a3b8", fontSize: 12, whiteSpace: "nowrap" }}>
                  <strong style={{ color: h.acertou ? "#10b981" : "#ef4444" }}>{h.pontos} pts</strong>
                </span>
              </div>
            ))}
          </div>
          <button onClick={reiniciar} style={s.btn("linear-gradient(135deg, #8b5cf6, #6366f1)")}>🔄 JOGAR NOVAMENTE</button>
        </div>
      </div>
    );
  }

  // ---- ACERTOU / ERROU ----
  if (fase === "acertou" || fase === "errou") {
    const ok = fase === "acertou";
    return (
      <div style={s.page}>
        <div style={{ ...s.card, textAlign: "center" }}>
          <div style={{ fontSize: "clamp(40px, 12vw, 56px)", marginBottom: 4 }}>{ok ? "🎉" : "😞"}</div>
          <h2 style={{ fontSize: "clamp(20px, 5.5vw, 26px)", fontWeight: 800, color: ok ? "#10b981" : "#ef4444", margin: "0 0 6px" }}>
            {ok ? "VOCÊ ACERTOU!" : "NÃO FOI DESSA VEZ..."}
          </h2>
          <p style={{ fontSize: "clamp(24px, 7vw, 34px)", fontWeight: 900, color: "#fff", margin: "0 0 8px", wordBreak: "break-word" }}>{cartaAtual.resposta}</p>
          <span style={s.badge(cor)}>{cartaAtual.categoria}</span>
          {ok && (
            <p style={{ color: "#94a3b8", marginTop: 14, fontSize: 14 }}>
              <strong style={{ color: "#f59e0b" }}>+10 pts</strong>
            </p>
          )}
          {!ok && (
            <div style={{ marginTop: 14, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 12, textAlign: "left" }}>
              <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>TODAS AS DICAS:</p>
              {cartaAtual.dicas.map((d, i) => (
                <p key={i} style={{ color: "#cbd5e1", fontSize: 12, margin: "3px 0", lineHeight: 1.4 }}>
                  <span style={{ color: cor.bg, fontWeight: 700 }}>{i + 1}.</span> {d}
                </p>
              ))}
            </div>
          )}
          {curiosidadeBox}
          <p style={{ color: "#64748b", marginTop: 6, fontSize: 13 }}>
            Total: <strong style={{ color: "#fff" }}>{pontos} pts</strong> · Restam {restantes} cartas
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {restantes > 0 && (
              <button onClick={sortearCarta} style={s.btn("linear-gradient(135deg, #f59e0b, #ef4444)")}>
                PRÓXIMA CARTA →
              </button>
            )}
            <button onClick={() => setFase("fim")} style={s.btnSec}>
              {restantes > 0 ? "Encerrar" : "Ver resultado"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- JOGANDO ----
  const isProgressivo = modoDicas === "progressivo";
  const ptspossiveis = isProgressivo ? Math.max(cartaAtual.dicas.length - dicaIndex, 1) : 10;
  const prog = isProgressivo ? ((dicaIndex + 1) / cartaAtual.dicas.length) * 100 : 100;
  const temaCor = CORES_TEMA[cartaAtual.tema] || "#94a3b8";

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", padding: "12px 10px", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: 15 }}>⭐ {pontos}</span>
            <span style={{ color: "#475569", fontSize: 12 }}>Carta {rodada}/{cartasFiltradas.length}</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 10, fontWeight: 700, background: `${temaCor}20`, color: temaCor, border: `1px solid ${temaCor}40`, whiteSpace: "nowrap", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis" }}>
              {EMOJI_TEMA[cartaAtual.tema] || "🎯"} {cartaAtual.tema}
            </span>
            <span style={s.badge(cor)}>{cartaAtual.categoria}</span>
          </div>
        </div>

        {/* Barra de progresso (só no modo progressivo) */}
        {isProgressivo && (
          <>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 5, marginBottom: 6, overflow: "hidden" }}>
              <div style={{ width: `${prog}%`, height: "100%", background: cor.bg, borderRadius: 8, transition: "width 0.4s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>DICA {dicaIndex + 1} DE {cartaAtual.dicas.length}</span>
              <span style={{ color: cor.bg, fontSize: 12, fontWeight: 700 }}>+{ptspossiveis} pts possíveis</span>
            </div>
          </>
        )}

        {/* Resposta revelada (com botão esconder) */}
        {respostaRevelada && (
          <div
            onClick={() => setRespostaRevelada(false)}
            style={{
              background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15))",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 12, padding: "12px 16px", marginBottom: 12, textAlign: "center",
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: 1 }}>RESPOSTA</span>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "4px 0 0" }}>{cartaAtual.resposta}</p>
            <span style={{ fontSize: 10, color: "#94a3b8", marginTop: 4, display: "block" }}>toque para esconder</span>
          </div>
        )}

        {/* Dicas */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12, flex: 1, overflowY: "auto", paddingRight: 4, minHeight: 0 }}>
          {cartaAtual.dicas.map((dica, i) => {
            const revelada = isProgressivo ? i <= dicaIndex : true;
            return (
              <div key={i} style={{
                background: revelada ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.015)",
                border: `1px solid ${revelada ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"}`,
                borderRadius: 10, padding: "8px 10px", display: "flex", gap: 8, alignItems: "flex-start",
                transition: "all 0.3s"
              }}>
                <span style={{
                  background: revelada ? `${cor.bg}22` : "rgba(255,255,255,0.03)",
                  color: revelada ? cor.bg : "#334155",
                  fontWeight: 800, fontSize: 11, minWidth: 24, height: 24,
                  display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{
                  color: revelada ? "#e2e8f0" : "#1e293b",
                  fontSize: 13, lineHeight: 1.5,
                  userSelect: revelada ? "auto" : "none"
                }}>
                  {revelada ? dica : "• • • • • • • •"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input e botões */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 10px", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            <input
              type="text"
              value={palpite}
              onChange={e => setPalpite(e.target.value)}
              onKeyDown={e => e.key === "Enter" && palpite.trim() && verificarPalpite()}
              placeholder="Digite seu palpite..."
              style={{
                flex: 1, padding: "12px 12px", fontSize: 16,
                background: "rgba(255,255,255,0.06)",
                border: `2px solid ${shake ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 10, color: "#fff", outline: "none",
                transition: "border-color 0.3s",
                animation: shake ? "shake 0.5s ease" : "none",
                minWidth: 0,
              }}
            />
            <button
              onClick={verificarPalpite}
              disabled={!palpite.trim()}
              style={{
                padding: "12px 16px", fontWeight: 700, fontSize: 14, color: "#fff",
                background: palpite.trim() ? cor.bg : "#334155",
                border: "none", borderRadius: 10,
                cursor: palpite.trim() ? "pointer" : "default",
                opacity: palpite.trim() ? 1 : 0.5,
                minHeight: 44, whiteSpace: "nowrap",
              }}
            >
              CHUTAR
            </button>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {/* Botão de próxima dica (modo progressivo) */}
            {isProgressivo && (
              <button
                onClick={proximaDica}
                disabled={dicaIndex >= cartaAtual.dicas.length - 1}
                style={{
                  flex: "1 1 auto", padding: "10px 12px", fontWeight: 600, fontSize: 13,
                  color: dicaIndex >= cartaAtual.dicas.length - 1 ? "#475569" : "#e2e8f0",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10, minHeight: 44,
                  cursor: dicaIndex >= cartaAtual.dicas.length - 1 ? "default" : "pointer"
                }}
              >
                {dicaIndex >= cartaAtual.dicas.length - 1 ? "Sem mais dicas" : "💡 DICA"}
              </button>
            )}
            <button
              onClick={() => setRespostaRevelada(v => !v)}
              style={{
                flex: "1 1 auto",
                padding: "10px 12px", fontWeight: 600, fontSize: 13,
                color: respostaRevelada ? "#10b981" : "#ef4444",
                background: respostaRevelada ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
                border: `1px solid ${respostaRevelada ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                borderRadius: 10, cursor: "pointer", minHeight: 44,
              }}
            >
              {respostaRevelada ? "🙈 ESCONDER" : "👁️ REVELAR"}
            </button>
            <button
              onClick={pularCarta}
              style={{
                flex: "1 1 auto",
                padding: "10px 12px", fontWeight: 600, fontSize: 13,
                color: "#f59e0b", background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: 10, cursor: "pointer", minHeight: 44,
              }}
            >
              ⏭️ PULAR
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
        input::placeholder { color: #475569; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        button:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}
