const READING_QUESTIONS = [{"q": "Vad studerar sociologin?", "options": ["Människor i sociala sammanhang", "Människans biologiska utveckling", "Statens politiska institutioner"], "correct": 0, "explanation": "Sociologin studerar hur människor lever tillsammans, påverkar varandra och fungerar i grupper och samhällen."}, {"q": "Vad är sociologins övergripande mål?", "options": ["Förklara biologiska egenskaper", "Förstå socialt samspel", "Beskriva historiska årtal"], "correct": 1, "explanation": "Målet är att förstå samspelet mellan individen, grupperna och samhället."}, {"q": "Vad gjorde mänskligt samarbete möjligt?", "options": ["Organiserade samhällen kunde utvecklas", "Människor blev mer självständiga", "Gemensamma regler blev onödiga"], "correct": 0, "explanation": "Människans förmåga att samarbeta gjorde det möjligt att bygga upp organiserade samhällen."}, {"q": "Vad kännetecknade jordbruksrevolutionen?", "options": ["Fabriker och urbanisering", "Internet och sociala medier", "Bosättning och odling"], "correct": 2, "explanation": "Jordbruksrevolutionen innebar att människor började bosätta sig på en plats och odla mark."}, {"q": "Vad kännetecknade industriella revolutionen?", "options": ["Fabriker och växande städer", "Jordbruk och mindre samhällen", "Internet och global kommunikation"], "correct": 0, "explanation": "Fabriker, maskiner och urbanisering förändrade samhället i grunden under den industriella revolutionen."}, {"q": "När utvecklades sociologin som vetenskap?", "options": ["Under jägar- och samlartiden", "Under industriella revolutionen", "Under digitala revolutionen"], "correct": 1, "explanation": "Sociologin utvecklades som vetenskap under den industriella revolutionens stora samhällsförändringar."}, {"q": "Vad förändrade den digitala revolutionen?", "options": ["Kommunikation och informationsdelning", "Jordbruk och livsmedelsproduktion", "Familjens biologiska utveckling"], "correct": 0, "explanation": "Internet och sociala medier förändrade hur människor kommunicerar, arbetar och delar information."}, {"q": "Vad påverkar AI-revolutionen enligt texten?", "options": ["Arbete, lärande och beslut", "Enbart människors fritid", "Främst jordbrukets organisation"], "correct": 0, "explanation": "AI påverkar hur människor arbetar, lär sig och fattar beslut."}, {"q": "Varför var gruppen viktig för stenåldersmänniskan?", "options": ["Skydd och gemensam överlevnad", "Oberoende från andra människor", "Mindre behov av samarbete"], "correct": 0, "explanation": "En ensam människa hade små möjligheter att överleva. Gruppen gav samarbete, skydd och delade uppgifter."}, {"q": "Vad behövdes för tidigt samarbete?", "options": ["Regler, förtroende och samarbete", "Konkurrens, isolering och självständighet", "Städer, fabriker och maskiner"], "correct": 0, "explanation": "För att samarbetet skulle fungera behövdes regler, förtroende och gemensamma sätt att lösa problem."}, {"q": "Vilket behov har gamla sociala rötter?", "options": ["Gemenskap och trygghet", "Fullständig självständighet", "Frånvaro av sociala regler"], "correct": 0, "explanation": "Texten lyfter bland annat gemenskap, trygghet, samarbete och tillit som behov med djupa historiska rötter."}, {"q": "Hur lär vi oss oskrivna regler?", "options": ["Genom livet med andra", "Genom skrivna lagböcker", "Genom biologisk nedärvning"], "correct": 0, "explanation": "Vi lär oss exempelvis att hälsa, säga tack och vänta på vår tur genom att leva tillsammans med andra."}, {"q": "Varför kan människor följa gruppen?", "options": ["För att undvika utanförskap", "För att slippa all kontakt", "För att skapa formella lagar"], "correct": 0, "explanation": "Människor kan följa gruppen för att undvika konflikter eller risken att hamna utanför."}, {"q": "Vad formar våra normer och värderingar?", "options": ["Familj, skola och kultur", "Enbart våra biologiska egenskaper", "Bara politiska val"], "correct": 0, "explanation": "Familjen, skolan, lagar, medier och kulturen påverkar hur vi ser på världen och formar normer och värderingar."}, {"q": "Hur kan människor förändra samhället?", "options": ["Genom spridda nya beteenden", "Genom att undvika grupper", "Genom oförändrade sociala vanor"], "correct": 0, "explanation": "När många människor förändrar beteenden kan nya vanor, idéer och värderingar spridas och bli nya normer."}, {"q": "Varför förenklar sociologer verkligheten?", "options": ["Samhället är mycket komplext", "Människor beter sig alltid lika", "Samhället saknar återkommande mönster"], "correct": 0, "explanation": "Samhället är komplext. Sociologer studerar därför observerbara beteenden och återkommande mönster."}, {"q": "Vad används sociologiska begrepp till?", "options": ["Beskriva och förstå fenomen", "Förutsäga alla framtida handlingar", "Skapa samhällets lagar"], "correct": 0, "explanation": "Begrepp används för att beskriva, kategorisera och förstå olika saker och fenomen."}, {"q": "Vad är en sociologisk teori?", "options": ["En personlig samhällsåsikt", "En förenklad förklaringsmodell", "En formell samhällsregel"], "correct": 1, "explanation": "Teorier är förenklade modeller av verkligheten som hjälper oss att förklara sociala fenomen."}, {"q": "Vad avgör vad som kan vara en grupp?", "options": ["Vilket perspektiv som används", "Exakt hur många personer", "Att alla känner varandra"], "correct": 0, "explanation": "Det viktiga är inte ett bestämt antal människor utan vilket perspektiv sociologen väljer."}, {"q": "Varför använder sociologer flera nivåer?", "options": ["För en mer fullständig bild", "För att undvika samhällsstrukturer", "För att studera endast individer"], "correct": 0, "explanation": "Ingen nivå ger hela svaret. Mikro-, meso- och makroperspektiv kan kombineras för en mer fullständig bild."}];

