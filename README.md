# 🗡️ The Legend of Zelda: A* Pathfinding Simulator

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6.22.3-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Grid_%26_Flexbox-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📖 Descrição

O **The Legend of Zelda: A* Pathfinding Simulator** é uma aplicação web interativa desenvolvida em React que simula o deslocamento inteligente e autônomo do herói **Link** pelo reino de Hyrule e por suas masmorras (*Dungeons*), utilizando o algoritmo de busca heurística **A* (A-Star)**.

Inspirado no clássico *The Legend of Zelda: A Link to the Past*, o mapa de Hyrule é modelado como uma grade matricial bidimensional de **42x42** células, onde cada bioma (planícies, areia, florestas densas, montanhas e rios) possui um peso/custo de travessia específico. As masmorras são representadas em matrizes de **28x28** células contendo corredores navegáveis e obstáculos intransponíveis (paredes).

A missão de Link é partir de sua casa, localizar e explorar as três masmorras do reino na ordem mais eficiente para resgatar os três **Pingentes da Virtude** (Pingente da Coragem, do Poder e da Sabedoria) e, finalmente, adentrar a floresta misteriosa (*Lost Woods*) para empunhar a lendária **Master Sword**, tudo isso minimizando o custo total de deslocamento acumulado.

---

## 🎯 Propósito

O propósito da aplicação é unir conceitos teóricos de **Inteligência Artificial**, **Teoria dos Grafos** e **Estruturas de Dados** a uma experiência visual lúdica e gamificada. O projeto demonstra na prática como o algoritmo A* toma decisões de rota com base em custos reais de terreno e funções heurísticas, além de ilustrar o uso de filas de prioridade binárias (*Binary Heap*) para otimização de performance em interfaces dinâmicas com React.

---

## 🏆 Objetivo

- **Cálculo da Rota Ótima**: Calcular e traçar dinamicamente o menor caminho em termos de custo acumulado entre a posição atual de Link e seu próximo objetivo.
- **Seleção Gulosa do Próximo Alvo**: Determinar automaticamente a entrada de masmorra não visitada mais próxima de Link utilizando distância euclidiana.
- **Simulação Passo a Passo**: Animar a movimentação de Link célula a célula (em intervalos de 200ms), fornecendo feedback visual do trajeto percorrido e da posição atual.
- **Fluxo Completo de Exploração**:
  1. Deslocamento por Hyrule até a entrada da dungeon mais próxima;
  2. Entrada na dungeon e cálculo da rota até o Pingente da Virtude;
  3. Obtenção do item e cálculo da rota de retorno até a saída da dungeon;
  4. Retorno ao mapa principal de Hyrule com atualização de inventário e custos;
  5. Conquista da Master Sword em Lost Woods após visitar as três dungeons.
- **Contabilização Transparente de Métricas**: Manter um registro em tempo real do custo acumulado de movimentação e do inventário de itens obtidos.

---

## 👥 Público-alvo

- **Estudantes de Ciência da Computação, Engenharia de Software e IA**: Que buscam compreender o funcionamento visual do algoritmo A*, filas de prioridade e representação matricial de grafos.
- **Desenvolvedores Web / Front-End**: Interessados em gerenciamento de estado global com React Context API, controle de rotas com React Router DOM v6 e sincronização de animações temporais em grids CSS.
- **Fãs de Jogos Retrô e Game Dev**: Entusiastas que apreciam o universo de The Legend of Zelda e desejam entender algoritmos de *pathfinding* aplicados a jogos 2D.

---

## ⚙️ Requisitos Funcionais

