import React, { useState, useEffect } from 'react';

import './styles/MapaHyrule.css';

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
  [100, 10, 100, 100, 100, 100, 100, 100, 100, 10]
];

const MapaHyrule = ({ matrizMapaHyrule }) => {
  const [posicaoAtual, setPosicaoAtual] = useState([4, 5]); // Inicializando na posição [4, 5]
  const [visitado, setVisitado] = useState(Array.from({ length: matrizMapaHyrule.length }, () => Array.from({ length: matrizMapaHyrule[0].length }, () => false)));

  useEffect(() => {
    const pontoFim = [9, 9];

    const intervalId = setInterval(() => {
      setPosicaoAtual(prevPosicao => {
        const [linhaAtual, colunaAtual] = prevPosicao;

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
        vizinhos.forEach(([linha, coluna]) => {
          const custoVizinho = calcularCusto(linha, coluna);
          if (!visitado[linha][coluna] && custoVizinho < menorCusto) {
            menorCusto = custoVizinho;
            novaPosicao = [linha, coluna];
          }
        });

        // Marcar a posição atual como visitada
        setVisitado(prevVisitado => {
          const novoVisitado = prevVisitado.map((linha, indexLinha) =>
            linha.map((valor, indexColuna) =>
              indexLinha === linhaAtual && indexColuna === colunaAtual ? true : valor
            )
          );
          console.log(novoVisitado);
          
          return novoVisitado;
        });

        // eslint-disable-next-line no-mixed-operators
        if (!novaPosicao || (novaPosicao[0] === pontoFim[0] && novaPosicao[1] === pontoFim[1])) {
          clearInterval(intervalId);
        }
        
        console.log(novaPosicao);

        return novaPosicao;

      });
    }, 500);

    return () => clearInterval(intervalId);
  }, [matrizMapaHyrule, visitado]);

  // Renderização da matriz na tela
  return (
    <div className="mapa-hyrule-container">
      {matrizMapaHyrule.map((row, rowIndex) => (
        <div key={rowIndex} className="mapa-linha">
          {row.map((cell, colIndex) => (
            <div 
              key={colIndex} 
              style={{ backgroundColor: posicaoAtual[0] === rowIndex && posicaoAtual[1] === colIndex ? 'yellow' : visitado[rowIndex][colIndex] ? 'gray' : 'transparent' }}
              className='mapa-celula'
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <MapaHyrule 
      matrizMapaHyrule={matrizMapaHyrule} 
    />
  );
}

export default App;