const CONCEPT_DEFS = {
  "Socialisation": {
    lead: "Processen där individen lär sig samhällets normer, värderingar och beteenden.",
    body: "Socialisation börjar tidigt i livet och sker genom exempelvis familjen, skolan, vänner och medier. Genom socialisation lär vi oss hur vi förväntas bete oss i olika sociala sammanhang.",
    example: "Ett barn lär sig att man väntar på sin tur när andra pratar genom att se hur vuxna och andra barn beter sig och genom deras reaktioner när barnet avbryter."
  },
  "Social interaktion": {
    lead: "Kommunikation, samspel och ömsesidig påverkan mellan människor.",
    body: "När människor möts påverkar de varandras tankar, känslor och beteenden. Social interaktion kan ske både direkt, exempelvis i ett samtal, och digitalt genom sociala medier.",
    example: "När människor pratar och samarbetar. Men även när en elev kommer till skolan på dåligt humör men blir gladare efter att ha umgåtts med sina vänner. Samtidigt påverkar elevens beteende stämningen i gruppen."
  },
  "Internalisering": {
    lead: "Införlivning av andras tankar, värderingar och reaktionssätt i den egna personen.",
    body: "Genom påverkan från omgivningen kan andras uppfattningar, normer och värderingar bli en del av individens eget sätt att tänka, känna och reagera.",
    example: "Om en person ofta får höra att hen är dålig på att prata inför andra kan personen börja se sig själv som dålig på det, även om det från början var omgivningens uppfattning."
  },
  "Konformitet": {
    lead: "Anpassning av beteenden och åsikter till en grupp.",
    body: "Människor kan anpassa sig för att passa in, undvika att avvika eller därför att de tror att gruppen har rätt. Gruppens påverkan kan göra att individen agerar annorlunda än hen skulle ha gjort ensam.",
    example: "En elev tycker egentligen att gruppens förslag är dåligt men säger ändå att det är bra eftersom alla andra i gruppen verkar vara överens."
  },
  "Social konstruktion": {
    lead: "Föreställningar och betydelser som skapas gemensamt av människor i ett samhälle.",
    body: "Det vi uppfattar som självklart eller naturligt kan vara format av kultur, normer och gemensamma överenskommelser. Det är något vi människor skapar och inte något som finns naturligt. Sociala konstruktioner kan därför skilja sig mellan samhällen och förändras över tid.",
    example: "En hundralapp har nästan inget praktiskt värde som pappersbit, men kan användas för att köpa varor eftersom människor gemensamt accepterar att den har ett ekonomiskt värde."
  },
  "Social kontroll": {
    lead: "Samhällets och gruppers sätt att få människor att följa normer och regler.",
    body: "Social kontroll påverkar människors beteenden genom belöningar, reaktioner och sanktioner. Den kan vara formell genom lagar och myndigheter eller informell genom andra människor.",
    example: "En person avstår från att begå brott både eftersom det är olagligt och kan leda till straff, och eftersom vännerna tydligt tar avstånd från brott."
  },
  "Formell social kontroll": {
    lead: "Social kontroll genom lagar, myndigheter och formella regler.",
    body: "Reglerna är tydligt fastställda och kan upprätthållas av exempelvis polis, domstolar, skolor och andra organisationer. Regelbrott kan leda till formella sanktioner.",
    example: "En bilist som kör för fort kan stoppas av polisen och få böter eftersom personen har brutit mot en lag."
  },
  "Informell social kontroll": {
    lead: "Social kontroll genom oskrivna normer och andra människors reaktioner.",
    body: "Människor påverkar varandras beteenden genom exempelvis blickar, kommentarer, beröm, kritik eller risken att hamna utanför gruppen.",
    example: "En person börjar spela upp musik högt på mobilen i en tyst buss. När andra passagerare stirrar irriterat sänker personen snabbt ljudet."
  },
  "Mikrosociologi": {
    lead: "Sociologi på individnivå.",
    body: "På mikronivå undersöks mindre sociala sammanhang och hur människor påverkar varandra genom exempelvis kommunikation, relationer och vardagliga möten.",
    example: "En sociolog undersöker hur två elever påverkar varandras beteende när de arbetar tillsammans med en uppgift."
  },
  "Mesosociologi": {
    lead: "Sociologi på gruppnivå.",
    body: "På mesonivå ligger fokus mellan individen och hela samhället. Det kan exempelvis vara en skolklass, arbetsplats, förening eller organisation.",
    example: "En sociolog undersöker hur normer och grupptryck i en skolklass påverkar elevernas beteenden."
  },
  "Makrosociologi": {
    lead: "Sociologi på strukturnivå (samhällsnivå).",
    body: "På makronivå undersöks större samhällsmönster och hur exempelvis ekonomi, utbildning, lagar och politik påverkar människors livsvillkor.",
    example: "En sociolog undersöker varför ungdomsarbetslösheten är högre i vissa delar av Sverige och hur utbildningssystemet och arbetsmarknaden påverkar detta."
  }
};

