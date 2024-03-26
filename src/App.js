import React, { useState, useEffect } from "react";

import "./styles/MapaHyrule.css";

// const matrizMapaHyrule = [
//   [100, 10, 10, 10, 10, 0, 10, 10, 10, 100],
//   [100, 100, 100, 100, 100, 100, 10, 100, 10, 100],
//   [100, 10, 10, 10, 10, 10, 10, 100, 10, 10],
//   [100, 10, 100, 100, 100, 100, 100, 100, 100, 10],
//   [100, 10, 10, 10, 10, 0, 10, 10, 10, 100],
//   [100, 100, 100, 100, 100, 100, 10, 100, 10, 100],
//   [100, 10, 10, 10, 10, 10, 10, 100, 10, 10],
//   [100, 10, 100, 100, 100, 100, 100, 100, 100, 10],
//   [100, 10, 10, 10, 10, 10, 10, 100, 10, 10],
//   [100, 10, 100, 100, 100, 100, 100, 100, 100, 10],
// ];

const matrizMapaHyrule = [
  [100, 10, 10, 10, 10],
  [100, 100, 100, 100, 100],
  [100, 10, 10, 100, 10],
  [100, 10, 100, 100, 10],
  [100, 10, 10, 10, 10],
];

// const matrizMapaHyrule = [
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
// ];

const pontoFim = [0, 0];

