import React, { useState, useEffect } from "react";

import "./styles/MapaHyrule.css";

const matrizMapaHyrule = [
  [100, 10, 10, 10, 10, 0, 10, 10, 10, 100],
  [100, 100, 100, 100, 100, 100, 10, 100, 10, 100],
  [100, 10, 10, 10, 10, 10, 10, 100, 10, 10],
  [100, 10, 100, 100, 100, 100, 100, 100, 100, 10],
  [100, 10, 10, 10, 10, 0, 10, 10, 10, 100],
  [100, 100, 100, 100, 100, 100, 10, 100, 10, 100],
  [100, 10, 10, 10, 10, 10, 10, 100, 10, 10],
  [100, 10, 100, 100, 100, 100, 100, 100, 100, 10],
  [100, 10, 10, 10, 10, 10, 10, 100, 10, 10],
  [100, 10, 100, 100, 100, 100, 100, 100, 100, 10],
];

const MapaHyrule = ({ matrizMapaHyrule }) => {
  const [posicaoAtual, setPosicaoAtual] = useState([4, 5]); // Inicializando na posição [4, 5]
  const [visitado, setVisitado] = useState(Array.from({ length: matrizMapaHyrule.length }, () => Array.from({ length: matrizMapaHyrule[0].length }, () => false)));
  const [caminhoSemSaida, setCaminhoSemSaida] = useState(false);
  const [pilhaPosicoes, setPilhaPosicoes] = useState([]);

  useEffect(() => {
    const pontoFim = [9, 0];

    const intervalId = setInterval(() => {
      setPosicaoAtual(prevPosicao => {
        const [linhaAtual, colunaAtual] = prevPosicao;

        // Verificar se já chegamos ao ponto de destino
        if (linhaAtual === pontoFim[0] && colunaAtual === pontoFim[1]) {
          clearInterval(intervalId);
          return prevPosicao; // Retornar a posição atual, pois já estamos no destino
        }

        // Função para calcular o custo de movimento para uma posição
        const calcularCusto = (linha, coluna) => {
          if (linha < 0 || linha >= matrizMapaHyrule.length || coluna < 0 || coluna >= matrizMapaHyrule[0].length) {
            return Infinity; // Retorna infinito se a posição estiver fora dos limites da matriz
          }
          return matrizMapaHyrule[linha][coluna];
        };

        // Array de posições vizinhas
        const vizinhos = [
          [linhaAtual - 1, colunaAtual], // Cima
          [linhaAtual, colunaAtual + 1], // Direita
          [linhaAtual + 1, colunaAtual], // Baixo
          [linhaAtual, colunaAtual - 1]  // Esquerda
        ];

        // Encontrar a posição vizinha com menor custo
        let menorCusto = Infinity;
        let novaPosicao = prevPosicao;
        let encontrouVizinho = false;

        for (const [linha, coluna] of vizinhos) {
          if (linha >= 0 && linha < matrizMapaHyrule.length && coluna >= 0 && coluna < matrizMapaHyrule[0].length && !visitado[linha][coluna]) {
            const custoVizinho = calcularCusto(linha, coluna);
            if (custoVizinho < menorCusto) {
              menorCusto = custoVizinho;
              novaPosicao = [linha, coluna];
              encontrouVizinho = true;
            }
          }
        }
        
        // Marcar a posição atual como visitada
        setVisitado(prevVisitado => {
          const novoVisitado = prevVisitado.map((linha, indexLinha) =>
            indexLinha === linhaAtual ? { ...linha, [colunaAtual]: true } : linha
          );
          return novoVisitado;
        });

        // Verificar se estamos em um beco sem saída
        if (!encontrouVizinho) {
          setCaminhoSemSaida(true);
          if (pilhaPosicoes.length > 0) {
            // Retroceder para a última posição não visitada
            const ultimaPosicao = pilhaPosicoes.pop();
            setPosicaoAtual(ultimaPosicao);
          }
        } else {
          setCaminhoSemSaida(false);
          // Armazenar a posição atual na pilha
          setPilhaPosicoes([...pilhaPosicoes, prevPosicao]);
        }

        console.log(novaPosicao);

        return novaPosicao;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, [matrizMapaHyrule, pilhaPosicoes, visitado]);

  // Renderização da matriz na tela
  return (
    <div className="mapa-hyrule-container">
      {matrizMapaHyrule.map((row, rowIndex) => (
        <div key={rowIndex} className="mapa-linha">
          {row.map((cell, colIndex) => {
            const posicaoAtualValida =
              posicaoAtual[0] === rowIndex && posicaoAtual[1] === colIndex;
            const visitadoValido =
              visitado[rowIndex] && visitado[rowIndex][colIndex];
            return (
              <div
                key={colIndex}
                style={{
                  backgroundColor: posicaoAtualValida
                    ? "yellow"
                    : visitadoValido
                    ? "gray"
                    : "transparent",
                }}
                className="mapa-celula"
              >
                {caminhoSemSaida && posicaoAtual[0] === rowIndex && posicaoAtual[1] === colIndex ? 'X' : cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

function App() {
  return <MapaHyrule matrizMapaHyrule={matrizMapaHyrule} />;
}

export default App;
