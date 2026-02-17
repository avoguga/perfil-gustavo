// =====================================================
// 📝 ÍNDICE CENTRAL DE TODAS AS CARTAS
// Para adicionar novas perguntas, crie um novo arquivo
// nesta pasta e importe aqui!
// =====================================================

import { ORIGINAIS } from "./originais";
import { PESSOAS } from "./pessoas";
import { LUGARES } from "./lugares";
import { ANOS } from "./anos";
import { COISAS_1 } from "./coisas1";
import { COISAS_2 } from "./coisas2";
import { BRASIL_CULTURA } from "./brasil_cultura";
import { FOFOCAS_POP } from "./fofocas_pop";
import { NERD_INTL } from "./nerd_intl";
import { ANIME_MANGA } from "./anime_manga";
import { FILMES_SERIES } from "./filmes_series";
import { MEMES_INTERNET } from "./memes_internet";
import { MUSICA_BRASILEIRA } from "./musica_brasileira";
import { TECNOLOGIA_APPS } from "./tecnologia_apps";
import { ESPORTES_COPA } from "./esportes_copa";
import { CIENCIA_ESPACO } from "./ciencia_espaco";
import { MUNDO_ANIMAL } from "./mundo_animal";
import { COMIDA_GASTRONOMIA } from "./comida_gastronomia";
import { GEOGRAFIA_MUNDIAL } from "./geografia_mundial";
import { HISTORIA_BRASIL } from "./historia_brasil";

// =====================================================
// 🏷️ CLASSIFICADOR AUTOMÁTICO DE TEMAS
// Cartas que já têm "tema" mantêm o valor.
// Cartas sem tema recebem um com base em palavras-chave.
// =====================================================

const TEMAS_POR_KEYWORDS = {
  "Esportes": [
    "futebol","copa do mundo","olimpíadas","basquete","tênis","vôlei","natação",
    "surf","skate","karatê","neymar","pelé","messi","cristiano ronaldo",
    "ayrton senna","usain bolt","muhammad ali","copa do mundo feminina",
  ],
  "Ciência & Tech": [
    "einstein","darwin","marie curie","tesla","newton","galileu","hawking",
    "dna","oxigênio","átomo","gravidade","penicilina","vacina","telescópio",
    "microscópio","computador","celular","internet","bitcoin","inteligência artificial",
    "chatgpt","pi (número)","luz","som","cérebro","coração","sangue","olho humano",
    "eletricidade","fotografia","televisão","rádio","telefone","satélite",
  ],
  "Geografia": [
    "brasil","amazônia","japão","egito","austrália","itália","paris","nova york",
    "tóquio","londres","roma","rio de janeiro","veneza","grécia","índia","china",
    "rússia","méxico","portugal","espanha","alemanha","canadá","argentina",
    "antártida","machu picchu","monte everest","sahara","himalaia","pantanal",
    "fernando de noronha","maldivas","dubai","alasca","grand canyon","patagônia",
    "bermudas","petra","madagascar","galápagos","fossa das marianas","islândia",
    "havaí","copacabana","pelourinho","cataratas do iguaçu","big ben",
    "estátua da liberdade","cristo redentor","muralha da china","taj mahal",
    "torre eiffel","coliseu","marte","saturno","via láctea","lua","sol",
  ],
  "História": [
    "1492","1500","1776","1789","1808","1822","1865","1888","1889","1912",
    "1914","1922","1929","1930","1939","1945","1953","1961","1964","1969",
    "1970","1977","1984","1986","1988","1989","1994","2001","2002","2008",
    "2014","2016","2020","2022","1066","1337","1517","1543","1804","1815",
    "cleópatra","leonardo da vinci","napoleão","lincoln","joana d'arc",
    "tutancâmon","marco polo","colombo","dom pedro","getúlio vargas",
    "pirâmide de gizé","mona lisa","dinossauro","genghis khan","alexandre",
    "rainha vitória","confúcio",
  ],
  "Música & Arte": [
    "michael jackson","elvis","freddie mercury","bob marley","beethoven",
    "mozart","guitarra","piano","violino","música","samba","rock and roll",
    "hip hop","bossa nova","forró","bach","chopin","caetano veloso",
    "roberto carlos","marília mendonça","carmen miranda","frida kahlo",
    "picasso","van gogh","shakespeare","machado de assis","walt disney",
    "chaplin",
  ],
  "Comida & Bebida": [
    "pizza","café","chocolate","pão","arroz","sal","vinho","cerveja",
    "açúcar","milho","batata","tomate","banana","laranja","chiclete",
    "sorvete","hambúrguer","sushi","churrasco","queijo","ovo","mel",
    "canela","pimenta","amendoim","coco","abacaxi","cacau","feijoada",
    "caipirinha","brigadeiro","açaí","água",
  ],
  "Natureza & Animais": [
    "baleia","elefante","leão","águia","tubarão","polvo","golfinho",
    "borboleta","formiga","tartaruga","abelha","neve","vulcão","terremoto",
    "tornado","arco-íris","eclipse","aurora boreal","raio","buraco negro",
    "petróleo","ouro","ferro","diamante","vidro","borracha","plástico",
  ],
  "Cultura Brasileira": [
    "carnaval","capoeira","bumba meu boi","candomblé","festa junina",
    "bandeira do brasil","hino nacional","língua portuguesa","pix",
    "jeans","seda","algodão","impressão digital","tatuagem","piercing",
    "perfume","espelho","guarda-chuva","óculos","sapato","alfabeto",
    "número zero","mapa","tempo","calendário","dinheiro","bússola",
    "xadrez","relógio","avião","carro","trem","navio","foguete","bicicleta",
    "livro","cinema","roda","fogo","papel","elevador","semáforo","ponte","túnel",
    "natal","páscoa","halloween","yoga",
  ],
};