const MapaHyrule = ({ matrizMapaHyrule, pontoFim }) => {
  const [posicaoAtual, setPosicaoAtual] = useState([4, 5]); // Inicializando na posição [4, 5]
  const [visitado, setVisitado] = useState(
    Array.from({ length: matrizMapaHyrule.length }, () =>
      Array.from({ length: matrizMapaHyrule[0].length }, () => false)
    )
  );
  const [caminhoSemSaida, setCaminhoSemSaida] = useState(false);
  const [pilhaPosicoes, setPilhaPosicoes] = useState([]);
  const [caminhoPercorrido, setCaminhoPercorrido] = useState([]);

  // Função para calcular a Distância Euclidiana entre dois pontos
  const calcularDistanciaEuclidiana = (ponto1, ponto2) => {
    const [x1, y1] = ponto1;
    const [x2, y2] = ponto2;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  useEffect(() => {
    // const pontoFim = [3, 3];

    const intervalId = setInterval(() => {
      setPosicaoAtual((prevPosicao) => {
        const [linhaAtual, colunaAtual] = prevPosicao;

        // Verificar se já chegamos ao ponto de destino
        if (linhaAtual === pontoFim[0] && colunaAtual === pontoFim[1]) {
          clearInterval(intervalId);
          return prevPosicao; // Retornar a posição atual, pois já estamos no destino
        }

        // Função para calcular o custo de movimento para uma posição
        const calcularCusto = (linha, coluna) => {
          if (
            linha < 0 ||
            linha >= matrizMapaHyrule.length ||
            coluna < 0 ||
            coluna >= matrizMapaHyrule[0].length
          ) {
            return Infinity; // Retorna infinito se a posição estiver fora dos limites da matriz
          }
          // Calcular a soma do custo original com a Distância Euclidiana até o ponto de destino
          const custoOriginal = matrizMapaHyrule[linha][coluna];
          const distanciaEuclidiana = calcularDistanciaEuclidiana(
            [linha, coluna],
            pontoFim
          );

          const novoCusto = custoOriginal + distanciaEuclidiana;
          
          // console.log('Custo Original: ', custoOriginal);
          // console.log('Heurística: ', distanciaEuclidiana);
          // console.log('Custo Final: ', novoCusto);

          return novoCusto;
        };

        // Array de posições vizinhas
        const vizinhos = [
          [linhaAtual - 1, colunaAtual], // Cima
          [linhaAtual, colunaAtual + 1], // Direita
          [linhaAtual + 1, colunaAtual], // Baixo
          [linhaAtual, colunaAtual - 1], // Esquerda
        ];

        // Verificar se todos os vizinhos estão visitados (possível beco sem saída)
        const todosVizinhosVisitados = vizinhos.every(([linha, coluna]) => {
          return (
            linha >= 0 &&
            linha < matrizMapaHyrule.length &&
            coluna >= 0 &&
            coluna < matrizMapaHyrule[0].length &&
            visitado[linha][coluna]
          );
        });

        // Se todos os vizinhos estiverem visitados, estamos em um beco sem saída
        if (todosVizinhosVisitados) {
          setCaminhoSemSaida(true);
          if (pilhaPosicoes.length > 0) {
            // Retroceder para a última posição não visitada
            const ultimaPosicao = pilhaPosicoes.pop();
            setPosicaoAtual(ultimaPosicao);
            setCaminhoPercorrido((prevCaminho) => prevCaminho.slice(0, -1)); // Remover a última posição do caminho percorrido
          }
          return prevPosicao;
        }

        // Encontrar a posição vizinha com menor custo
        let menorCusto = Infinity;
        let novaPosicao = prevPosicao;
        let encontrouVizinho = false;
        for (const [linha, coluna] of vizinhos) {
          if (
            linha >= 0 &&
            linha < matrizMapaHyrule.length &&
            coluna >= 0 &&
            coluna < matrizMapaHyrule[0].length &&
            !visitado[linha][coluna]
          ) {
            const custoVizinho = calcularCusto(linha, coluna);

            console.log(`Custo do vizinho [${linha},${coluna}]:`, custoVizinho);

            if (custoVizinho < menorCusto) {
              menorCusto = custoVizinho;
              novaPosicao = [linha, coluna];
              encontrouVizinho = true;
            }
          }
        }

        // Marcar a posição atual como visitada e adicionar ao caminho percorrido
        setVisitado((prevVisitado) => {
          const novoVisitado = prevVisitado.map((linha, indexLinha) =>
            indexLinha === linhaAtual
              ? { ...linha, [colunaAtual]: true }
              : linha
          );
          return novoVisitado;
        });
        setCaminhoPercorrido((prevCaminho) => [...prevCaminho, prevPosicao]);

        // Log dos valores para depuração
        console.log('Menor custo encontrado: ', menorCusto);
        console.log('Nova posição selecionar: ', novaPosicao);

        // Verificar se encontrou um vizinho válido
        if (encontrouVizinho) {
          setCaminhoSemSaida(false);
          // Armazenar a posição atual na pilha
          setPilhaPosicoes([...pilhaPosicoes, prevPosicao]);

          console.log(novaPosicao);

          return novaPosicao;
        } else {
          // Se não encontrou um vizinho válido, permanecer na posição atual
          return prevPosicao;
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, [matrizMapaHyrule, pilhaPosicoes, pontoFim, visitado]);

  // Renderização da matriz na tela
  return (
    <div className="mapa-hyrule-container">
      {matrizMapaHyrule.map((row, rowIndex) => (
        <div key={rowIndex} className="mapa-linha">
          {row.map((cell, colIndex) => {
            const posicaoAtualValida = posicaoAtual[0] === rowIndex && posicaoAtual[1] === colIndex;
            const visitadoValido = visitado[rowIndex] && visitado[rowIndex][colIndex];
            const noCaminho = caminhoPercorrido.some(([linha, coluna]) => linha === rowIndex && coluna === colIndex);
            const distanciaEuclidiana = calcularDistanciaEuclidiana([rowIndex, colIndex], pontoFim);
            const novoCusto = cell + distanciaEuclidiana;
            const valorCelula = novoCusto.toFixed(2);
            return (
              <div
                key={colIndex}
                className={`mapa-celula ${posicaoAtualValida ? 'posicao-atual' : ''} ${visitadoValido ? 'visitado' : ''} ${noCaminho ? 'caminho' : ''}`}
                style={{
                  backgroundColor: posicaoAtualValida
                    ? "yellow"
                    : visitadoValido
                    ? "gray"
                    : "transparent",
                }}
              >
                {valorCelula}
                {caminhoSemSaida && posicaoAtual[0] === rowIndex && posicaoAtual[1] === colIndex ? 'X' : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

function App() {
  return <MapaHyrule matrizMapaHyrule={matrizMapaHyrule} pontoFim={pontoFim} />;
}

export default App;
