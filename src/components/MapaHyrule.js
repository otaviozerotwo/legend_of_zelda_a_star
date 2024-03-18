import React, { useEffect } from 'react';
import Celula from './Celula';

import '../styles/MapaHyrule.css';

const MapaHyrule = ({ matrizMapaHyrule, posicaoAgente, setPosicaoAgente, rota }) => {
  const moverAgente = (novaPosicao) => {
    setPosicaoAgente(novaPosicao);
  }

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (rota && currentIndex < rota.length) {
        setPosicaoAgente(rota[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [rota, setPosicaoAgente]);

  return (
    <div className="mapa-hyrule-container">
      {matrizMapaHyrule.map((row, rowIndex) => (
        <div key={rowIndex} className="mapa-linha">
          {row.map((cell, colIndex) => (
            <Celula
              key={colIndex}
              value={cell}
              agent={posicaoAgente[0] === rowIndex && posicaoAgente[1] === colIndex}
              route={rota && rota.includes([rowIndex, colIndex])}
              onClick={() => {
                moverAgente([rowIndex, colIndex]);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MapaHyrule;