import React, { useState } from 'react';
import Celula from './Celula';
import calcularDistanciaEuclidiana from './Heuristica';

import '../styles/MapaHyrule.css';

const MapaHyrule = ({ matrizMapaHyrule }) => {
  const [posicaoAtual, setPosicaoAtual] = useState({ x: 25, y: 28 });

  return (
    <div className="mapa-hyrule-container">
      {matrizMapaHyrule.map((row, rowIndex) => (
        <div key={rowIndex} className="mapa-linha">
          {row.map((cell, colIndex) => {
            const heuristica = calcularDistanciaEuclidiana(
              posicaoAtual.x,
              posicaoAtual.y,
              rowIndex,
              colIndex
            );

            const custoComHeuristica = cell + heuristica;

            return (
              <Celula
                key={colIndex}
                value={custoComHeuristica}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MapaHyrule;