const CONCEPT_QUESTIONS = [
  {q:"Ett barn lär sig under uppväxten vilka normer och beteenden som förväntas i samhället.",answer:"Socialisation"},
  {q:"Barn växer ofta upp med och lär sig den religion och de religiösa traditioner som finns i familjen.",answer:"Socialisation"},
  {q:"Genom familj, skola, vänner och medier lär sig en ungdom olika värderingar och sätt att bete sig.",answer:"Socialisation"},
  {q:"Ett barn lär sig vilket språk det ska tala och hur man förväntas uppträda i olika sociala situationer.",answer:"Socialisation"},

  {q:"Två elever diskuterar en fråga och påverkar varandras sätt att tänka.",answer:"Social interaktion"},
  {q:"En person blir på bättre humör efter att ha umgåtts med sina vänner och påverkar samtidigt stämningen i gruppen.",answer:"Social interaktion"},
  {q:"En lärare förändrar sitt sätt att undervisa efter hur eleverna reagerar under lektionen.",answer:"Social interaktion"},
  {q:"Två personer som aldrig tidigare träffats börjar prata och anpassar successivt sitt beteende efter varandra.",answer:"Social interaktion"},

  {q:"En person har fått höra att hen är dålig på matematik och börjar efter hand själv uppfatta sig som dålig på matematik.",answer:"Internalisering"},
  {q:"Föräldrar betonar under uppväxten vikten av utbildning. Som vuxen uppfattar personen själv utbildning som mycket viktigt.",answer:"Internalisering"},
  {q:"Omgivningens uppfattningar och värderingar har blivit en del av hur individen själv tänker och ser på sig själv.",answer:"Internalisering"},
  {q:"En ungdom får ofta höra att hen är ansvarstagande och börjar efter hand själv se ansvarstagande som en del av sin identitet.",answer:"Internalisering"},

  {q:"En elev håller med gruppen trots att hen egentligen tycker annorlunda.",answer:"Konformitet"},
  {q:"En ungdom börjar klä sig på samma sätt som vännerna för att passa in.",answer:"Konformitet"},
  {q:"En person skrattar åt ett skämt som hen egentligen inte tycker är roligt eftersom alla andra skrattar.",answer:"Konformitet"},
  {q:"Ingen i en grupp säger emot en populär person trots att flera egentligen anser att personen har fel.",answer:"Konformitet"},

  {q:"Pengar kan användas som betalning eftersom människor gemensamt accepterar att de har ett värde.",answer:"Social konstruktion"},
  {q:"Vad som betraktas som lämpliga kläder för män och kvinnor skiljer sig mellan olika tider och samhällen.",answer:"Social konstruktion"},
  {q:"Vad människor betraktar som ”normalt” kan förändras när samhällets normer och värderingar förändras.",answer:"Social konstruktion"},
  {q:"En titel som ”rektor” ger en person särskild status och auktoritet eftersom människor gemensamt tillskriver positionen denna betydelse.",answer:"Social konstruktion"},

  {q:"En person avstår från ett brott både på grund av risken för straff och eftersom vännerna starkt tar avstånd från brott.",answer:"Social kontroll"},
  {q:"Både lagar och människors sociala reaktioner bidrar till att normer och regler upprätthålls.",answer:"Social kontroll"},
  {q:"Människors beteenden påverkas genom både formella regler och oskrivna normer.",answer:"Social kontroll"},
  {q:"En elev följer skolans regler både för att undvika konsekvenser från skolan och för att inte få negativa reaktioner från klasskamrater.",answer:"Social kontroll"},

  {q:"En bilist får böter av polisen efter att ha kört för fort.",answer:"Formell social kontroll"},
  {q:"En domstol dömer en person till fängelse för ett brott.",answer:"Formell social kontroll"},
  {q:"En elev får en formell konsekvens efter att upprepade gånger ha brutit mot skolans ordningsregler.",answer:"Formell social kontroll"},
  {q:"Staten försöker påverka människors beteenden genom lagstiftning och straff.",answer:"Formell social kontroll"},

  {q:"En person får irriterade blickar när hen pratar högt på en tyst buss.",answer:"Informell social kontroll"},
  {q:"Vänner kritiserar en person som har brutit mot gruppens oskrivna regler.",answer:"Informell social kontroll"},
  {q:"En ungdom undviker ett visst beteende eftersom hen är rädd för att bli utfryst av kompisgruppen.",answer:"Informell social kontroll"},
  {q:"Föräldrar visar tydligt sitt ogillande när deras barn beter sig på ett sätt som de anser olämpligt.",answer:"Informell social kontroll"}
];

