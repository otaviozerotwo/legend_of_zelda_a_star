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
  const [posicoesVisitadas, setPosicoesVisitadas] = useState(new Set());

  // Função para percorrer a matriz
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
          if (!posicoesVisitadas.has(`${linha},${coluna}`) && custoVizinho < menorCusto) {
            menorCusto = custoVizinho;
            novaPosicao = [linha, coluna];
          }
        });

        // Adicionar a posição atual às posições visitadas
        setPosicoesVisitadas(prevPosicoesVistadas => {
          const novasPosicoesVisitadas = new Set(prevPosicoesVistadas);
          novasPosicoesVisitadas.add(`${linhaAtual}, ${colunaAtual}`);
          
          console.log(novasPosicoesVisitadas);
          
          return novasPosicoesVisitadas;
        });

        console.log(menorCusto);

        if (menorCusto === Infinity || novaPosicao[0] === pontoFim[0] && novaPosicao[1] === pontoFim[1]) {
          clearInterval(intervalId);
        }

        return novaPosicao;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  // Renderização da matriz na tela
  return (
    <div className="mapa-hyrule-container">
      {matrizMapaHyrule.map((row, rowIndex) => (
        <div key={rowIndex} className="mapa-linha">
          {row.map((cell, colIndex) => (
            <div 
              key={colIndex} 
              style={{ backgroundColor: posicaoAtual[0] === rowIndex && posicaoAtual[1] === colIndex ? 'yellow' : posicoesVisitadas.has(`${rowIndex},${colIndex}`) ? 'gray' : 'transparent' }}
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

