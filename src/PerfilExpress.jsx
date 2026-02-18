import { useState, useCallback, useMemo } from "react";
import { CARTAS, TEMAS } from "./data";

// =====================================================
// 🎮 PERFIL EXPRESS - JOGO DE PERGUNTAS E DICAS
// =====================================================
// PALETA: Vibrante/Trivia Crack - alegre e divertida
// =====================================================

// Paletas de cores - Light e Dark
const PALETA_LIGHT = {
  // Fundos
  bgPrimary: "#FEFDF8",      // Branco cremoso
  bgSecondary: "#FFF8E7",    // Amarelo suave
  bgCard: "#FFFFFF",         // Branco puro
  bgInput: "#FFF8E7",        // Fundo do input

  // Cores principais vibrantes
  verde: "#1FC868",          // Verde vibrante (acertos)
  amarelo: "#F8DE41",        // Amarelo dourado
  rosa: "#F452AF",           // Rosa quente
  roxo: "#8D44B6",           // Roxo vivo
  azul: "#4DABF7",           // Azul alegre
  laranja: "#FF8C42",        // Laranja coral
  vermelho: "#FF6B6B",       // Vermelho coral (erros)
  turquesa: "#20C997",       // Turquesa fresco

  // Texto
  textPrimary: "#2D3748",    // Cinza escuro quente
  textSecondary: "#718096",  // Cinza médio
  textLight: "#FFFFFF",      // Branco
  textDisabled: "#A0AEC0",   // Texto desabilitado
};

const PALETA_DARK = {
  // Fundos
  bgPrimary: "#1A1D23",      // Fundo escuro principal
  bgSecondary: "#252A33",    // Fundo escuro secundário
  bgCard: "#2D333D",         // Card escuro
  bgInput: "#363D4A",        // Fundo do input escuro

  // Cores principais vibrantes (mantém as mesmas)
  verde: "#2EE87A",          // Verde mais brilhante no dark
  amarelo: "#FFE55C",        // Amarelo mais brilhante
  rosa: "#FF69C0",           // Rosa mais brilhante
  roxo: "#A855F7",           // Roxo mais brilhante
  azul: "#60BFFF",           // Azul mais brilhante
  laranja: "#FF9F5A",        // Laranja mais brilhante
  vermelho: "#FF7B7B",       // Vermelho mais brilhante
  turquesa: "#34D9AD",       // Turquesa mais brilhante

  // Texto
  textPrimary: "#F1F5F9",    // Branco suave
  textSecondary: "#94A3B8",  // Cinza claro
  textLight: "#FFFFFF",      // Branco
  textDisabled: "#64748B",   // Texto desabilitado
};

const CORES_CATEGORIA = {
  Pessoa: { bg: PALETA_LIGHT.roxo, badge: "#F3E8FF", badgeText: "#6B21A8" },
  Lugar: { bg: PALETA_LIGHT.turquesa, badge: "#D1FAE5", badgeText: "#047857" },
  Coisa: { bg: PALETA_LIGHT.laranja, badge: "#FFF3E0", badgeText: "#C65D07" },
  Ano: { bg: PALETA_LIGHT.azul, badge: "#E0F2FE", badgeText: "#0369A1" },
};

const CORES_TEMA = {
  // Cores vibrantes e distintas para cada tema
  "Cultura Brasileira": "#1FC868",
  "Anime & Mangá": "#F452AF",
  "Anime & Manga": "#F452AF",
  "Games": "#8D44B6",
  "Esportes": "#4DABF7",
  "Esportes & Copa": "#FF8C42",
  "Ciência & Tech": "#20C997",
  "Ciência & Espaço": "#6C5CE7",
  "Astronomia": "#A55EEA",
  "Geografia": "#00B894",
  "Geografia Mundial": "#00CEC9",
  "História": "#FDCB6E",
  "História do Brasil": "#1FC868",
  "Música & Arte": "#FD79A8",
  "Música Brasileira": "#00B894",
  "Comida & Bebida": "#FF8C42",
  "Comida & Gastronomia": "#E17055",
  "Natureza & Animais": "#00B894",
  "Mundo Animal": "#55A3FF",
  "Materiais & Recursos": "#636E72",
  "Invenções & Objetos": "#0984E3",
  "Datas Comemorativas": "#FF6B6B",
  "Cultura Nerd": "#A55EEA",
  "Fofocas & Famosos": "#FD79A8",
  "Fofocas Internacionais": "#E84393",
  "Influencers & Pop": "#FF6B6B",
  "TV & Novelas": "#FDCB6E",
  "Filmes & Séries": "#FF6B6B",
  "Memes & Internet": "#00CEC9",
  "Tecnologia & Apps": "#0984E3",
  "Personalidades": "#A55EEA",
  "Geral": "#636E72",
};

