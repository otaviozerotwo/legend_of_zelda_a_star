function distanciaEuclidiana(inicio, fim) {
  const [x1, y1] = inicio;
  const [x2, y2] = fim;

  console.log('Inicio: ', inicio);
  console.log('Fim: ', fim);

  return console.log('Distancia Euclidiana: ', Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

function aStar(matrizMapaHyrule, inicio, fim) {
  const listaAberta = [];
  const listaFechada = new Set();

  listaAberta.push({ posicao: inicio, g: 0, h: distanciaEuclidiana(inicio, fim), f: 0 });

  console.log('Posição: ', inicio);
  console.log('Lista Aberta: ', listaAberta);
  console.log('Lista Fechada: ', listaFechada);
  console.log('Tamanho Lista Aberta: ', listaAberta.length);

  while (listaAberta.length > 0) {
    console.log('Entrei no while!');

    const posicaoAtual = encontrarMenorValorF(listaAberta);

    console.log('Lista Aberta: ', listaAberta);

    if (posicaoAtual.posicao[0] === fim[0] && posicaoAtual.posicao[1] === fim[1]) {
      
      console.log('Caminho encontrado!');
      console.log('Lista Aberta: ', listaAberta);

      return reconstrirCaminho(posicaoAtual);
    }

    listaAberta.splice(listaAberta.indexOf(posicaoAtual), 1);
    listaFechada.add(posicaoAtual.posicao.toString());

    const vizinhos = obterVizinhos(matrizMapaHyrule, posicaoAtual.posicao);

    for (const vizinho of vizinhos) {
      if (listaFechada.has(vizinho.posicao.toString())) {
        continue;
      }

      const custoAtualG = posicaoAtual.g + vizinho.custo;

      if (!listaAberta.find(no => no.posicao.toString() === vizinho.posicao.toString()) || custoAtualG < vizinho.g) {
        vizinho.g = custoAtualG;
        vizinho.h = distanciaEuclidiana(vizinho.posicao, fim);
        vizinho.f = vizinho.g + vizinho.h;
        vizinho.pai = posicaoAtual;

        if (!listaAberta.find(no => no.posicao.toString() === vizinho.posicao.toString())) {
          listaAberta.push(vizinho);
        }
      }
    }
  }

  console.log('Caminho não encontrado');
  return null;
}

function encontrarMenorValorF(listaAberta) {
  let menorF = Infinity;
  let menorNo = null;

  for (const no of listaAberta) {
    if (no.f < menorF) {
      menorF = no.f;
      menorNo = no;
    }
  }

  return menorNo;
}

function reconstrirCaminho(no) {
  const caminho = [];
  let posicaoAtual = no;

  while (posicaoAtual.pai) {
    caminho.push(posicaoAtual.posicao);
    posicaoAtual = posicaoAtual.pai;
  }

  return caminho.reverse();
}

function obterVizinhos(matrizMapaHyrule, posicao) {
  const [x, y] = posicao;
  const vizinhos = [];
  const direcoes = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // Movimentos possíveis (direita, esquerda, baixo, cima)

  for (const [dx, dy] of direcoes) {
    const novoX = x + dx;
    const novoY = y + dy;

    if (novoX >= 0 && novoX < matrizMapaHyrule.length && novoY >= 0 && novoY < matrizMapaHyrule[0].length) {
      const custo = calcularCusto(matrizMapaHyrule[novoX][novoY]);

      if (custo !== Infinity) {
        vizinhos.push({ posicao: [novoX, novoY], custo });
      }
    }
  }

  return vizinhos;
}

function calcularCusto(tipoTerreno) {
  switch (tipoTerreno) {
    case 0: // Grama
      return 10;
    case 1: // Areia
      return 20;
    case 2: // Floresta
      return 100;
    case 3: // Montanha
      return 150;
    case 4: // Água
      return 180;
    default:
      return Infinity; //Terreno não caminhável
  }
}

export default aStar;