- **[RF01] Renderização do Mapa de Hyrule**: Exibir uma grade 42x42 com representação visual de terrenos de diferentes pesos, casa do Link, entradas de cavernas e a clareira da Master Sword.
- **[RF02] Renderização das Dungeons**: Exibir três mapas distintos de dungeons (28x28) com corredores transitáveis, paredes bloqueadas e o item objetivo.
- **[RF03] Algoritmo de Busca A***: Executar a busca A* avaliando $f(n) = g(n) + h(n)$, onde $g(n)$ é o custo real acumulado do terreno e $h(n)$ é a heurística de distância de Manhattan até o destino.
- **[RF04] Identificação da Entrada Mais Próxima**: Calcular a distância euclidiana entre a posição atual de Link e as entradas de dungeons ainda não visitadas, definindo o próximo destino automaticamente.
- **[RF05] Animação de Percurso**: Animar Link transitando pelo caminho calculado célula a célula a cada 200ms, atualizando as classes visuais de células visitadas e foco atual.
- **[RF06] Navegação entre Rotas SPA**: Permitir transição fluida entre a rota do mapa de Hyrule (`/`) e as três masmorras (`/dungeon_1`, `/dungeon_2`, `/dungeon_3`) sem recarregar a página.
- **[RF07] Controle de Ciclo da Masmorra**:
  - Ação **Percorrer Mapa**: traça o caminho da entrada da dungeon até o pingente;
  - Ação **Voltar para Entrada**: traça o caminho do pingente de volta ao portal de saída;
  - Ação **Sair da Dungeon**: retorna ao mapa de Hyrule marcando a dungeon como concluída.
- **[RF08] Acumulação e Persistência do Custo Global**: Somar os custos dos terrenos percorridos em Hyrule e nas masmorras por meio do contexto `CustoCaminhoContext`.
- **[RF09] Painel de Resultados Lateral**: Exibir o valor numérico do custo total e a lista gráfica dos itens obtidos (Pingentes Azul, Verde, Vermelho e Master Sword).
- **[RF10] Condição de Vitória (Fim de Jogo)**: Quando as três masmorras tiverem sido concluídas, redirecionar o objetivo em Hyrule para a entrada de Lost Woods (`x: 6, y: 5`), conceder a Master Sword e finalizar a jornada.

---

## 🛡️ Requisitos Não Funcionais

