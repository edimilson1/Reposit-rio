/* Informacoes de cada material: [o que e, descoberta, uso principal, curiosidade]. Chave = nome do arquivo de imagem. */
var INFO={
"aco-sae-1020": [
"Aço de baixo carbono (cerca de 0,2% de C): macio, dúctil e fácil de soldar e usinar.",
"Ligas de ferro e carbono são usadas há mais de 3 mil anos; o aço em escala industrial veio com o processo Bessemer (1856).",
"Chapas, perfis estruturais, eixos leves e parafusos.",
"Na designação SAE, o «20» final indica cerca de 0,20% de carbono."
],
"aco-sae-1045": [
"Aço de médio carbono (cerca de 0,45% de C), que pode ser temperado para ganhar dureza.",
"Mesma família dos aços carbono, popularizada com a siderurgia moderna a partir do século XIX.",
"Eixos, engrenagens, pinos e peças de máquinas.",
"É muito usado em eixos por equilibrar resistência e facilidade de usinagem."
],
"aco-inox-aisi-304": [
"Aço inoxidável austenítico com cerca de 18% de cromo e 8% de níquel («18/8»).",
"O aço inox foi desenvolvido por volta de 1912-1913 (Harry Brearley, em Sheffield, e Krupp, na Alemanha).",
"Pias, utensílios de cozinha, tanques para alimentos e bebidas.",
"No estado recozido é praticamente não magnético."
],
"aco-inox-aisi-316": [
"Aço inox austenítico com cerca de 2% de molibdênio, mais resistente à corrosão por cloretos.",
"Surgiu como evolução do 304, ao longo do século XX.",
"Ambientes marinhos, indústria química e instrumentos cirúrgicos e implantes.",
"É chamado de «inox marítimo» justamente pela resistência à água salgada."
],
"aco-ferramenta-aisi-d2": [
"Aço-ferramenta com cerca de 1,5% de C e 12% de Cr, muito resistente ao desgaste.",
"Desenvolvido ao longo do século XX com a evolução dos aços-ferramenta.",
"Matrizes de corte e estampagem, facas e punções.",
"Por ter 12% de cromo é considerado «quase inox»."
],
"ferro-fundido-cinzento": [
"Liga de ferro com 2 a 4% de carbono, em que o carbono forma lamelas de grafita.",
"Já era produzido na China por volta do século V a.C.",
"Blocos de motor, discos de freio, bases de máquinas e tampas de bueiro.",
"As lamelas de grafita amortecem vibrações, por isso é ótimo para bases de máquinas."
],
"aluminio-1100": [
"Alumínio comercialmente puro (99% ou mais): leve, dúctil e ótimo condutor.",
"Isolado entre 1825 e 1827 (Ørsted e Wöhler); produção barata só após o processo Hall-Héroult (1886).",
"Folhas e embalagens, utensílios, trocadores de calor.",
"No século XIX era mais caro que o ouro."
],
"aluminio-6061-t6": [
"Liga Al-Mg-Si endurecida por tratamento térmico (têmpera T6).",
"Desenvolvida na década de 1930.",
"Estruturas, quadros de bicicleta, perfis e peças usinadas.",
"É uma das ligas de alumínio mais versáteis e comuns do mercado."
],
"aluminio-7075-t6": [
"Liga Al-Zn-Mg-Cu de altíssima resistência entre as ligas de alumínio.",
"Criada no Japão nos anos 1930 e logo aplicada na aviação.",
"Estruturas de aeronaves e equipamentos esportivos.",
"Tem resistência próxima à de alguns aços com cerca de um terço da densidade."
],
"cobre-puro-c11000": [
"Cobre praticamente puro: ótimo condutor elétrico e térmico e fácil de conformar.",
"Trabalhado há cerca de 10 mil anos, um dos primeiros metais usados pela humanidade.",
"Fios e cabos elétricos, tubulações e trocadores de calor.",
"Só a prata conduz melhor eletricidade entre os metais."
],
"latao-70-30": [
"Liga de cobre com cerca de 30% de zinco: dourada, usinável e resistente à corrosão.",
"Usada desde a Antiguidade; os romanos já a produziam.",
"Instrumentos musicais, torneiras, conexões e cartuchos de munição.",
"Essa composição é conhecida como «latão de cartucho»."
],
"bronze-fosforoso": [
"Liga de cobre e estanho com pequena adição de fósforo, boa para suportar fadiga e desgaste.",
"O bronze dá nome à Idade do Bronze (cerca de 3300 a.C.); a versão com fósforo é do século XIX.",
"Molas, buchas, mancais e cordas de instrumentos.",
"O fósforo atua como desoxidante e melhora a resistência ao desgaste."
],
"titanio-ti-6al-4v": [
"Liga de titânio com 6% de alumínio e 4% de vanádio, a mais usada do mundo.",
"Titânio descoberto em 1791 (Gregor); a liga Ti-6Al-4V foi desenvolvida nos anos 1950.",
"Aeronaves, motores, implantes ortopédicos e odontológicos.",
"Combina alta resistência, baixa densidade e biocompatibilidade."
],
"titanio-cp-grau-2": [
"Titânio comercialmente puro, de boa conformabilidade e excelente resistência à corrosão.",
"O elemento foi descoberto em 1791, mas só virou metal industrial com o processo Kroll nos anos 1930-40.",
"Trocadores de calor, indústria química e implantes dentários.",
"Forma sozinho uma camada fina de óxido que o protege."
],
"magnesio-az31b": [
"Liga de magnésio com cerca de 3% de alumínio e 1% de zinco.",
"O magnésio foi isolado por Humphry Davy em 1808.",
"Peças leves de aviação, carcaças eletrônicas e automotivas.",
"O magnésio é o metal estrutural mais leve."
],
"niquel-200": [
"Níquel com pelo menos 99% de pureza, resistente a álcalis e a altas temperaturas.",
"O níquel foi isolado por Cronstedt em 1751.",
"Equipamentos químicos, eletrodos e componentes de baterias.",
"O nome vem do alemão «Kupfernickel», minério que enganava mineiros em busca de cobre."
],
"inconel-718": [
"Superliga de níquel, cromo e nióbio que mantém resistência em altas temperaturas.",
"Desenvolvida nas décadas de 1950-60.",
"Turbinas a gás, motores de foguete e reatores.",
"Resiste bem a temperaturas na faixa de 700 °C, onde aços comuns amolecem."
],
"zinco-puro": [
"Zinco puro, metal azulado, quebradiço à temperatura ambiente e fácil de fundir.",
"Era conhecido na Índia e China na Antiguidade; produção sistemática na Europa no século XVIII.",
"Galvanização do aço, pilhas e ligas (latão, zamac).",
"Protege o aço corroendo no lugar dele (proteção sacrificial)."
],
"chumbo-puro": [
"Chumbo puro: metal denso, macio e muito resistente à corrosão.",
"Usado desde a Antiguidade; os romanos o empregavam em encanamentos.",
"Baterias chumbo-ácido e blindagem contra radiação.",
"O símbolo Pb vem do latim «plumbum»."
],
"tungstenio": [
"Metal de transição denso, duro e de altíssimo ponto de fusão.",
"Isolado em 1783 pelos irmãos Fausto e Juan José Elhuyar, na Espanha.",
"Filamentos, eletrodos de solda, ferramentas e contrapesos.",
"Tem o maior ponto de fusão entre os metais, cerca de 3422 °C."
],
"pe-ld": [
"Polietileno de baixa densidade: flexível, leve e transparente.",
"Sintetizado em 1933 nos laboratórios da ICI, na Inglaterra, quase por acidente.",
"Sacolas, filmes plásticos e embalagens flexíveis.",
"Seu primeiro uso importante foi isolar cabos de radar na Segunda Guerra."
],
"pe-hd": [
"Polietileno de alta densidade: mais rígido e resistente que o PE-LD.",
"Desenvolvido nos anos 1950 (processos de Ziegler e Phillips).",
"Garrafas de leite, tubos, tambores e caixas d'água.",
"Karl Ziegler e Giulio Natta dividiram o Nobel de Química de 1963."
],
"polipropileno-pp": [
"Polipropileno: termoplástico leve, com boa resistência química e à fadiga.",
"Obtido por Giulio Natta em 1954 e produzido em escala a partir de 1957.",
"Embalagens, peças automotivas, seringas e tampas.",
"As tampas com «dobradiça viva» suportam milhares de dobras sem romper."
],
"pvc-rigido": [
"Policloreto de vinila rígido: barato, durável e resistente a produtos químicos.",
"Observado em 1835 e 1872; uso comercial a partir das décadas de 1920-30.",
"Tubos de água e esgoto, esquadrias e isolamento de cabos.",
"É um dos plásticos mais produzidos do mundo."
],
"poliestireno-ps": [
"Poliestireno: plástico transparente e rígido, porém quebradiço.",
"Isolado em 1839; produção industrial nos anos 1930.",
"Copos e talheres descartáveis, caixas de CD e embalagens.",
"O isopor é poliestireno expandido."
],
"pmma-acrilico": [
"Polimetilmetacrilato (acrílico): transparente, rígido e resistente ao tempo.",
"Sintetizado nos anos 1930 e lançado como Plexiglas em 1933.",
"Vitrines, aquários, lentes e painéis luminosos.",
"Foi usado em cabines de aviões na Segunda Guerra."
],
"policarbonato-pc": [
"Policarbonato: transparente e com altíssima resistência ao impacto.",
"Descoberto em 1953, de forma independente, na Bayer e na General Electric.",
"CDs e DVDs, lentes de óculos, faróis e capacetes.",
"Camadas de policarbonato fazem parte de vidros à prova de bala."
],
"abs": [
"Acrilonitrila-butadieno-estireno: tenaz, fácil de moldar e de acabamento liso.",
"Desenvolvido entre os anos 1940 e 50.",
"Carcaças de eletrônicos, teclados e peças automotivas.",
"Os tijolinhos de LEGO são feitos de ABS desde 1963."
],
"nylon-6-6-pa66": [
"Poliamida 6,6: resistente ao desgaste, com boa resistência mecânica e ao calor.",
"Criado por Wallace Carothers na DuPont em 1935 e lançado comercialmente em 1938-39.",
"Engrenagens, fibras têxteis, cordas e componentes técnicos.",
"As primeiras meias de nylon (1940) causaram filas e tumultos nas lojas."
],
"nylon-6-pa6": [
"Poliamida 6: semelhante ao nylon 6,6, com melhor acabamento e processamento mais fácil.",
"Desenvolvida por Paul Schlack na IG Farben em 1938.",
"Fibras, tecidos, linhas de pesca e peças técnicas.",
"Foi a alternativa alemã ao nylon 6,6, que era patenteado pela DuPont."
],
"pet": [
"Politereftalato de etileno: forte, leve e barreira ao gás.",
"Patenteado em 1941 (Whinfield e Dickson); garrafas PET surgiram nos anos 1970.",
"Garrafas de bebidas, fibras de poliéster e embalagens.",
"Garrafas recicladas viram fibras de roupas e carpetes."
],
"ptfe-teflon": [
"Politetrafluoretileno (Teflon): quimicamente inerte e com um dos menores atritos conhecidos.",
"Descoberto por acaso por Roy Plunkett na DuPont em 1938.",
"Revestimento antiaderente, vedações e isolamento elétrico.",
"Quase nenhum líquido ou produto químico comum o ataca."
],
"pom-acetal": [
"Poliacetal: rígido, com baixo atrito e excelente estabilidade dimensional.",
"Desenvolvido pela DuPont (Delrin) nos anos 1950.",
"Engrenagens, zíperes, travas e peças de precisão.",
"É muito usado onde se precisa de peças plásticas que deslizem bem."
],
"peek": [
"Poliéter-éter-cetona: termoplástico de alto desempenho, resistente a calor e químicos.",
"Desenvolvido pela ICI no fim dos anos 1970.",
"Implantes de coluna, aeroespacial, vedações e semicondutores.",
"Sua rigidez é mais próxima à do osso do que a dos metais."
],
"poliimida-kapton": [
"Poliimida em filme, mantém propriedades de -270 °C a cerca de 400 °C.",
"Desenvolvida pela DuPont nos anos 1960.",
"Circuitos flexíveis, isolamento elétrico e satélites.",
"A película dourada de naves espaciais é Kapton metalizado."
],
"poliuretano-termoplastico": [
"Elastômero termoplástico: borracha flexível que se processa como plástico.",
"Desenvolvido nos anos 1950.",
"Solados, capas de celular, mangueiras e filamentos flexíveis de impressão 3D.",
"Une a elasticidade da borracha com a facilidade de moldagem do plástico."
],
"epoxi-curado": [
"Resina termofixa que endurece por reação química e adere muito bem.",
"Desenvolvida no fim dos anos 1930 e início dos 1940 (Castan e Greenlee).",
"Adesivos, tintas, encapsulamento eletrônico e matriz de compósitos.",
"Os adesivos de duas partes funcionam misturando resina e endurecedor."
],
"fenolica-baquelite": [
"Resina fenólica: termofixa, rígida e resistente ao calor e à eletricidade.",
"Leo Baekeland a criou em 1907, o primeiro plástico totalmente sintético.",
"Cabos de panelas, placas isolantes e peças elétricas antigas.",
"O nome «baquelite» vem do sobrenome do inventor."
],
"silicone-elastomero": [
"Elastômero de silício e oxigênio, flexível numa faixa enorme de temperatura.",
"Estudado por Frederic Kipping no início do século XX e industrializado nos anos 1940.",
"Vedações, utensílios de cozinha, implantes e moldes.",
"Sua cadeia é de silício e oxigênio, diferente dos polímeros de carbono."
],
"pps": [
"Polissulfeto de fenileno: estável quimicamente e a altas temperaturas.",
"Desenvolvido pela Phillips Petroleum e comercializado nos anos 1970.",
"Componentes elétricos, peças automotivas e filtros industriais.",
"Resiste naturalmente ao fogo, sem precisar de aditivos."
],
"alumina-al2o3-99-5": [
"Óxido de alumínio (Al2O3), duro, isolante e estável em altas temperaturas.",
"Safira e rubi (alumina cristalina) são conhecidas há milênios; a alumina técnica é do século XX.",
"Isolantes de velas de ignição, próteses de quadril e ferramentas de corte.",
"Safira e rubi são alumina cristalina, diferenciadas só pelas impurezas."
],
"zirconia-y-tzp": [
"Óxido de zircônio estabilizado com ítria, cerâmica de alta tenacidade.",
"O zircônio foi isolado por Berzelius em 1824; a tenacificação por transformação foi descrita em 1975.",
"Coroas dentárias, facas cerâmicas e sensores de oxigênio.",
"Em 1975 foi apelidada de «aço cerâmico» pela sua tenacidade."
],
"carbeto-de-silicio-sic": [
"Carbeto de silício: muito duro, condutor de calor e resistente ao desgaste.",
"Sintetizado por Edward Acheson em 1891 (carborundum).",
"Abrasivos, freios cerâmicos, fornos e eletrônica de potência.",
"Acheson tentava fabricar diamantes quando o descobriu."
],
"nitreto-de-silicio-si3n4": [
"Nitreto de silício: forte, tenaz e resistente a choque térmico.",
"Sintetizado em 1857; desenvolvido para motores a partir dos anos 1950-60.",
"Rolamentos de alta rotação, turbocompressores e ferramentas.",
"Rolamentos de Si3N4 pesam menos e giram a rotações maiores que os de aço."
],
"nitreto-de-aluminio-aln": [
"Nitreto de alumínio: isolante elétrico com alta condutividade térmica.",
"Sintetizado pela primeira vez em 1862.",
"Substratos eletrônicos e dissipadores de calor.",
"Conduz calor como um metal, mas não conduz eletricidade."
],
"carbeto-de-boro-b4c": [
"Carbeto de boro: um dos materiais mais duros que se conhece.",
"Identificado no século XIX e produzido industrialmente no século XX.",
"Blindagem balística, barras de controle nuclear e abrasivos.",
"Só o diamante e o nitreto cúbico de boro são mais duros."
],
"magnesia-mgo": [
"Óxido de magnésio (MgO): refratário com ponto de fusão em torno de 2800 °C.",
"A magnésia é conhecida desde a Antiguidade; o magnésio foi isolado em 1808.",
"Revestimentos de fornos siderúrgicos e isolamento de cabos aquecedores.",
"Tem alta condutividade térmica para um óxido isolante."
],
"silica-fundida": [
"Vidro de sílica pura (SiO2), com expansão térmica muito baixa.",
"Fundido de quartzo e desenvolvido industrialmente no início do século XX.",
"Fibras ópticas, cadinhos e óptica de precisão.",
"Pode ir da chama ao gelo sem trincar."
],
"vidro-soda-cal": [
"Vidro comum: sílica, soda e cal.",
"O vidro é fabricado há cerca de 3500 anos (Mesopotâmia e Egito).",
"Janelas, garrafas e copos.",
"Responde pela imensa maioria do vidro produzido no mundo."
],
"vidro-borossilicato": [
"Vidro com cerca de 13% de óxido de boro, de baixa expansão térmica.",
"Otto Schott o desenvolveu nos anos 1880; o Pyrex foi lançado pela Corning em 1915.",
"Vidraria de laboratório e formas de cozinha.",
"Resiste bem a mudanças bruscas de temperatura."
],
"porcelana": [
"Cerâmica branca e vitrificada, feita de caulim, feldspato e quartzo.",
"Surgiu na China entre os séculos VII e X.",
"Louças, isoladores elétricos e sanitários.",
"Os europeus só a reproduziram em 1708-09 (Böttger, Meissen)."
],
"mulita": [
"Silicato de alumínio (3Al2O3·2SiO2), estável em altas temperaturas.",
"Identificada em 1924 na Ilha de Mull, na Escócia.",
"Refratários e componentes de fornos.",
"O nome vem da Ilha de Mull."
],
"cordierita": [
"Aluminossilicato de magnésio com muito baixa expansão térmica.",
"Mineral nomeado em 1813 em homenagem ao geólogo francês Pierre Cordier.",
"Suporte de catalisadores automotivos e placas de forno.",
"Resiste a choque térmico por quase não dilatar."
],
"oxido-de-berilio-beo": [
"Óxido de berílio: isolante elétrico com condutividade térmica de metal.",
"O berílio foi descoberto em 1798 por Vauquelin.",
"Substratos eletrônicos e janelas de micro-ondas.",
"Seu pó é tóxico e exige cuidados especiais no processamento."
],
"titania-tio2": [
"Dióxido de titânio: óxido branco, estável e refletor de luz.",
"O titânio foi descoberto em 1791; o pigmento branco industrial veio no início do século XX.",
"Pigmento de tintas, protetor solar e fotocatálise.",
"É o pigmento branco mais usado no mundo."
],
"espinelio-mgal2o4": [
"Aluminato de magnésio (MgAl2O4), cerâmica dura e que pode ser transparente.",
"O mineral é conhecido há séculos como pedra preciosa.",
"Janelas transparentes e blindagens ópticas e joias.",
"O «Rubi do Príncipe Negro» da coroa britânica é um espinélio."
],
"vitroceramica": [
"Material que parte do vidro e cristaliza de forma controlada, quase sem dilatar.",
"Descoberta por S. Donald Stookey, na Corning, nos anos 1950.",
"Cooktops, espelhos de telescópio e panelas.",
"Stookey a descobriu ao superaquecer um forno por acidente."
],
"itria-y2o3": [
"Óxido de ítrio (Y2O3), cerâmica refratária e branca.",
"Isolado em 1794 por Johan Gadolin, a partir de um mineral de Ytterby, na Suécia.",
"Estabilizante de zircônia, lasers YAG e revestimentos térmicos.",
"Ytterby deu nome a quatro elementos: ítrio, itérbio, térbio e érbio."
],
"nitreto-de-boro-hexagonal": [
"Nitreto de boro com estrutura em camadas semelhante à do grafite.",
"Sintetizado no século XIX.",
"Lubrificante a seco, cosméticos e isolantes térmicos.",
"É chamado de «grafite branco»."
],
"refratario-de-chamote": [
"Argila refratária queimada e moída, usada como carga em refratários.",
"Argilas refratárias são trabalhadas há milênios.",
"Revestimento de fornos, lareiras e cadinhos.",
"Mistura-se chamote à argila crua para reduzir a retração na queima."
],
"cfrp-unidirecional-epoxi": [
"Fibras de carbono alinhadas em matriz de epóxi: muito rígido e leve.",
"Fibras de carbono de alto desempenho surgiram nos anos 1950-60.",
"Aeronaves, carros de Fórmula 1 e bicicletas.",
"O Boeing 787 tem cerca de 50% de seu peso em compósitos."
],
"cfrp-tecido-epoxi": [
"Fibras de carbono tecidas em epóxi: boa resistência em várias direções.",
"Evolução do CFRP unidirecional a partir dos anos 1960-70.",
"Painéis, capôs, quadros de bicicleta e acabamentos esportivos.",
"O padrão quadriculado visível é a trama do tecido de carbono."
],
"gfrp-unidirecional": [
"Fibras de vidro alinhadas em resina: resistente, barato e isolante elétrico.",
"A fibra de vidro comercial surgiu nos anos 1930.",
"Pás eólicas, tanques e cascos de barcos.",
"O Chevrolet Corvette de 1953 teve carroceria de fibra de vidro."
],
"gfrp-manta": [
"Fibras de vidro curtas em manta aleatória, com resina de poliéster.",
"Industrializada a partir dos anos 1940.",
"Cascos de barcos, banheiras e telhas translúcidas.",
"É a forma mais barata e comum de fibra de vidro."
],
"aramida-epoxi-kevlar": [
"Fibras de aramida (Kevlar) com resina epóxi: leve e muito tenaz.",
"O Kevlar foi inventado por Stephanie Kwolek, na DuPont, em 1965.",
"Coletes balísticos, capacetes e cordas.",
"É cerca de cinco vezes mais resistente que o aço, em peso."
],
"carbono-peek": [
"Fibras de carbono em matriz termoplástica de PEEK.",
"O PEEK surgiu em 1978; compósitos com carbono nos anos 1980.",
"Aeroespacial, implantes e peças de alto desempenho.",
"Pode ser soldado e reprocessado, ao contrário dos epóxis."
],
"carbono-carbono": [
"Carbono reforçado com carbono: mantém resistência acima de 2000 °C.",
"Desenvolvido a partir dos anos 1950-60.",
"Bicos de foguete, freios de aviões e de Fórmula 1.",
"O nariz e as bordas das asas do ônibus espacial eram feitos desse tipo de material."
],
"al-sic-20-mmc": [
"Alumínio reforçado com partículas de carbeto de silício (20%).",
"Compósitos de matriz metálica vêm sendo desenvolvidos desde os anos 1960.",
"Dissipadores de calor, discos de freio e peças aeroespaciais.",
"Une a leveza do alumínio com a rigidez da cerâmica."
],
"al-sic-40-mmc": [
"Alumínio com 40% de SiC: ainda mais rígido e de baixa expansão térmica.",
"Evolução dos compósitos Al-SiC nos anos 1980-90.",
"Embalagens eletrônicas e estruturas de precisão.",
"Sua expansão térmica é parecida com a de chips, o que evita falhas."
],
"wc-co-metal-duro": [
"Metal duro: partículas de carbeto de tungstênio ligadas por cobalto.",
"Inventado por Karl Schröter, na Alemanha, por volta de 1923.",
"Ferramentas de corte, brocas de mineração e matrizes.",
"A marca «Widia» vem de «wie Diamant» (como diamante)."
],
"concreto-convencional": [
"Mistura de cimento, areia, brita e água.",
"Os romanos já usavam concreto; o cimento Portland foi patenteado em 1824.",
"Prédios, pontes, barragens e pavimentos.",
"É frequentemente citado como o material mais consumido do mundo depois da água."
],
"concreto-uhpc": [
"Concreto de ultra-alto desempenho, com fibras e partículas muito finas.",
"Desenvolvido nos anos 1990, na França.",
"Pontes, painéis finos e reparos estruturais.",
"Pode superar 150 MPa de resistência à compressão."
],
"madeira-de-pinus": [
"Madeira de coníferas: leve, de crescimento rápido e boa relação resistência/peso.",
"O uso da madeira é pré-histórico.",
"Construção, móveis e celulose.",
"É um compósito natural: fibras de celulose numa matriz de lignina."
],
"compensado": [
"Chapa de lâminas de madeira coladas com fibras cruzadas.",
"A laminação cruzada é antiga; a produção industrial se consolidou no século XIX.",
"Móveis, fôrmas de concreto e aeromodelos.",
"As camadas cruzadas a 90° reduzem o empenamento."
],
"mdf": [
"Fibras de madeira prensadas com resina.",
"Desenvolvido nos anos 1960.",
"Móveis, painéis e acabamentos de interiores.",
"Ao contrário do compensado, não tem direção de fibras definida."
],
"glare-al-vidro": [
"Laminado híbrido de camadas de alumínio e fibra de vidro.",
"Desenvolvido na Universidade de Delft (Holanda) nos anos 1980.",
"Fuselagem do Airbus A380.",
"Resiste muito bem à propagação de trincas por fadiga."
],
"borracha-com-negro-de-fumo": [
"Borracha vulcanizada reforçada com negro de fumo.",
"A vulcanização é de Goodyear (1839); o negro de fumo como reforço, do início do século XX.",
"Pneus, correias e vedações.",
"O negro de fumo é o que deixa os pneus pretos e mais duráveis."
],
"pa66-30-fibra-de-vidro": [
"Poliamida 6,6 reforçada com 30% de fibra de vidro.",
"Reforço com fibra de vidro popularizado nos anos 1950-60.",
"Peças sob o capô, ferramentas elétricas e conexões.",
"A fibra de vidro aumenta bastante a rigidez e a resistência ao calor."
],
"pp-30-fibra-de-vidro": [
"Polipropileno reforçado com 30% de fibra de vidro.",
"Difundido a partir dos anos 1970.",
"Painéis automotivos e carcaças de eletrodomésticos.",
"Barateia peças que antes eram de metal."
],
"peek-30-fibra-de-carbono": [
"PEEK com 30% de fibra de carbono: muito resistente, rígido e com baixo desgaste.",
"Evolução do PEEK (1978) com reforço de carbono.",
"Implantes, aeroespacial e equipamentos de semicondutores.",
"É radiotransparente, por isso é bom para implantes que precisam de exames de imagem."
]
};
