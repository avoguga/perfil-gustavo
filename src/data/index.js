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
import { ANIME_MANGA_EXPANDED } from "./anime_manga_expanded";  // NOVO: 200+ cartas de anime
import { GAMES } from "./games";  // NOVO: 200+ cartas de games
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
  // ============================================================================
  // 🎯 SISTEMA DE CLASSIFICAÇÃO DE TEMAS - PERFIL EXPRESS
  // ============================================================================
  // REGRA: Cada keyword deve estar em APENAS UM tema para evitar conflitos!
  // A ORDEM importa: temas mais específicos vêm PRIMEIRO.
  // ============================================================================

  // ==================== 🇧🇷 CULTURA BRASILEIRA (PRIORIDADE MÁXIMA) ====================
  "Cultura Brasileira": [
    // FESTAS E TRADIÇÕES
    "carnaval","capoeira","bumba meu boi","candomblé","festa junina",
    "folia de reis","maracatu","frevo","axé","trio elétrico","bloco de rua",
    "escola de samba","passista","mestre-sala","porta-bandeira","boi-bumbá",
    "parintins","círio de nazaré","lavagem do bonfim","congada","cavalhada",
    "fandango","catira","quadrilha","são joão","são pedro","santo antônio",
    "reveillon de copacabana","carnaval de salvador","carnaval de olinda",

    // SÍMBOLOS NACIONAIS
    "bandeira do brasil","hino nacional brasileiro","pix","real brasileiro",
    "brasília","palácio do planalto","congresso nacional","itamaraty",

    // COMIDA E BEBIDA BRASILEIRA
    "feijoada","caipirinha","brigadeiro","açaí","tapioca","pão de queijo",
    "coxinha","acarajé","vatapá","moqueca","churrasco gaúcho","chimarrão",
    "tereré","cachaça","guaraná","paçoca","rapadura","canjica","pamonha",
    "curau","quentão","bolo de rolo","cartola","cocada","quindim","beijinho",
    "cajuína","tucupi","tacacá","baião de dois","arroz carreteiro","barreado",
    "pato no tucupi","caruru","bobó de camarão","xinxim de galinha",
    "cuscuz paulista","virado à paulista","tutu de feijão","tropeiro",
    "pastel de feira","caldo de cana","água de coco","açaí na tigela",

    // MÚSICA BRASILEIRA
    "bossa nova","forró","samba","mpb","sertanejo","pagode","funk carioca",
    "tropicália","baião","xote","ciranda","carimbó","lambada","axé music",
    "tecnobrega","piseiro","arrocha","brega","samba rock","samba de roda",
    "choro","maxixe","marchinha","samba-enredo","bossa","jovem guarda",

    // LUGARES ICÔNICOS DO BRASIL
    "copacabana","ipanema","pelourinho","lençóis maranhenses","chapada diamantina",
    "fernando de noronha","pantanal","cataratas do iguaçu","cristo redentor",
    "pão de açúcar","ouro preto","inhotim","bonito","jericoacoara",
    "porto de galinhas","gramado","campos do jordão","floresta amazônica",
    "amazônia","teatro amazonas","mercado ver-o-peso","elevador lacerda",
    "museu do amanhã","masp","ibirapuera","jardim botânico","tijuca",
    "morro da urca","arpoador","leblon","barra da tijuca","búzios",
    "paraty","ilha grande","angra dos reis","trindade","ubatuba",
    "ilhabela","guarujá","santos","balneário camboriú","florianópolis",
    "praia do rosa","torres","canela","bento gonçalves","aparados da serra",
    "foz do iguaçu","itaipu","chapada dos veadeiros","jalapão",
    "serra da canastra","capitólio","minas gerais","tiradentes",
    "diamantina","congonhas","mariana","são joão del rei","lavras novas",

    // FOLCLORE BRASILEIRO
    "saci-pererê","saci","curupira","iara","boto cor-de-rosa","mula sem cabeça",
    "cuca","boitatá","negrinho do pastoreio","vitória-régia (lenda)",
    "cobra grande","mapinguari","caipora","anhangá","pisadeira",
    "corpo-seco","alamoa","papa-figo","cumadre fulozinha",

    // PERSONALIDADES BRASILEIRAS
    "pelé","ayrton senna","machado de assis","carmen miranda","tom jobim",
    "chico buarque","gilberto gil","elis regina","santos dumont",
    "caetano veloso","roberto carlos","marília mendonça","luiz gonzaga",
    "vinicius de moraes","dorival caymmi","noel rosa","pixinguinha",
    "heitor villa-lobos","oscar niemeyer","lúcio costa","portinari",
    "clarice lispector","jorge amado","drummond","cecília meireles",
    "guimarães rosa","monteiro lobato","graciliano ramos","rachel de queiroz",
    "anitta","ivete sangalo","gal costa","maria bethânia","djavan",
    "alceu valença","dominguinhos","fagner","belchior","raul seixas",
    "cazuza","cássia eller","legião urbana","paralamas do sucesso",
    "titãs","barão vermelho","engenheiros do hawaii","capital inicial",
    "skank","jota quest","charlie brown jr","mamonas assassinas",
    "nando reis","seu jorge","emicida","criolo","racionais mc's",
    "sabotage","mano brown","mc soffia","ludmilla","pabllo vittar",
    "gloria groove","liniker","silva","rubel","tiago iorc",

    // TV BRASILEIRA
    "globo","sbt","record","bandeirantes","cultura",
    "fantástico","jornal nacional","faustão","ratinho","silvio santos",
    "ana maria braga","hebe camargo","chacrinha","jô soares",
    "porta dos fundos","zorra total","casseta e planeta","os trapalhões",
    "sítio do picapau amarelo","chaves no brasil","turma da mônica",
    "castelo rá-tim-bum","rá-tim-bum","mundo da lua","sandy e junior",
    "malhação","novela das nove","novela das seis","novela das sete",

    // EXPRESSÕES E CONCEITOS BRASILEIROS
    "jeitinho brasileiro","gambiarra","saudade","cafuné","dengo",
    "muvuca","farofa","rolê","perrengue","migué",
  ],

  // ==================== 🎌 ANIME & MANGÁ ====================
  "Anime & Mangá": [
    // TERMOS GERAIS
    "anime","mangá","otaku","cosplay","shonen","shoujo","seinen","isekai",
    "mecha","slice of life","ecchi","harem","josei","kodomo","light novel",
    "visual novel","doujinshi","mangaká","seiyuu","opening","ending",
    "ova","ona","filler","canon","arco","saga","waifu","husbando",
    "tsundere","yandere","kuudere","dandere","senpai","sensei","kun","chan",
    "san","sama","dattebayo","nani","kawaii","sugoi","baka",

    // ANIMES POPULARES
    "naruto","goku","dragon ball","one piece","luffy","attack on titan",
    "death note","pikachu","pokemon","studio ghibli","hayao miyazaki",
    "demon slayer","jujutsu kaisen","my hero academia","bleach","evangelion",
    "sailor moon","fullmetal alchemist","hunter x hunter","one punch man",
    "sword art online","tokyo ghoul","chainsaw man","spy x family",
    "mob psycho 100","dr. stone","black clover","fairy tail","inuyasha",
    "yu yu hakusho","saint seiya","cavaleiros do zodíaco","rurouni kenshin",
    "samurai x","cowboy bebop","trigun","berserk","vinland saga",
    "steins;gate","code geass","gurren lagann","kill la kill","akira",
    "ghost in the shell","paprika","perfect blue","your name","kimi no na wa",
    "weathering with you","a viagem de chihiro","spirited away",
    "meu amigo totoro","princess mononoke","howl's moving castle",
    "porco rosso","ponyo","o menino e a garça","jojo's bizarre adventure",
    "jojo","konosuba","re:zero","overlord","that time i got reincarnated",
    "slime","shield hero","mushoku tensei","frieren","bocchi the rock",
    "oshi no ko","blue lock","solo leveling","kaiju no. 8",

    // PERSONAGENS ICÔNICOS
    "goku","vegeta","gohan","piccolo","freeza","cell","majin boo",
    "naruto uzumaki","sasuke","sakura","kakashi","itachi","pain","madara",
    "luffy","zoro","sanji","nami","robin","chopper","law","ace",
    "eren yeager","mikasa","levi","armin","annie","reiner",
    "tanjiro","nezuko","zenitsu","inosuke","rengoku","muzan",
    "gojo satoru","yuji itadori","megumi","sukuna","todo",
    "izuku midoriya","deku","bakugo","todoroki","all might","endeavor",
    "ichigo","rukia","aizen","byakuya","urahara","yoruichi",
    "light yagami","L","ryuk","misa","near","mello",
    "saitama","genos","king","fubuki","tatsumaki","garou",
    "edward elric","alphonse","roy mustang","scar","winry",
    "gon freecss","killua","kurapika","leorio","hisoka","chrollo",
    "shinji ikari","rei ayanami","asuka","misato","gendo",

    // CRIADORES E ESTÚDIOS
    "akira toriyama","eiichiro oda","masashi kishimoto","hajime isayama",
    "koyoharu gotouge","gege akutami","kohei horikoshi","tite kubo",
    "yoshihiro togashi","kentaro miura","junji ito","naoko takeuchi",
    "rumiko takahashi","osamu tezuka","hideaki anno","makoto shinkai",
    "satoshi kon","isao takahata","mamoru hosoda","ufotable","mappa",
    "bones","madhouse","wit studio","a-1 pictures","kyoto animation",
    "toei animation","sunrise","gainax","trigger","shaft",
    "shonen jump","kodansha","shueisha","weekly shonen jump",
  ],

  // ==================== 🎮 GAMES ====================
  "Games": [
    // JOGOS POPULARES
    "minecraft","fortnite","gta","grand theft auto","zelda","mario","sonic",
    "league of legends","lol","free fire","roblox","playstation","xbox",
    "nintendo","valorant","counter-strike","cs2","cs:go","call of duty","cod",
    "fifa","ea fc","elden ring","dark souls","bloodborne","sekiro",
    "god of war","the last of us","resident evil","final fantasy",
    "pokemon","tetris","pac-man","donkey kong","street fighter",
    "mortal kombat","tekken","super smash bros","overwatch","overwatch 2",
    "apex legends","pubg","world of warcraft","wow","diablo","starcraft",
    "dota 2","hearthstone","halo","gears of war","forza","gran turismo",
    "need for speed","rocket league","fall guys","among us","terraria",
    "stardew valley","hollow knight","celeste","cuphead","undertale",
    "hades","dead cells","risk of rain","vampire survivors","slay the spire",
    "balatro","lethal company","palworld","hogwarts legacy","baldur's gate 3",
    "cyberpunk 2077","witcher","red dead redemption","gta v","gta 6",
    "assassin's creed","uncharted","tomb raider","horizon zero dawn",
    "spider-man","batman arkham","devil may cry","monster hunter",
    "persona","kingdom hearts","fire emblem","xenoblade","metroid",
    "kirby","animal crossing","splatoon","pikmin","smash bros",
    "mario kart","mario party","paper mario","super mario odyssey",
    "breath of the wild","tears of the kingdom","ocarina of time",
    "majora's mask","link","ganondorf","princess zelda","hyrule",
    "crash bandicoot","spyro","ratchet and clank","jak and daxter",
    "sly cooper","littlebigplanet","sackboy","ghost of tsushima",
    "death stranding","metal gear solid","silent hill","castlevania",
    "mega man","rockman","street fighter 6","guilty gear","dragon ball fighterz",
    "naruto storm","one piece","dragon ball xenoverse","jump force",

    // CONSOLES E PLATAFORMAS
    "playstation 5","ps5","playstation 4","ps4","ps3","ps2","ps1","psx",
    "xbox series x","xbox series s","xbox one","xbox 360","xbox original",
    "nintendo switch","switch","nintendo 3ds","wii u","wii","gamecube",
    "nintendo 64","n64","super nintendo","snes","nes","famicom",
    "game boy","game boy advance","gba","ds","psp","ps vita",
    "steam deck","pc gaming","steam","epic games","game pass","ps plus",
    "sega genesis","mega drive","dreamcast","saturn","master system",
    "atari","atari 2600","neo geo","turbografx","pc engine",

    // TERMOS E CONCEITOS
    "gameplay","speedrun","easter egg","boss fight","dungeon",
    "pvp","pve","mmo","mmorpg","rpg","fps","tps","rts","moba",
    "battle royale","roguelike","roguelite","metroidvania","souls-like",
    "open world","sandbox","survival","crafting","loot","grinding",
    "microtransação","dlc","season pass","early access","beta",
    "esports","e-sports","pro player","streamer","twitch","youtube gaming",

    // PERSONAGENS DE GAMES
    "mario","luigi","peach","bowser","yoshi","toad","wario","waluigi",
    "link","zelda","ganon","master chief","kratos","nathan drake",
    "lara croft","cloud strife","sephiroth","solid snake","big boss",
    "sonic","tails","knuckles","eggman","shadow","amy rose",
    "crash","spyro","sackboy","ratchet","clank","jak","daxter",
    "pikachu","charizard","mewtwo","eevee","gengar","lucario",
    "steve","alex","creeper","enderman","herobrine",
  ],

  // ==================== ⚽ ESPORTES ====================
  "Esportes": [
    // MODALIDADES
    "futebol","copa do mundo","olimpíadas","basquete","tênis","vôlei","natação",
    "surf","skate","karatê","judô","boxe","mma","ufc","fórmula 1",
    "atletismo","ginástica","handball","rugby","críquete","golfe","hóquei",
    "baseball","softball","polo aquático","saltos ornamentais","nado sincronizado",
    "luta greco-romana","luta livre","taekwondo","esgrima","tiro esportivo",
    "arco e flecha","ciclismo","triatlo","pentatlo","maratona","corrida",
    "levantamento de peso","crossfit","fisiculturismo","wrestling","wwe",
    "snowboard","esqui","patinação","curling","bobsled","biathlon",

    // COMPETIÇÕES
    "copa do mundo feminina","champions league","libertadores","sul-americana",
    "premier league","la liga","serie a","bundesliga","ligue 1",
    "brasileirão","copa do brasil","campeonato paulista","campeonato carioca",
    "nba","nfl","mlb","nhl","super bowl","world series","stanley cup",
    "wimbledon","us open","roland garros","australian open","masters",
    "wsl","x games","ufc","bellator","one championship","mundial de clubes",
    "eurocopa","copa américa","nations league","eliminatórias",

    // ATLETAS INTERNACIONAIS
    "messi","cristiano ronaldo","usain bolt","muhammad ali","michael phelps",
    "lebron james","michael jordan","kobe bryant","steph curry","shaq",
    "roger federer","rafael nadal","novak djokovic","serena williams",
    "tiger woods","wayne gretzky","tom brady","floyd mayweather",
    "mike tyson","conor mcgregor","khabib","anderson silva","jon jones",
    "lewis hamilton","max verstappen","schumacher","alonso",
    "simone biles","michael phelps","katie ledecky","bolt",
  ],

  // ==================== 🔬 CIÊNCIA & TECNOLOGIA ====================
  "Ciência & Tech": [
    // CIENTISTAS
    "einstein","darwin","marie curie","tesla","newton","galileu","hawking",
    "copérnico","kepler","faraday","maxwell","bohr","heisenberg","feynman",
    "carl sagan","neil degrasse tyson","jane goodall","mendel","pasteur",
    "fleming","watson","crick","rosalind franklin","oppenheimer",

    // CONCEITOS CIENTÍFICOS
    "dna","átomo","gravidade","penicilina","vacina","teoria da relatividade",
    "big bang","evolução","seleção natural","genética","neurociência",
    "mecânica quântica","física","química","biologia","matemática",
    "energia","matéria","molécula","célula","vírus","bactéria",
    "antibiótico","quimioterapia","raio-x","ressonância magnética",
    "nanotecnologia","biotecnologia","clonagem","transgênico","ogm",

    // TECNOLOGIA
    "computador","celular","smartphone","internet","wifi","bluetooth",
    "bitcoin","criptomoeda","blockchain","inteligência artificial","ia",
    "chatgpt","machine learning","deep learning","algoritmo","programação",
    "código","software","hardware","app","aplicativo","site","website",
    "rede social","facebook","instagram","twitter","x","tiktok","youtube",
    "google","apple","microsoft","amazon","meta","nvidia","openai",
    "5g","fibra óptica","servidor","cloud","nuvem","data center",
    "hacker","vírus de computador","malware","ransomware","firewall",
    "cibersegurança","criptografia","vpn","tor","dark web",

    // INVENÇÕES TECNOLÓGICAS
    "eletricidade","lâmpada","motor elétrico","bateria","gerador",
    "televisão","rádio","telefone","satélite","gps","drone",
    "robô","automação","impressora 3d","realidade virtual","vr",
    "realidade aumentada","ar","metaverso","nft","web3",
  ],

  // ==================== 🚀 ASTRONOMIA ====================
  "Astronomia": [
    // CORPOS CELESTES
    "marte","saturno","júpiter","mercúrio","vênus","urano","netuno","plutão",
    "via láctea","lua","sol","estrela","galáxia","buraco negro","nebulosa",
    "cometa","asteroide","meteoro","meteorito","supernova","pulsar","quasar",
    "anã branca","gigante vermelha","sistema solar","exoplaneta","anéis de saturno",
    "luas de júpiter","cinto de asteroides","nuvem de oort","kuiper",

    // FENÔMENOS
    "eclipse","aurora boreal","aurora austral","chuva de meteoros",
    "solstício","equinócio","órbita","rotação","translação","gravidade",
    "ano-luz","parsec","unidade astronômica","magnitude","espectro",

    // CONSTELAÇÕES
    "constelação","orion","ursa maior","ursa menor","cruzeiro do sul",
    "escorpião","sagitário","touro","gêmeos","leão","virgem","aquário",

    // EXPLORAÇÃO ESPACIAL
    "nasa","spacex","estação espacial internacional","iss","telescópio hubble",
    "james webb","voyager","curiosity","perseverance","apollo","apollo 11",
    "neil armstrong","buzz aldrin","yuri gagarin","elon musk","jeff bezos",
    "virgin galactic","blue origin","starlink","starship","falcon","dragon",
  ],

  // ==================== 🌍 GEOGRAFIA MUNDIAL ====================
  "Geografia": [
    // PAÍSES E CONTINENTES
    "japão","egito","austrália","itália","frança","reino unido","estados unidos",
    "canadá","méxico","argentina","chile","peru","colômbia","venezuela",
    "alemanha","espanha","portugal","holanda","bélgica","suíça","áustria",
    "rússia","china","índia","coreia do sul","tailândia","vietnã","indonésia",
    "filipinas","singapura","malásia","turquia","grécia","egito","marrocos",
    "áfrica do sul","nigéria","quênia","etiópia","tanzânia","uganda",
    "nova zelândia","fiji","polinésia","caribe","cuba","jamaica","bahamas",

    // CIDADES
    "paris","nova york","tóquio","londres","roma","veneza","barcelona",
    "madri","berlim","amsterdã","praga","viena","budapeste","moscou",
    "istambul","dubai","pequim","xangai","hong kong","seul","bangkok",
    "singapura","sydney","melbourne","los angeles","las vegas","miami",
    "chicago","san francisco","toronto","vancouver","cidade do méxico",
    "buenos aires","santiago","lima","bogotá","havana","cairo","marrakech",

    // MONUMENTOS E PONTOS TURÍSTICOS
    "big ben","estátua da liberdade","muralha da china","taj mahal",
    "torre eiffel","coliseu","acrópole","partenon","pirâmide de gizé",
    "esfinge","petra","machu picchu","chichen itza","angkor wat",
    "monte rushmore","golden gate","times square","central park",
    "buckingham palace","louvre","notre-dame","sagrada família",
    "alhambra","kremlin","praça vermelha","cidade proibida",

    // GEOGRAFIA FÍSICA
    "monte everest","himalaia","alpes","andes","montanhas rochosas",
    "sahara","gobi","atacama","antártida","ártico","tundra","taiga",
    "grand canyon","fiordes","great barrier reef","madagascar",
    "galápagos","fossa das marianas","islândia","havaí","maldivas",
  ],

  // ==================== 📚 HISTÓRIA ====================
  "História": [
    // DATAS IMPORTANTES
    "1492","1500","1776","1789","1808","1822","1865","1888","1889","1912",
    "1914","1918","1929","1930","1939","1945","1953","1961","1964","1969",
    "1989","1991","2001","1066","1453","1517","1543","1789","1804","1815",

    // FIGURAS HISTÓRICAS
    "cleópatra","júlio césar","augusto","nero","alexandre o grande",
    "napoleão","lincoln","washington","churchill","hitler","stalin",
    "joana d'arc","tutancâmon","marco polo","colombo","vasco da gama",
    "fernão de magalhães","genghis khan","rainha vitória","confúcio",
    "buda","maomé","martin luther","martin luther king","gandhi",
    "nelson mandela","che guevara","fidel castro","mao tsé-tung",

    // EVENTOS HISTÓRICOS
    "guerra mundial","primeira guerra","segunda guerra","guerra fria",
    "revolução francesa","revolução americana","revolução industrial",
    "independência","colonização","descobrimento","renascimento",
    "idade média","império romano","grécia antiga","egito antigo",
    "queda do muro de berlim","holocausto","d-day","pearl harbor",
    "bomba atômica","hiroshima","nagasaki","corrida espacial",

    // CIVILIZAÇÕES
    "roma antiga","grécia antiga","egito antigo","mesopotâmia","persas",
    "vikings","celtas","aztecas","maias","incas","dinastia ming",
    "império otomano","império britânico","império mongol",
  ],

  // ==================== 🎵 MÚSICA & ARTE (Internacional) ====================
  "Música & Arte": [
    // MÚSICOS E BANDAS
    "michael jackson","elvis presley","freddie mercury","bob marley",
    "the beatles","queen","rolling stones","pink floyd","led zeppelin",
    "nirvana","guns n roses","ac/dc","metallica","iron maiden","u2",
    "coldplay","radiohead","oasis","red hot chili peppers","foo fighters",
    "madonna","whitney houston","celine dion","mariah carey","adele",
    "beyoncé","taylor swift","rihanna","lady gaga","ariana grande",
    "billie eilish","dua lipa","the weeknd","bruno mars","ed sheeran",
    "drake","kanye west","eminem","jay-z","kendrick lamar","tupac",
    "notorious big","snoop dogg","dr. dre","50 cent","nicki minaj",
    "bts","blackpink","k-pop","j-pop",

    // COMPOSITORES CLÁSSICOS
    "beethoven","mozart","bach","chopin","vivaldi","tchaikovsky",
    "wagner","brahms","debussy","verdi","puccini","handel",

    // INSTRUMENTOS
    "guitarra","piano","violino","bateria","baixo","saxofone","flauta",
    "violoncelo","harpa","órgão","acordeão","ukulele","banjo",

    // GÊNEROS MUSICAIS
    "rock and roll","heavy metal","punk rock","grunge","indie",
    "hip hop","rap","r&b","soul","funk","disco","eletrônica",
    "edm","house","techno","trance","dubstep","pop","country",
    "jazz","blues","reggae","ska","gospel","ópera","clássica",

    // ARTISTAS PLÁSTICOS
    "leonardo da vinci","mona lisa","última ceia","michelangelo",
    "rafael","caravaggio","rembrandt","vermeer","monet","manet",
    "van gogh","renoir","cézanne","gauguin","toulouse-lautrec",
    "picasso","dalí","frida kahlo","diego rivera","warhol",
    "banksy","basquiat","pollock","kandinsky","mondrian","klimt",

    // ESCRITORES
    "shakespeare","dante","cervantes","goethe","dostoiévski","tolstói",
    "kafka","hemingway","fitzgerald","orwell","aldous huxley",
    "stephen king","agatha christie","j.k. rowling","tolkien",
    "george r.r. martin","neil gaiman",
  ],

  // ==================== 🍕 COMIDA & BEBIDA (Internacional) ====================
  "Comida & Bebida": [
    // COMIDAS
    "pizza","hambúrguer","hot dog","sushi","sashimi","ramen","udon",
    "pho","pad thai","curry","tikka masala","kebab","falafel","hummus",
    "tacos","burrito","nachos","enchilada","paella","risotto","lasanha",
    "macarrão","espaguete","carbonara","bolonhesa","croissant","baguete",
    "pretzel","schnitzel","bratwurst","fish and chips","shepherd's pie",
    "dim sum","spring roll","gyoza","tempurá","bibimbap","kimchi",

    // INGREDIENTES
    "arroz","feijão","batata","tomate","cebola","alho","pimenta",
    "sal","açúcar","farinha","ovo","leite","queijo","manteiga",
    "azeite","vinagre","mostarda","ketchup","maionese",
    "carne","frango","peixe","camarão","bacon","presunto",
    "alface","cenoura","brócolis","espinafre","cogumelo",

    // BEBIDAS
    "café","chá","chocolate quente","suco","refrigerante","coca-cola",
    "água","água com gás","energético","cerveja","vinho","champagne",
    "whisky","vodka","rum","tequila","gin","sake","licor","conhaque",

    // SOBREMESAS
    "sorvete","bolo","torta","pudim","mousse","cheesecake","brownie",
    "cookie","macaron","tiramisú","crème brûlée","churros","waffle",
    "panqueca","donut","cupcake","muffin","pie",
  ],

  // ==================== 🦁 NATUREZA & ANIMAIS ====================
  "Natureza & Animais": [
    // MAMÍFEROS
    "leão","tigre","leopardo","guepardo","pantera","lobo","raposa",
    "urso","urso polar","panda","koala","canguru","elefante","girafa",
    "hipopótamo","rinoceronte","zebra","gorila","chimpanzé","orangotango",
    "macaco","preguiça","tatu","tamanduá","capivara","anta","onça",
    "jaguar","puma","lince","cervo","alce","bisão","búfalo","camelo",
    "lhama","alpaca","cavalo","burro","vaca","boi","ovelha","cabra",
    "porco","javali","castor","lontra","foca","morsa","leão-marinho",
    "golfinho","baleia","orca","narval","peixe-boi",

    // AVES
    "águia","falcão","coruja","gavião","abutre","condor","albatroz",
    "pelicano","flamingo","cisne","pato","ganso","gaivota","pombo",
    "pardal","beija-flor","tucano","arara","papagaio","periquito",
    "canário","corvo","pica-pau","pavão","avestruz","emu","kiwi",
    "pinguim","andorinha","cuco","faisão","peru","galo","galinha",

    // RÉPTEIS E ANFÍBIOS
    "crocodilo","jacaré","lagarto","iguana","camaleão","gecko",
    "cobra","píton","anaconda","jiboia","cascavel","naja","mamba",
    "tartaruga","jabuti","cágado","tartaruga marinha",
    "sapo","rã","perereca","salamandra",

    // PEIXES E VIDA MARINHA
    "tubarão","tubarão branco","tubarão martelo","arraia","peixe-espada",
    "atum","salmão","bacalhau","sardinha","anchova","tilápia",
    "peixe-palhaço","peixe-beta","carpa","koi","piranha","pirarucu",
    "polvo","lula","água-viva","coral","estrela-do-mar","ouriço-do-mar",
    "caranguejo","lagosta","camarão","mexilhão","ostra",

    // INSETOS E ARACNÍDEOS
    "abelha","vespa","formiga","cupim","barata","mosca","mosquito",
    "borboleta","mariposa","libélula","besouro","joaninha","gafanhoto",
    "grilo","cigarra","louva-deus","aranha","escorpião","carrapato",

    // FENÔMENOS NATURAIS
    "vulcão","terremoto","tsunami","furacão","tornado","tempestade",
    "raio","trovão","neve","granizo","neblina","arco-íris",
    "gêiser","avalanche","deslizamento","inundação","seca","incêndio",

    // BIOMAS E ECOSSISTEMAS
    "floresta","selva","savana","deserto","tundra","taiga","pantanal",
    "mangue","recife de coral","oceano","rio","lago","cachoeira",
  ],

  // ==================== 💎 MATERIAIS & RECURSOS ====================
  "Materiais & Recursos": [
    "ouro","prata","bronze","cobre","ferro","aço","alumínio","titânio",
    "platina","diamante","rubi","safira","esmeralda","ametista","topázio",
    "petróleo","gás natural","carvão","urânio","lítio","cobalto","níquel",
    "vidro","cristal","cerâmica","porcelana","mármore","granito",
    "madeira","bambu","cortiça","couro","lã","seda","algodão","linho",
    "borracha","plástico","poliéster","nylon","kevlar","fibra de carbono",
    "concreto","cimento","tijolo","gesso","argila","areia","cascalho",
  ],

  // ==================== 💡 INVENÇÕES & OBJETOS ====================
  "Invenções & Objetos": [
    // INVENÇÕES HISTÓRICAS
    "roda","fogo","papel","pólvora","bússola","imprensa","telescópio",
    "microscópio","termômetro","barômetro","relógio","óculos","espelho",
    "guarda-chuva","zipper","zíper","velcro","caneta esferográfica",

    // TRANSPORTES
    "avião","carro","bicicleta","motocicleta","trem","metrô","ônibus",
    "navio","barco","helicóptero","foguete","submarino","balão",
    "dirigível","patinete","skate","segway","hoverboard",

    // ELETRODOMÉSTICOS
    "geladeira","fogão","micro-ondas","forno","liquidificador","batedeira",
    "torradeira","cafeteira","aspirador de pó","máquina de lavar",
    "secadora","ar condicionado","ventilador","aquecedor","ferro de passar",

    // ELETRÔNICOS
    "lâmpada","televisão","rádio","telefone","celular","computador",
    "laptop","tablet","smartwatch","fone de ouvido","caixa de som",
    "câmera","projetor","impressora","scanner","pendrive","hd","ssd",

    // OBJETOS DO COTIDIANO
    "chave","fechadura","parafuso","prego","martelo","chave de fenda",
    "tesoura","faca","garfo","colher","prato","copo","xícara","garrafa",
    "mochila","mala","carteira","bolsa","sapato","tênis","chinelo",
  ],

  // ==================== 📅 DATAS COMEMORATIVAS ====================
  "Datas Comemorativas": [
    "natal","papai noel","árvore de natal","presépio","panetone",
    "páscoa","coelhinho da páscoa","ovo de páscoa","chocolate",
    "halloween","dia das bruxas","abóbora","fantasia","doces ou travessuras",
    "dia das mães","dia dos pais","dia dos namorados","valentines day",
    "ano novo","réveillon","fogos de artifício","champagne","contagem regressiva",
    "dia da independência","dia do trabalho","dia das crianças",
    "ação de graças","thanksgiving","peru","torta de abóbora",
    "hanukkah","diwali","eid","ramadã","ano novo chinês",
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

// Junta tudo - TOTAL: 1500+ cartas
const todasCartas = [
  ...ORIGINAIS,
  ...PESSOAS,
  ...LUGARES,
  ...ANOS,
  ...COISAS_1,
  ...COISAS_2,
  ...BRASIL_CULTURA,           // 150 cartas de cultura brasileira
  ...FOFOCAS_POP,
  ...NERD_INTL,
  ...ANIME_MANGA,
  ...ANIME_MANGA_EXPANDED,     // NOVO: 200+ cartas de anime expandido
  ...GAMES,                     // NOVO: 200+ cartas de games
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