- **[RNF01] Desempenho e Eficiência**: A busca de caminho deve operar de forma quase instantânea ($< 50\text{ ms}$) em grades de até 42x42 nós, valendo-se da estrutura `BinaryHeap` com operações de inserção e remoção em $O(\log N)$.
- **[RNF02] Usabilidade e Feedback Imediato**: A interface apresenta botões com estados claros de clique e cores contrastantes para cada tipo de bioma, posição do Link e histórico de passos.
- **[RNF03] Fidelidade Estética e Temática**: Utilização de fontes temáticas personalizadas (`HYLIA SERIF`, `REGGAE ONE`, `TRIFORCE`) e sprites em pixel art originais de itens, personagens e cenários.
- **[RNF04] Modularidade e Separação de Conceitos**: Separação estrita entre a camada de apresentação (componentes e rotas), dados estáticos dos grids (`src/data`), utilitários matemáticos e algorítmicos (`src/utils`) e estado global (`src/context`).
- **[RNF05] Compatibilidade Cross-Browser**: Compatível com as versões recentes dos principais navegadores (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **React 18.2.0** | Biblioteca base para construção de componentes declarativos e gerenciamento de ciclo de vida com Hooks (`useState`, `useEffect`, `useContext`). |
| **React Router DOM 6.22.3** | Gerenciamento de rotas do lado do cliente (SPA) via `createBrowserRouter` e `RouterProvider`. |
| **React Context API** | Compartilhamento e persistência de estados globais (`StartEndNodesContext` e `CustoCaminhoContext`). |
| **JavaScript (ES6+)** | Lógica de grafos, nós (`GridNode`), fila de prioridade binária (`BinaryHeap`) e algoritmo A*. |
| **CSS3 (Grid & Flexbox)** | Renderização das matrizes bidimensionais de 42x42 e 28x28 células, estilização temática e sprites pixel art. |
| **Fontes Personalizadas** | `@font-face` com tipografias inspiradas na franquia: *Hylia Serif*, *Reggae One* e *Triforce*. |

---

## 🗺️ Tabela de Custos e Terrenos

### Mapa de Hyrule (42 x 42)

| Valor | Terreno / Elemento | Custo de Movimento | Representação Visual |
|:---:|:---|:---:|:---|
| `10` | Grama / Planície | 10 | Verde claro (`#92D050`) |
| `20` | Caminho de Areia / Deserto | 20 | Bege claro (`#C4BC96`) |
| `100` | Floresta / Mata Fechada | 100 | Verde escuro (`#00B050`) |
| `150` | Montanha / Terreno Rochoso | 150 | Marrom acinzentado (`#948A54`) |
| `180` | Água / Rios | 180 | Azul (`#548DD4`) |
| `0` | Entradas das Dungeons | 0 | Ícone de caverna |
| `1` | Casa do Link (Ponto de Partida: `[24, 27]`) | - | Ícone da cabana |
| `2` | Entrada de Lost Woods (`[6, 5]`) | - | Ícone de árvores místicas |
| `3` | Local da Master Sword (`[2, 1]`) | - | Ícone da Master Sword |

### Dungeons (28 x 28)

| Valor | Elemento | Custo de Movimento | Bloqueio | Representação Visual |
|:---:|:---|:---:|:---:|:---|
| `10` | Piso da Masmorra | 10 | Não | Branco (`#FFFFFF`) |
| `99` | Parede da Masmorra | 99 | **Sim (`isWall()`)** | Cinza escuro (`#888887`) |
| `0` | Portal de Entrada / Saída | 0 | Não | Ícone de portal |
| `1` | Pingente da Virtude (Objetivo) | 1 | Não | Sprite do Pingente (Azul / Verde / Vermelho) |

---

## 🧠 Como Funciona o Algoritmo A*

O algoritmo A* implementado em [`src/utils/aStar.js`](src/utils/aStar.js) opera sobre uma representação de grafo matricial construído por [`src/utils/Graph.js`](src/utils/Graph.js), explorando os vizinhos ortogonais (norte, sul, leste, oeste):

$$f(n) = g(n) + h(n)$$

1. **$g(n)$ (Custo Real)**: Custo acumulado do nó inicial até o nó $n$, somando o peso individual de cada célula percorrida (`node.weight`).
2. **$h(n)$ (Heurística)**: Estimativa de menor distância até o destino. No projeto, utiliza-se por padrão a **Distância de Manhattan**:
   $$h(n) = |x_{\text{destino}} - x_n| + |y_{\text{destino}} - y_n|$$
3. **Fila de Prioridade (`BinaryHeap`)**: Os nós a serem avaliados são mantidos em uma árvore heap binária ordenada por $f(n)$, garantindo que o nó mais promissor seja sempre expandido primeiro com complexidade $O(\log N)$.
4. **Tratamento de Paredes**: Células com peso `99` são identificadas pelo método `isWall()` e ignoradas na expansão de vizinhos.

---

## 📂 Estrutura do Projeto

```bash
legend_of_zelda_a_star_react/
├── public/                                # Assets públicos e imagens
│   ├── favicon.ico
│   ├── img-entrada-dungeon.png            # Sprite da entrada de dungeon
│   ├── img-entrada-lost-woods.png         # Sprite de entrada dos Lost Woods
│   ├── img-link.png                       # Sprite de Link
│   ├── img-links-house.png                # Sprite da casa de Link
│   ├── img-master-sword.png               # Sprite da Master Sword
│   ├── img-pingente-azul.png              # Pingente Dungeon 1
│   ├── img-pingente-verde.png             # Pingente Dungeon 2
│   ├── img-pingente-vermelho.png          # Pingente Dungeon 3
│   ├── index.html                         # HTML template da SPA
│   ├── master-sword.png                   # Ícone para o painel de resultados
│   ├── pendant-blue.png                   # Ícone do pingente azul para o painel
│   ├── pendant-green.png                  # Ícone do pingente verde para o painel
│   └── pendant-red.png                    # Ícone do pingente vermelho para o painel
├── src/
│   ├── assets/                            # Fontes personalizadas da franquia Zelda
│   │   ├── fonts/
│   │   │   ├── HyliaSerifBeta-Regular.otf
│   │   │   ├── ReggaeOne-Regular.ttf
│   │   │   └── Triforce.ttf
│   │   └── fonts.css
│   ├── components/                        # Componentes reutilizáveis
│   │   └── Resultados.js                  # Painel lateral com custo e inventário
│   ├── context/                           # Gerenciamento de Estado Global
│   │   ├── CustoCaminhoContext.js         # Contexto do custo acumulado
│   │   └── StartEndNodesContext.js        # Contexto das coordenadas de início e fim
│   ├── data/                              # Matrizes dos mapas
│   │   ├── GridHyrule.js                  # Matriz 42x42 do Reino de Hyrule
│   │   ├── GridMapaDungeon1.js            # Matriz 28x28 da Dungeon #1
│   │   ├── GridMapaDungeon2.js            # Matriz 28x28 da Dungeon #2
│   │   └── GridMapaDungeon3.js            # Matriz 28x28 da Dungeon #3
│   ├── routes/                            # Páginas / Rotas da Aplicação
│   │   ├── Dungeon1.js                    # Rota e lógica da Dungeon #1
│   │   ├── Dungeon2.js                    # Rota e lógica da Dungeon #2
│   │   ├── Dungeon3.js                    # Rota e lógica da Dungeon #3
│   │   └── Hyrule.js                      # Rota principal do mapa de Hyrule
│   ├── styles/                            # Estilizações modulares
│   │   ├── MenuAcoes.css                  # Estilos do menu lateral de botões
│   │   └── PainelResultados.css           # Estilos do painel de itens e métricas
│   ├── utils/                             # Algoritmos e funções auxiliares
│   │   ├── aStar.js                       # Implementação do A* e BinaryHeap
│   │   ├── AtribuirClassNameDungeon1.js   # Mapeamento de classes CSS da Dungeon 1
│   │   ├── AtribuirClassNameDungeon2.js   # Mapeamento de classes CSS da Dungeon 2
│   │   ├── AtribuirClassNameDungeon3.js   # Mapeamento de classes CSS da Dungeon 3
│   │   ├── AtribuirClassNameHyrule.js     # Mapeamento de classes CSS de Hyrule
│   │   ├── CalcularDistancia.js           # Cálculo euclidiano entre coordenadas
│   │   ├── EntradasDungeons.js            # Coordenadas e status das 3 masmorras
│   │   ├── Graph.js                       # Estrutura de dados do Grafo em grade
│   │   └── GridNode.js                    # Representação individual de cada célula/nó
│   ├── App.css
│   ├── App.js                             # Componente base com container e Outlet
│   ├── index.css                          # Estilização global e renderização de grids
│   └── index.js                           # Ponto de entrada e configuração do Router
├── package.json
└── README.md
```

---

## 🌐 Arquitetura de Rotas e Navegação

Como a aplicação é uma **Single Page Application (SPA)** 100% executada no cliente (front-end), não há dependência de um servidor HTTP de API REST externo. A navegação entre os cenários é orquestrada internamente pelo `react-router-dom`:

| Rota | Componente | Objetivo | Transição / Gatilho |
|---|---|---|---|
| `/` | `<Hyrule />` | Mapa principal de Hyrule (42x42). Permite traçar rota até a dungeon mais próxima ou Lost Woods. | Ponto de partida inicial ou retorno após sair de uma dungeon. |
| `/dungeon_1` | `<Dungeon1 />` | Masmorra 1 (28x28). Busca o **Pingente Azul**. | Disparado pelo botão "Entrar na Dungeon" quando a masmorra 1 é o destino atual. |
| `/dungeon_2` | `<Dungeon2 />` | Masmorra 2 (28x28). Busca o **Pingente Verde**. | Disparado ao alcançar a entrada da masmorra 2 e clicar em "Entrar na Dungeon". |
| `/dungeon_3` | `<Dungeon3 />` | Masmorra 3 (28x28). Busca o **Pingente Vermelho**. | Disparado ao alcançar a entrada da masmorra 3 e clicar em "Entrar na Dungeon". |

### Coordenadas Estratégicas do Jogo

| Localidade | Coordenadas no Mapa de Origem | Ponto de Entrada na Dungeon | Localização do Item na Dungeon |
|---|:---:|:---:|:---:|
| **Casa de Link (Início)** | Hyrule `[24, 27]` | — | — |
| **Dungeon #1** | Hyrule `[39, 17]` | Dungeon1 `[14, 26]` | Dungeon1 `[13, 3]` (Pingente Azul) |
| **Dungeon #2** | Hyrule `[24, 1]` | Dungeon2 `[13, 25]` | Dungeon2 `[13, 2]` (Pingente Verde) |
| **Dungeon #3** | Hyrule `[5, 32]` | Dungeon3 `[14, 25]` | Dungeon3 `[15, 19]` (Pingente Vermelho) |
| **Lost Woods / Master Sword** | Hyrule `[6, 5]` | — | Hyrule `[2, 1]` (Master Sword) |

---

## 📦 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalados em seu computador:
- **[Node.js](https://nodejs.org/)** (versão 16.x, 18.x ou superior recomendada)
- Gerenciador de pacotes **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/otaviozerotwo/legend_of_zelda_a_star_react.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd legend_of_zelda_a_star_react
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

5. **Abra no navegador:**
   A aplicação será iniciada automaticamente no endereço:
   ```
   http://localhost:3000
   ```

---

## 📖 Instruções de Uso

Siga o passo a passo da jornada do herói para concluir o jogo:

1. **Iniciar no Reino de Hyrule (`/`)**: Link inicia na sua cabana nas coordenadas `[24, 27]`.
2. **Calcular a Rota para a Primeira Dungeon**: No menu lateral esquerdo, clique no botão **"Percorrer Mapa"**. O algoritmo identificará a masmorra não visitada mais próxima e animará Link até sua entrada.
3. **Entrar na Dungeon**: Ao chegar na entrada, clique em **"Entrar na Dungeon"**. A aplicação fará a transição de rota para a dungeon correspondente.
4. **Obter o Pingente da Virtude**:
   - Clique em **"Percorrer Mapa"** para Link desviar das paredes e caminhar até o pingente;
   - Clique em **"Voltar para Entrada"** para Link retornar ao portal de saída da dungeon;
   - Clique em **"Sair da Dungeon"** para voltar a Hyrule.
5. **Acompanhar o Painel Lateral**: O painel à direita exibirá o custo acumulado em tempo real e adicionará o pingente correspondente ao seu inventário.
6. **Repetir o Processo**: Repita as etapas para as outras duas masmorras restantes.
7. **Empunhar a Master Sword**: Com os três pingentes no inventário, ao clicar em **"Percorrer Mapa"** no mapa de Hyrule, o algoritmo guiará Link diretamente até a entrada de **Lost Woods** (`[6, 5]`), concedendo a **Master Sword** e concluindo a jornada!

---

## 💡 Principais Aprendizados

- **Implementação Prática do A***: Domínio da lógica de busca em grafos com custo acumulado $g(n)$ e função heurística $h(n)$.
- **Estruturas de Dados Avançadas**: Utilização da estrutura `BinaryHeap` em JavaScript puro para gerenciar nós abertos com eficiência $O(\log N)$, evitando gargalos de desempenho em matrizes com centenas de elementos.
- **Gerenciamento de Estado Global**: Coordenação de estados interdependentes (nós de origem/destino, custo total e inventário) utilizando React Context API entre diferentes rotas sem *prop drilling*.
- **Controle de Fluxo e Animações em React**: Uso eficiente de `useEffect` associado a `setInterval` para orquestrar passos síncronos na renderização das células e limpeza adequada dos intervalos (*cleanup function*).
- **Design Temático e Pixel Art**: Criação de interfaces imersivas combinando CSS Grid para matrizes fixas, sprites em pixel art e tipografias customizadas `@font-face`.

---

<p align="center">
  Desenvolvido por <b>Otávio</b> (<a href="https://github.com/otaviozerotwo">@otaviozerotwo</a>)
</p>