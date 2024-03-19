import Celula from './Celula';

import '../styles/MapaHyrule.css';

const MapaHyrule = ({ matrizMapaHyrule }) => {
  return (
    <div className="mapa-hyrule-container">
      {matrizMapaHyrule.map((row, rowIndex) => (
        <div key={rowIndex} className="mapa-linha">
          {row.map((cell, colIndex) => (
            <Celula
              key={colIndex}
              value={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MapaHyrule;