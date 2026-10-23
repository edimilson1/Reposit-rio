# MatSelect — Seleção de Materiais de Engenharia

Atividade Prática Computacional nº 03 · COENCOM0094 Introdução à Ciência dos Materiais · UNILAB · Prof. Dr. Carlos A. Cáceres · 2026.2

Programa de apoio à decisão com 80 materiais (20 metálicos, 20 poliméricos, 20 cerâmicos, 20 compósitos). O usuário escolhe 2 ou 3 propriedades, define requisitos e pesos e recebe o ranking com valores e fontes.

## Estrutura

```
matselect/
├── index.html          # estrutura da página
├── css/style.css       # estilos (tema, Game Boy, responsividade)
├── js/data.js          # banco de dados e constantes
├── js/app.js           # interface MATBOY, filtros e ranking
├── js/webgl.js         # fundo 3D com componentes eletrônicos (Three.js)
├── js/info.js          # o que é, descoberta, uso e curiosidade de cada material
├── js/gameboy3d.js     # console MATBOY em 3D (WebGL): botões clicáveis, papel e módulo animados
├── js/titulo.js        # título com lente de circuitos (200 px) ao passar o mouse
├── js/seguranca.js     # verificação de integridade SHA-256 do banco
├── img/ilustracoes/    # 80 imagens (SVG) geradas localmente, uma por material
├── img/fotos/          # coloquem aqui as fotos reais (.jpg) — têm prioridade
├── img/nomes.txt       # nome de arquivo esperado para cada material
├── data/materiais.csv  # mesmo banco em planilha (editável no Excel/Calc)
└── python/
    ├── seguranca.py    # recalcula o hash do banco e gera SRI
    ├── selecao.py      # versão em linha de comando (mesmo método)
    └── servidor.py     # servidor local opcional
```

## Como usar

- **Site:** abra `index.html` no navegador (ou rode `python python/servidor.py` e acesse http://localhost:8000). O fundo 3D precisa de internet (Three.js via CDN).
- **GitHub Pages:** envie a pasta para um repositório e ative *Settings → Pages → branch main, pasta root*.
- **Python:** `python python/selecao.py -c densidade_g_cm3:menor:3 -c resistencia_MPa:min=300:2 -c temp_max_servico_C:min=100:1`

## Método de seleção

1. **Filtragem:** remove materiais sem dado ou que violam um mínimo/máximo.
2. **Normalização:** cada propriedade vai para 0–1 (min–máx entre os candidatos), invertida quando a preferência é por valores menores.
3. **Pontuação:** média ponderada (pesos 1 a 3).
4. **Ranking:** ordenação decrescente pela pontuação.

## Atenção aos dados

Os valores são típicos de referência (Callister, Ashby, ASM, MatWeb). Antes de entregar, confirmem cada valor e troquem a fonte genérica pela referência exata (livro/página, ficha do fabricante ou registro do NIST). Para cerâmicos frágeis, a resistência pode ser de flexão.

## Alterando o banco

Edite `RAW` em `js/data.js` (formato `categoria|nome|densidade|E|resistência|k|Tmax`) e mantenha `data/materiais.csv` sincronizado.

## Imagens dos materiais

Todas as imagens ficam dentro do projeto (nada externo). Ao clicar em **Imprimir foto real** (ou START), uma impressora térmica no topo do console imprime um comprovante de papel com `img/fotos/<nome>.jpg`; se esse arquivo não existir, mostra a ilustração `img/ilustracoes/<nome>.svg`. Os nomes exatos estão em `img/nomes.txt`. Use apenas fotos próprias, de domínio público ou com licença livre, e cite a fonte no relatório.

## Segurança

- `Content-Security-Policy` no `index.html`: só carrega scripts do próprio site e do cdnjs, sem requisições de rede e sem plugins.
- O banco é congelado em memória (`Object.freeze`) e verificado com SHA-256 ao abrir a página. Depois de editar o banco, rode `python python/seguranca.py hash`.
- Criptografia em trânsito vem do HTTPS (o GitHub Pages ativa por padrão; marque *Enforce HTTPS*). Para travar também o Three.js, baixe-o para `js/vendor/`, gere o SRI com `python python/seguranca.py sri js/vendor/three.min.js` e use o atributo `integrity` na tag `<script>`.
- Um site estático não tem servidor para guardar segredos: não coloquem senhas ou chaves no código.

## Módulo de informações

O botão **MÓDULO** acopla ao console um módulo lateral (embaixo, no celular) com o que é o material, quando foi descoberto, o principal uso e uma curiosidade. Ele acompanha o material selecionado no visor. Os textos estão em `js/info.js` e devem ser conferidos e citados no relatório.

## Diâmetro da lente do título

Constante `LENS_D` no início de `js/titulo.js` (atualmente 200 px).

## Console 3D (dois dispositivos, tela cheia)

`js/gameboy3d.js` desenha dois dispositivos em 3D, cada um sozinho na tela. A rolagem leva a câmera do **gameboy** (primeiro) ao **painel de busca** (depois), como no modo 2D. O estado fica no DOM, então 2D e 3D ficam sincronizados.

- **Gameboy:** MÓDULO acopla o módulo de informações (só aparece quando solicitado). START (ver foto real) gira o console 1080° e abre por cima a tela dobrável presa atrás, com a foto de `img/fotos/<nome>.jpg` ou a ilustração. PAINEL rola até o painel.
- **Painel de busca:** fica parado mostrando os campos, o teclado e os cenários, sem tela. Ao fazer uma busca (ou ver o BANCO completo), o painel gira 1080° e abre a tela a 130°, de modo que o resultado e os botões fiquem visíveis; "✕ fechar" recolhe a tela.
- Arraste para girar, "↩ Voltar" fecha o módulo aberto ou volta ao gameboy. "Visual clássico" volta ao 2D; sem WebGL o site usa o clássico.

## Título

A lente de circuitos (`LENS_D`, 200 px, em `js/titulo.js`) não tem contorno e só existe enquanto o mouse está sobre o título; ao sair, rolar ou trocar de janela, as letras voltam ao normal.

## Teclado e travamento (painel 3D)

Com a tela do painel aberta, a página fica travada: a roda do mouse, o toque e as setas ↑↓ (PageUp/PageDown, Home/End) navegam pelos resultados. A rolagem da página só volta quando a tela é fechada (✕ fechar, Esc, "↩ Voltar" ou RESET). O teclado físico também digita nos campos de valor: números, ponto ou vírgula, "-", Backspace (apaga), Delete (limpa), Tab (troca de campo) e Enter (busca).

## Modo clássico (2D)

O painel (cartucho) mostra os resultados logo abaixo: tabela com ranking, valores, unidades, pontuação e fonte, a mensagem "Nenhum material atende" e o banco completo. Clicar numa linha seleciona o material no gameboy.