function classificarTema(carta) {
  // Se já tem tema definido, manter
  if (carta.tema) return carta.tema;

  const resp = carta.resposta.toLowerCase();

  // Verificar por palavras-chave
  for (const [tema, keywords] of Object.entries(TEMAS_POR_KEYWORDS)) {
    if (keywords.some(kw => resp.includes(kw) || kw.includes(resp))) {
      return tema;
    }
  }

  // Fallback por categoria
  if (carta.categoria === "Ano") return "História";
  if (carta.categoria === "Lugar") return "Geografia";
  if (carta.categoria === "Pessoa") return "Personalidades";
  return "Geral";
}

// Junta tudo
const todasCartas = [
  ...ORIGINAIS,
  ...PESSOAS,
  ...LUGARES,
  ...ANOS,
  ...COISAS_1,
  ...COISAS_2,
  ...BRASIL_CULTURA,
  ...FOFOCAS_POP,
  ...NERD_INTL,
  ...ANIME_MANGA,
  ...FILMES_SERIES,
  ...MEMES_INTERNET,
  ...MUSICA_BRASILEIRA,
  ...TECNOLOGIA_APPS,
  ...ESPORTES_COPA,
  ...CIENCIA_ESPACO,
  ...MUNDO_ANIMAL,
  ...COMIDA_GASTRONOMIA,
  ...GEOGRAFIA_MUNDIAL,
  ...HISTORIA_BRASIL,
];

// Remove duplicatas e classifica temas
const respostasVistas = new Set();
export const CARTAS = todasCartas
  .filter((carta) => {
    const chave = carta.resposta.toLowerCase().trim();
    if (respostasVistas.has(chave)) return false;
    respostasVistas.add(chave);
    return true;
  })
  .map((carta) => ({
    ...carta,
    tema: classificarTema(carta),
  }));

// Exporta lista de temas disponíveis
const temasSet = new Set(CARTAS.map(c => c.tema));
export const TEMAS = [...temasSet].sort();

console.log(`🎯 Perfil Express: ${CARTAS.length} cartas | ${TEMAS.length} temas: ${TEMAS.join(", ")}`);