const EMOJI_TEMA = {
  "Cultura Brasileira": "🇧🇷",
  "Anime & Mangá": "🎌",
  "Anime & Manga": "🎌",
  "Games": "🎮",
  "Esportes": "⚽",
  "Esportes & Copa": "🏆",
  "Ciência & Tech": "🔬",
  "Ciência & Espaço": "🚀",
  "Astronomia": "🌌",
  "Geografia": "🌍",
  "Geografia Mundial": "🗺️",
  "História": "📜",
  "História do Brasil": "🇧🇷",
  "Música & Arte": "🎵",
  "Música Brasileira": "🎤",
  "Comida & Bebida": "🍕",
  "Comida & Gastronomia": "🍽️",
  "Natureza & Animais": "🦁",
  "Mundo Animal": "🐾",
  "Materiais & Recursos": "💎",
  "Invenções & Objetos": "💡",
  "Datas Comemorativas": "🎄",
  "Cultura Nerd": "🤓",
  "Fofocas & Famosos": "🗣️",
  "Fofocas Internacionais": "🌟",
  "Influencers & Pop": "📱",
  "TV & Novelas": "📺",
  "Filmes & Séries": "🎬",
  "Memes & Internet": "😂",
  "Tecnologia & Apps": "💻",
  "Personalidades": "👤",
  "Geral": "🎲",
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
  const [temaVisual, setTemaVisual] = useState(prefsSalvas.temaVisual || "light");

  // Paleta dinâmica baseada no tema
  const PALETA = temaVisual === "dark" ? PALETA_DARK : PALETA_LIGHT;
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
    page: { minHeight: "100dvh", background: `linear-gradient(180deg, ${PALETA.bgPrimary} 0%, ${PALETA.bgSecondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(12px, 3vw, 16px)", fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif" },
    card: { width: "100%", maxWidth: 520 },
    badge: (c) => ({ display: "inline-block", padding: "clamp(4px, 1vw, 6px) clamp(10px, 2vw, 14px)", borderRadius: 24, fontSize: "clamp(10px, 2.5vw, 12px)", fontWeight: 800, background: c.badge, color: c.badgeText, whiteSpace: "nowrap", boxShadow: `0 2px 8px ${c.bg}33` }),
    btn: (bg, clr = "#fff") => ({ padding: "clamp(14px, 3.5vw, 18px) clamp(24px, 6vw, 32px)", fontSize: "clamp(15px, 4vw, 18px)", fontWeight: 800, color: clr, background: bg, border: "none", borderRadius: 16, cursor: "pointer", transition: "all 0.2s ease", minHeight: 50, width: "100%", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", textTransform: "uppercase", letterSpacing: "0.5px" }),
    btnSec: { padding: "clamp(12px, 3vw, 14px) clamp(16px, 4vw, 20px)", fontSize: "clamp(13px, 3vw, 15px)", fontWeight: 700, color: PALETA.textSecondary, background: PALETA.bgCard, border: `2px solid #E2E8F0`, borderRadius: 16, cursor: "pointer", minHeight: 48, width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  };

  const curiosidadeBox = mostrarCuriosidade && curiosidade ? (
    <div style={{ background: `linear-gradient(135deg, ${PALETA.amarelo}22, ${PALETA.laranja}22)`, border: `2px solid ${PALETA.amarelo}`, borderRadius: 16, padding: "clamp(12px, 3vw, 16px)", margin: "clamp(10px, 2.5vw, 14px) 0", textAlign: "left", boxShadow: `0 4px 12px ${PALETA.amarelo}33` }}>
      <span style={{ fontSize: "clamp(11px, 2.5vw, 12px)", fontWeight: 800, color: PALETA.laranja, textTransform: "uppercase", letterSpacing: 1 }}>💡 Você sabia?</span>
      <p style={{ color: PALETA.textPrimary, fontSize: "clamp(12px, 2.8vw, 13px)", margin: "6px 0 0", lineHeight: 1.5 }}>{curiosidade}</p>
    </div>
  ) : null;

  // ---- MENU ----
  if (fase === "menu") {
    const totalFiltrado = cartasFiltradas.length;
    const nenhumSelecionado = temasSelecionados.size === 0;

    return (
      <div style={s.page}>
        <div style={{ ...s.card, textAlign: "center" }}>
          <div style={{ fontSize: "clamp(48px, 14vw, 72px)", marginBottom: 8, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>🎯</div>
          <h1 style={{ fontSize: "clamp(32px, 10vw, 48px)", fontWeight: 900, background: `linear-gradient(135deg, ${PALETA.rosa}, ${PALETA.roxo}, ${PALETA.azul})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 8px", letterSpacing: -1, textShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>PERFIL EXPRESS</h1>
          <p style={{ color: PALETA.textSecondary, fontSize: "clamp(14px, 3.5vw, 16px)", lineHeight: 1.6, margin: "0 0 clamp(16px, 4vw, 20px)", fontWeight: 500 }}>
            Leia as dicas e descubra a resposta!
          </p>

          {/* Toggle Dark/Light */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(16px, 4vw, 20px)" }}>
            <button
              onClick={() => {
                const novoTema = temaVisual === "light" ? "dark" : "light";
                setTemaVisual(novoTema);
                salvarPreferencia("temaVisual", novoTema);
              }}
              style={{
                padding: "clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 28px)",
                fontSize: "clamp(13px, 3.2vw, 15px)",
                fontWeight: 700,
                color: PALETA.textPrimary,
                background: PALETA.bgCard,
                border: `2px solid ${PALETA.azul}`,
                borderRadius: 30,
                cursor: "pointer",
                minHeight: 44,
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                transition: "all 0.2s ease",
              }}
            >
              {temaVisual === "light" ? "🌙" : "☀️"} {temaVisual === "light" ? "Modo Escuro" : "Modo Claro"}
            </button>
          </div>

          {/* Filtro de temas */}
          <div style={{ background: PALETA.bgCard, border: "none", borderRadius: 20, padding: "clamp(16px, 4vw, 20px)", marginBottom: "clamp(16px, 4vw, 20px)", textAlign: "left", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(12px, 3vw, 16px)", gap: 8, flexWrap: "wrap" }}>
              <span style={{ color: PALETA.textPrimary, fontSize: "clamp(13px, 3.2vw, 15px)", fontWeight: 700 }}>🏷️ Escolha os temas:</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={selecionarTodos} style={{ padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)", fontSize: "clamp(11px, 2.8vw, 12px)", fontWeight: 700, color: nenhumSelecionado ? PALETA.textLight : PALETA.textSecondary, background: nenhumSelecionado ? PALETA.verde : PALETA.bgSecondary, border: "none", borderRadius: 20, cursor: "pointer", minHeight: 36, boxShadow: nenhumSelecionado ? `0 2px 8px ${PALETA.verde}44` : "none", transition: "all 0.2s" }}>
                  ✨ Todos
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 140px), 1fr))", gap: "clamp(8px, 2vw, 10px)" }}>
              {TEMAS.map(tema => {
                const ativo = nenhumSelecionado || temasSelecionados.has(tema);
                const corTema = CORES_TEMA[tema] || PALETA.textSecondary;
                const emoji = EMOJI_TEMA[tema] || "🎯";
                const qtd = contagemPorTema[tema] || 0;

                return (
                  <button
                    key={tema}
                    onClick={() => toggleTema(tema)}
                    style={{
                      padding: "clamp(8px, 2vw, 10px) clamp(10px, 2.5vw, 14px)",
                      fontSize: "clamp(11px, 2.8vw, 13px)",
                      fontWeight: 700,
                      color: ativo ? PALETA.textLight : PALETA.textSecondary,
                      background: ativo ? corTema : PALETA.bgSecondary,
                      border: "none",
                      borderRadius: 12,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      opacity: ativo ? 1 : 0.7,
                      minHeight: 44,
                      textAlign: "center",
                      boxShadow: ativo ? `0 3px 10px ${corTema}44` : "0 1px 3px rgba(0,0,0,0.05)",
                      transform: ativo ? "scale(1)" : "scale(0.98)",
                    }}
                  >
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                      {emoji} {tema} <span style={{ fontSize: "clamp(9px, 2.2vw, 10px)", opacity: 0.85 }}>({qtd})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p style={{ color: PALETA.textSecondary, fontSize: "clamp(13px, 3.2vw, 15px)", margin: "0 0 clamp(12px, 3vw, 16px)", fontWeight: 600 }}>
            🃏 <strong style={{ color: PALETA.textPrimary }}>{totalFiltrado}</strong> cartas {nenhumSelecionado ? "disponíveis" : "selecionadas"}
          </p>

          {/* Indicador do modo atual */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px, 2vw, 12px)",
            marginBottom: "clamp(16px, 4vw, 20px)",
            padding: "clamp(10px, 2.5vw, 14px) clamp(16px, 4vw, 20px)",
            background: `${PALETA.amarelo}22`,
            border: `2px solid ${PALETA.amarelo}`,
            borderRadius: 16,
          }}>
            <span style={{ color: PALETA.textPrimary, fontSize: "clamp(12px, 3vw, 14px)", fontWeight: 700 }}>
              {modoDicas === "todas" ? "📖 Todas as dicas" : "💡 Uma por vez"}
            </span>
            <button
              onClick={() => {
                const novo = modoDicas === "todas" ? "progressivo" : "todas";
                setModoDicas(novo);
                salvarPreferencia("modoDicas", novo);
              }}
              style={{
                padding: "6px 14px",
                fontSize: "clamp(11px, 2.5vw, 12px)",
                fontWeight: 700,
                color: PALETA.textSecondary,
                background: PALETA.bgSecondary,
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
                minHeight: 32,
              }}
            >
              🔄 Trocar
            </button>
          </div>

          <button
            onClick={sortearCarta}
            disabled={totalFiltrado === 0}
            style={{
              ...s.btn(`linear-gradient(135deg, ${PALETA.verde}, ${PALETA.turquesa})`),
              opacity: totalFiltrado === 0 ? 0.4 : 1,
              cursor: totalFiltrado === 0 ? "default" : "pointer",
            }}
          >
            🎮 JOGAR
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
        <div style={{ ...s.card, textAlign: "center", background: PALETA.bgCard, borderRadius: 24, padding: "clamp(24px, 6vw, 32px)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
          <div style={{ fontSize: "clamp(56px, 16vw, 80px)", marginBottom: 8, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}>{emoji}</div>
          <h2 style={{ fontSize: "clamp(26px, 7vw, 36px)", fontWeight: 900, color: PALETA.laranja, margin: "0 0 8px" }}>FIM DE JOGO!</h2>
          <p style={{ fontSize: "clamp(40px, 12vw, 56px)", fontWeight: 900, color: PALETA.textPrimary, margin: "0 0 4px" }}>{pontos} pts</p>
          <p style={{ color: PALETA.textSecondary, margin: "0 0 clamp(16px, 4vw, 20px)", fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 600 }}>{acertos} de {historico.length} acertos ({taxa}%)</p>
          <div style={{ background: PALETA.bgSecondary, borderRadius: 16, padding: "clamp(12px, 3vw, 16px)", marginBottom: "clamp(16px, 4vw, 20px)", textAlign: "left", maxHeight: "clamp(250px, 40vh, 300px)", overflowY: "auto" }}>
            {historico.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "clamp(8px, 2vw, 12px) 0", borderBottom: i < historico.length - 1 ? `1px solid ${PALETA.bgPrimary}` : "none", gap: 8 }}>
                <span style={{ color: PALETA.textPrimary, fontWeight: 600, fontSize: "clamp(13px, 3.2vw, 15px)", wordBreak: "break-word", flex: 1 }}>
                  {h.acertou ? "✅" : h.pulou ? "⏭️" : "❌"} {h.carta}
                  <span style={{ fontSize: "clamp(10px, 2.2vw, 11px)", marginLeft: 8, color: CORES_CATEGORIA[h.cat]?.bg || PALETA.textSecondary, fontWeight: 700, display: "inline-block" }}>{h.cat}</span>
                </span>
                <span style={{ color: PALETA.textSecondary, fontSize: "clamp(12px, 2.8vw, 14px)", whiteSpace: "nowrap", flexShrink: 0 }}>
                  <strong style={{ color: h.acertou ? PALETA.verde : PALETA.vermelho }}>{h.pontos} pts</strong>
                </span>
              </div>
            ))}
          </div>
          <button onClick={reiniciar} style={s.btn(`linear-gradient(135deg, ${PALETA.roxo}, ${PALETA.rosa})`)}>🔄 JOGAR NOVAMENTE</button>
        </div>
      </div>
    );
  }

  // ---- ACERTOU / ERROU ----
  if (fase === "acertou" || fase === "errou") {
    const ok = fase === "acertou";
    return (
      <div style={s.page}>
        <div style={{ ...s.card, textAlign: "center", background: PALETA.bgCard, borderRadius: 24, padding: "clamp(24px, 6vw, 32px)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
          <div style={{ fontSize: "clamp(56px, 16vw, 80px)", marginBottom: 8, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}>{ok ? "🎉" : "😢"}</div>
          <h2 style={{ fontSize: "clamp(22px, 6vw, 30px)", fontWeight: 900, color: ok ? PALETA.verde : PALETA.vermelho, margin: "0 0 8px" }}>
            {ok ? "VOCÊ ACERTOU!" : "NÃO FOI DESSA VEZ..."}
          </h2>
          <p style={{ fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 900, color: PALETA.textPrimary, margin: "0 0 12px", wordBreak: "break-word" }}>{cartaAtual.resposta}</p>
          <span style={s.badge(cor)}>{cartaAtual.categoria}</span>
          {ok && (
            <p style={{ color: PALETA.textSecondary, marginTop: "clamp(12px, 3vw, 16px)", fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 700 }}>
              <strong style={{ color: PALETA.verde, fontSize: "clamp(18px, 4.5vw, 22px)" }}>+10 pts</strong>
            </p>
          )}
          {!ok && (
            <div style={{ marginTop: "clamp(12px, 3vw, 16px)", background: PALETA.bgSecondary, borderRadius: 14, padding: "clamp(12px, 3vw, 16px)", textAlign: "left" }}>
              <p style={{ color: PALETA.textSecondary, fontSize: "clamp(12px, 2.8vw, 13px)", fontWeight: 700, marginBottom: 8 }}>TODAS AS DICAS:</p>
              {cartaAtual.dicas.map((d, i) => (
                <p key={i} style={{ color: PALETA.textPrimary, fontSize: "clamp(12px, 2.8vw, 13px)", margin: "4px 0", lineHeight: 1.5 }}>
                  <span style={{ color: cor.bg, fontWeight: 800 }}>{i + 1}.</span> {d}
                </p>
              ))}
            </div>
          )}
          {curiosidadeBox}
          <p style={{ color: PALETA.textSecondary, marginTop: 10, fontSize: "clamp(13px, 3vw, 15px)", fontWeight: 600 }}>
            Total: <strong style={{ color: PALETA.textPrimary }}>{pontos} pts</strong> · Restam {restantes} cartas
          </p>
          <div style={{ marginTop: "clamp(20px, 5vw, 24px)", display: "flex", gap: "clamp(10px, 2.5vw, 14px)", justifyContent: "center", flexDirection: "column" }}>
            {restantes > 0 && (
              <button onClick={sortearCarta} style={s.btn(`linear-gradient(135deg, ${PALETA.verde}, ${PALETA.turquesa})`)}>
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
  const temaCor = CORES_TEMA[cartaAtual.tema] || PALETA.textSecondary;

  return (
    <div style={{ minHeight: "100dvh", background: `linear-gradient(180deg, ${PALETA.bgPrimary} 0%, ${PALETA.bgSecondary} 100%)`, padding: "clamp(12px, 3vw, 16px)", fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(8px, 2vw, 12px)", flexWrap: "wrap", gap: "clamp(6px, 1.5vw, 8px)", background: PALETA.bgCard, padding: "clamp(10px, 2.5vw, 14px)", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 12px)" }}>
            <span style={{ color: PALETA.laranja, fontWeight: 800, fontSize: "clamp(15px, 3.5vw, 18px)" }}>⭐ {pontos}</span>
            <span style={{ color: PALETA.textSecondary, fontSize: "clamp(12px, 2.8vw, 14px)", fontWeight: 600 }}>Carta {rodada}/{cartasFiltradas.length}</span>
          </div>
          <div style={{ display: "flex", gap: "clamp(6px, 1.5vw, 8px)", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ padding: "clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)", borderRadius: 20, fontSize: "clamp(10px, 2.2vw, 11px)", fontWeight: 700, background: temaCor, color: PALETA.textLight, whiteSpace: "nowrap", maxWidth: "min(140px, 40vw)", overflow: "hidden", textOverflow: "ellipsis", boxShadow: `0 2px 6px ${temaCor}44` }}>
              {EMOJI_TEMA[cartaAtual.tema] || "🎯"} {cartaAtual.tema}
            </span>
            <span style={s.badge(cor)}>{cartaAtual.categoria}</span>
            <button
              onClick={() => setMostrarConfig(true)}
              style={{
                width: 44, height: 44, minWidth: 44, minHeight: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: PALETA.bgSecondary,
                border: "none",
                borderRadius: 12, cursor: "pointer",
                fontSize: "clamp(16px, 4vw, 18px)",
                color: PALETA.textSecondary,
                transition: "all 0.2s",
                padding: 0,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
              title="Configurações"
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* Barra de progresso (só no modo progressivo) */}
        {isProgressivo && (
          <>
            <div style={{ background: PALETA.bgCard, borderRadius: 10, height: "clamp(8px, 2vw, 10px)", marginBottom: "clamp(6px, 1.5vw, 8px)", overflow: "hidden", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ width: `${prog}%`, height: "100%", background: `linear-gradient(90deg, ${PALETA.verde}, ${PALETA.turquesa})`, borderRadius: 10, transition: "width 0.4s ease-out" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "clamp(10px, 2.5vw, 14px)", gap: 8, flexWrap: "wrap" }}>
              <span style={{ color: PALETA.textSecondary, fontSize: "clamp(12px, 2.8vw, 13px)", fontWeight: 700 }}>DICA {dicaIndex + 1} DE {cartaAtual.dicas.length}</span>
              <span style={{ color: PALETA.verde, fontSize: "clamp(12px, 2.8vw, 13px)", fontWeight: 800, whiteSpace: "nowrap" }}>+{ptspossiveis} pts possíveis</span>
            </div>
          </>
        )}

        {/* Resposta revelada (com botão esconder) */}
        {respostaRevelada && (
          <div
            onClick={() => setRespostaRevelada(false)}
            style={{
              background: `linear-gradient(135deg, ${PALETA.vermelho}22, ${PALETA.laranja}22)`,
              border: `2px solid ${PALETA.vermelho}`,
              borderRadius: 16, padding: "clamp(12px, 3vw, 16px)", marginBottom: "clamp(12px, 3vw, 16px)", textAlign: "center",
              cursor: "pointer",
              boxShadow: `0 4px 12px ${PALETA.vermelho}33`,
            }}
          >
            <span style={{ fontSize: "clamp(11px, 2.8vw, 12px)", fontWeight: 800, color: PALETA.vermelho, textTransform: "uppercase", letterSpacing: 1 }}>👁️ RESPOSTA</span>
            <p style={{ color: PALETA.textPrimary, fontSize: "clamp(20px, 5.5vw, 26px)", fontWeight: 900, margin: "6px 0 0", wordBreak: "break-word" }}>{cartaAtual.resposta}</p>
            <span style={{ fontSize: "clamp(10px, 2.2vw, 11px)", color: PALETA.textSecondary, marginTop: 6, display: "block" }}>toque para esconder</span>
          </div>
        )}

        {/* Dicas - cards vibrantes */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 2vw, 10px)", marginBottom: "clamp(12px, 3vw, 16px)", flex: 1, overflowY: "auto", paddingRight: 4 }}>
            {cartaAtual.dicas.map((dica, i) => {
              const revelada = isProgressivo ? i <= dicaIndex : true;
              return (
                <div key={i} style={{
                  background: revelada ? PALETA.bgCard : PALETA.bgSecondary,
                  border: "none",
                  borderRadius: 14, padding: "clamp(10px, 2.5vw, 14px)", display: "flex", gap: "clamp(10px, 2.5vw, 12px)", alignItems: "flex-start",
                  transition: "all 0.3s ease",
                  boxShadow: revelada ? "0 3px 12px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
                  transform: revelada ? "scale(1)" : "scale(0.98)",
                  opacity: revelada ? 1 : 0.6,
                }}>
                  <span style={{
                    background: revelada ? cor.bg : PALETA.bgPrimary,
                    color: revelada ? PALETA.textLight : PALETA.textSecondary,
                    fontWeight: 800, fontSize: "clamp(11px, 2.8vw, 13px)", minWidth: "clamp(28px, 6vw, 32px)", height: "clamp(28px, 6vw, 32px)",
                    display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, flexShrink: 0,
                    boxShadow: revelada ? `0 2px 6px ${cor.bg}44` : "none",
                  }}>
                    {i + 1}
                  </span>
                  <span style={{
                    color: revelada ? PALETA.textPrimary : PALETA.textSecondary,
                    fontSize: "clamp(13px, 3.2vw, 15px)", lineHeight: 1.6,
                    userSelect: revelada ? "auto" : "none",
                    flex: 1,
                    fontWeight: 500,
                  }}>
                    {revelada ? dica : "• • • • • • • •"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input e botões */}
        <div style={{ background: PALETA.bgCard, border: "none", borderRadius: 20, padding: "clamp(14px, 3.5vw, 18px)", flexShrink: 0, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", gap: "clamp(8px, 2vw, 10px)", marginBottom: "clamp(10px, 2.5vw, 12px)" }}>
            <input
              type="text"
              value={palpite}
              onChange={e => setPalpite(e.target.value)}
              onKeyDown={e => e.key === "Enter" && palpite.trim() && verificarPalpite()}
              placeholder="Digite seu palpite..."
              style={{
                flex: 1, padding: "clamp(12px, 3vw, 16px)", fontSize: 16,
                background: PALETA.bgInput,
                border: `3px solid ${shake ? PALETA.vermelho : PALETA.bgInput}`,
                borderRadius: 14, color: PALETA.textPrimary, outline: "none",
                transition: "all 0.3s ease",
                animation: shake ? "shake 0.5s ease" : "none",
                minWidth: 0,
                minHeight: 50,
                fontWeight: 600,
              }}
            />
            <button
              onClick={verificarPalpite}
              disabled={!palpite.trim()}
              style={{
                padding: "clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)", fontWeight: 800, fontSize: "clamp(14px, 3.5vw, 16px)",
                color: palpite.trim() ? PALETA.textLight : PALETA.textDisabled,
                background: palpite.trim() ? `linear-gradient(135deg, ${PALETA.verde}, ${PALETA.turquesa})` : PALETA.bgInput,
                border: palpite.trim() ? "none" : `2px solid ${PALETA.textDisabled}`,
                borderRadius: 14,
                cursor: palpite.trim() ? "pointer" : "default",
                minHeight: 50, whiteSpace: "nowrap", flexShrink: 0,
                boxShadow: palpite.trim() ? `0 4px 12px ${PALETA.verde}44` : "none",
                transition: "all 0.2s ease",
              }}
            >
              CHUTAR
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isProgressivo ? "repeat(auto-fit, minmax(min(100%, 95px), 1fr))" : "repeat(auto-fit, minmax(min(100%, 110px), 1fr))", gap: "clamp(8px, 2vw, 10px)" }}>
            {/* Botão de próxima dica (modo progressivo) */}
            {isProgressivo && (
              <button
                onClick={proximaDica}
                disabled={dicaIndex >= cartaAtual.dicas.length - 1}
                style={{
                  padding: "clamp(10px, 2.5vw, 14px)", fontWeight: 700, fontSize: "clamp(13px, 3vw, 14px)",
                  color: dicaIndex >= cartaAtual.dicas.length - 1 ? PALETA.textSecondary : PALETA.textLight,
                  background: dicaIndex >= cartaAtual.dicas.length - 1 ? PALETA.bgSecondary : PALETA.amarelo,
                  border: "none",
                  borderRadius: 12, minHeight: 48,
                  cursor: dicaIndex >= cartaAtual.dicas.length - 1 ? "default" : "pointer",
                  textAlign: "center",
                  boxShadow: dicaIndex >= cartaAtual.dicas.length - 1 ? "none" : `0 3px 10px ${PALETA.amarelo}44`,
                }}
              >
                {dicaIndex >= cartaAtual.dicas.length - 1 ? "Sem mais" : "💡 DICA"}
              </button>
            )}
            <button
              onClick={() => setRespostaRevelada(v => !v)}
              style={{
                padding: "clamp(10px, 2.5vw, 14px)", fontWeight: 700, fontSize: "clamp(13px, 3vw, 14px)",
                color: PALETA.textLight,
                background: respostaRevelada ? PALETA.verde : PALETA.vermelho,
                border: "none",
                borderRadius: 12, cursor: "pointer", minHeight: 48,
                textAlign: "center",
                boxShadow: respostaRevelada ? `0 3px 10px ${PALETA.verde}44` : `0 3px 10px ${PALETA.vermelho}44`,
              }}
            >
              {respostaRevelada ? "🙈 OCULTAR" : "👁️ VER"}
            </button>
            <button
              onClick={pularCarta}
              style={{
                padding: "clamp(10px, 2.5vw, 14px)", fontWeight: 700, fontSize: "clamp(13px, 3vw, 14px)",
                color: PALETA.textLight, background: PALETA.laranja,
                border: "none",
                borderRadius: 12, cursor: "pointer", minHeight: 48,
                textAlign: "center",
                boxShadow: `0 3px 10px ${PALETA.laranja}44`,
              }}
            >
              ⏭️ PULAR
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Configurações */}
      {mostrarConfig && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setMostrarConfig(false); }}
        >
          <div
            style={{
              width: "100%", maxWidth: 520,
              background: PALETA.bgCard,
              borderRadius: "24px 24px 0 0",
              padding: "clamp(20px, 5vw, 28px)",
              maxHeight: "85vh",
              overflowY: "auto",
              animation: "slideUp 0.3s ease-out",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header do modal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(20px, 5vw, 24px)" }}>
              <h3 style={{ color: PALETA.textPrimary, fontSize: "clamp(18px, 4.5vw, 22px)", fontWeight: 800, margin: 0 }}>⚙️ Configurações</h3>
              <button
                onClick={() => setMostrarConfig(false)}
                style={{
                  width: 44, height: 44, minWidth: 44, minHeight: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: PALETA.bgSecondary,
                  border: "none",
                  borderRadius: 12, cursor: "pointer",
                  fontSize: "clamp(18px, 4.5vw, 20px)",
                  color: PALETA.textSecondary,
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Seção: Modo de Jogo */}
            <div style={{ marginBottom: "clamp(20px, 5vw, 24px)" }}>
              <span style={{ color: PALETA.textSecondary, fontSize: "clamp(12px, 2.8vw, 13px)", fontWeight: 700, display: "block", marginBottom: "clamp(10px, 2.5vw, 14px)", textTransform: "uppercase", letterSpacing: 1 }}>
                MODO DE JOGO
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: "clamp(10px, 2.5vw, 14px)" }}>
                {[
                  { id: "todas", label: "📖 Todas as dicas", desc: "Veja todas de uma vez" },
                  { id: "progressivo", label: "💡 Uma por vez", desc: "Revele dica por dica" },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      const novoModo = m.id;
                      if (modoDicas === "progressivo" && novoModo === "todas") {
                        setDicaIndex(cartaAtual.dicas.length - 1);
                      }
                      setModoDicas(novoModo);
                      salvarPreferencia("modoDicas", novoModo);
                    }}
                    style={{
                      padding: "clamp(14px, 3.5vw, 18px)", borderRadius: 16, cursor: "pointer",
                      background: modoDicas === m.id ? PALETA.amarelo : PALETA.bgSecondary,
                      border: "none",
                      textAlign: "center",
                      minHeight: 80,
                      transition: "all 0.2s ease",
                      boxShadow: modoDicas === m.id ? `0 4px 14px ${PALETA.amarelo}44` : "0 2px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    <span style={{ display: "block", fontSize: "clamp(14px, 3.2vw, 16px)", fontWeight: 800, color: modoDicas === m.id ? PALETA.textPrimary : PALETA.textSecondary }}>{m.label}</span>
                    <span style={{ display: "block", fontSize: "clamp(11px, 2.5vw, 12px)", color: PALETA.textSecondary, marginTop: 6, fontWeight: 500 }}>{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seção: Aparência */}
            <div style={{ marginBottom: "clamp(20px, 5vw, 24px)" }}>
              <span style={{ color: PALETA.textSecondary, fontSize: "clamp(12px, 2.8vw, 13px)", fontWeight: 700, display: "block", marginBottom: "clamp(10px, 2.5vw, 14px)", textTransform: "uppercase", letterSpacing: 1 }}>
                APARÊNCIA
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: "clamp(10px, 2.5vw, 14px)" }}>
                {[
                  { id: "light", label: "☀️ Claro", desc: "Tema claro" },
                  { id: "dark", label: "🌙 Escuro", desc: "Tema escuro" },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTemaVisual(t.id);
                      salvarPreferencia("temaVisual", t.id);
                    }}
                    style={{
                      padding: "clamp(14px, 3.5vw, 18px)", borderRadius: 16, cursor: "pointer",
                      background: temaVisual === t.id ? PALETA.azul : PALETA.bgSecondary,
                      border: "none",
                      textAlign: "center",
                      minHeight: 80,
                      transition: "all 0.2s ease",
                      boxShadow: temaVisual === t.id ? `0 4px 14px ${PALETA.azul}44` : "0 2px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    <span style={{ display: "block", fontSize: "clamp(14px, 3.2vw, 16px)", fontWeight: 800, color: temaVisual === t.id ? PALETA.textLight : PALETA.textSecondary }}>{t.label}</span>
                    <span style={{ display: "block", fontSize: "clamp(11px, 2.5vw, 12px)", color: temaVisual === t.id ? PALETA.textLight : PALETA.textSecondary, marginTop: 6, fontWeight: 500, opacity: 0.8 }}>{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seção: Temas Ativos */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(10px, 2.5vw, 14px)", flexWrap: "wrap", gap: 8 }}>
                <span style={{ color: PALETA.textSecondary, fontSize: "clamp(12px, 2.8vw, 13px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                  TEMAS ATIVOS
                </span>
                <button
                  onClick={selecionarTodos}
                  style={{
                    padding: "clamp(6px, 1.5vw, 8px) clamp(14px, 3.5vw, 18px)",
                    fontSize: "clamp(11px, 2.8vw, 12px)",
                    fontWeight: 700,
                    color: temasSelecionados.size === 0 ? PALETA.textLight : PALETA.textSecondary,
                    background: temasSelecionados.size === 0 ? PALETA.verde : PALETA.bgSecondary,
                    border: "none",
                    borderRadius: 20, cursor: "pointer", minHeight: 36,
                    boxShadow: temasSelecionados.size === 0 ? `0 2px 8px ${PALETA.verde}44` : "none",
                  }}
                >
                  ✨ Todos
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 130px), 1fr))", gap: "clamp(8px, 2vw, 10px)", marginBottom: "clamp(14px, 3.5vw, 18px)" }}>
                {TEMAS.map(tema => {
                  const nenhumSelecionado = temasSelecionados.size === 0;
                  const ativo = nenhumSelecionado || temasSelecionados.has(tema);
                  const corTemaItem = CORES_TEMA[tema] || PALETA.textSecondary;
                  const emoji = EMOJI_TEMA[tema] || "🎯";
                  const qtd = contagemPorTema[tema] || 0;

                  return (
                    <button
                      key={tema}
                      onClick={() => toggleTema(tema)}
                      style={{
                        padding: "clamp(8px, 2vw, 10px)",
                        fontSize: "clamp(11px, 2.5vw, 12px)",
                        fontWeight: 700,
                        color: ativo ? PALETA.textLight : PALETA.textSecondary,
                        background: ativo ? corTemaItem : PALETA.bgSecondary,
                        border: "none",
                        borderRadius: 12,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        opacity: ativo ? 1 : 0.7,
                        minHeight: 40,
                        textAlign: "center",
                        boxShadow: ativo ? `0 2px 8px ${corTemaItem}44` : "0 1px 3px rgba(0,0,0,0.04)",
                      }}
                    >
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                        {emoji} {tema} <span style={{ fontSize: "clamp(9px, 2vw, 10px)", opacity: 0.85 }}>({qtd})</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Info de cartas restantes */}
              <div style={{
                background: PALETA.bgSecondary,
                border: "none",
                borderRadius: 14,
                padding: "clamp(12px, 3vw, 16px)",
                textAlign: "center",
              }}>
                <span style={{ color: PALETA.textSecondary, fontSize: "clamp(13px, 3vw, 14px)", fontWeight: 600 }}>
                  🃏 <strong style={{ color: PALETA.textPrimary }}>{restantes}</strong> cartas restantes
                  {temasSelecionados.size > 0 && (
                    <span> de <strong style={{ color: PALETA.textPrimary }}>{cartasFiltradas.length}</strong> selecionadas</span>
                  )}
                </span>
              </div>
            </div>

            {/* Botão fechar */}
            <button
              onClick={() => setMostrarConfig(false)}
              style={{
                width: "100%",
                marginTop: "clamp(20px, 5vw, 24px)",
                padding: "clamp(14px, 3.5vw, 18px)",
                fontSize: "clamp(15px, 4vw, 17px)",
                fontWeight: 800,
                color: PALETA.textLight,
                background: `linear-gradient(135deg, ${PALETA.roxo}, ${PALETA.rosa})`,
                border: "none",
                borderRadius: 16,
                cursor: "pointer",
                minHeight: 54,
                boxShadow: `0 4px 14px ${PALETA.roxo}44`,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              ✓ APLICAR
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-10px)} 75%{transform:translateX(10px)} }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        input::placeholder { color: #94a3b8; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
        button:active { transform: scale(0.96); }
        button:hover { filter: brightness(1.05); }
      `}</style>
    </div>
  );
}
