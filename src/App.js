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

  // Função para percorrer a matriz
  useEffect(() => {
    const pontoFim = [9, 9];

    const intervalId = setInterval(() => {
      setPosicaoAtual(prevPosicao => {
        const novaPosicao = [...prevPosicao];
        if (novaPosicao[0] === pontoFim[0] && novaPosicao[1] === pontoFim[1]) {
          clearInterval(intervalId);
          return prevPosicao;
        }

        // Movendo para a próxima posição
        if (novaPosicao[1] < pontoFim[1]) {
          novaPosicao[1]++;
        } else if (novaPosicao[0] < pontoFim[0]) {
          novaPosicao[0]++;
          novaPosicao[1] = 0;
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
              style={{ backgroundColor: posicaoAtual[0] === rowIndex && posicaoAtual[1] === colIndex ? 'yellow' : 'transparent' }}
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