const LEVEL_QUESTIONS = [
  {q:"En sociolog studerar hur två personer påverkar varandra under ett samtal.",answer:"Mikronivå"},
  {q:"En sociolog undersöker hur en elev förändrar sitt beteende beroende på vem hen pratar med.",answer:"Mikronivå"},
  {q:"En sociolog studerar hur människor reagerar på varandras kroppsspråk i ett möte.",answer:"Mikronivå"},
  {q:"En sociolog undersöker samspelet mellan en lärare och en elev under ett utvecklingssamtal.",answer:"Mikronivå"},

  {q:"En sociolog undersöker hur normer i en gymnasieklass påverkar elevernas beteenden.",answer:"Mesonivå"},
  {q:"En sociolog studerar hur arbetsgrupper på en arbetsplats påverkar sina medlemmar.",answer:"Mesonivå"},
  {q:"En sociolog undersöker hur en fotbollsklubbs kultur påverkar spelarnas beteenden.",answer:"Mesonivå"},
  {q:"En sociolog studerar hur hierarkier och informella grupper fungerar inom en organisation.",answer:"Mesonivå"},

  {q:"En sociolog undersöker hur ekonomisk ojämlikhet påverkar människors livsvillkor i Sverige.",answer:"Makronivå"},
  {q:"En sociolog studerar relationen mellan länder i EU.",answer:"Makronivå"},
  {q:"En sociolog undersöker sambandet mellan arbetslöshet och brottslighet i olika delar av samhället.",answer:"Makronivå"},
  {q:"En sociolog studerar hur förändringar på arbetsmarknaden påverkar människors möjligheter till arbete i hela samhället.",answer:"Makronivå"}
];

const NON_LEVEL_CONCEPTS = ["Socialisation","Social interaktion","Internalisering","Konformitet","Social konstruktion","Social kontroll","Formell social kontroll","Informell social kontroll"];
const LEVEL_OPTIONS = ["Mikronivå","Mesonivå","Makronivå"];
