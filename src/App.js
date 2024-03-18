import React, { useState, useEffect } from 'react';
import MapaHyrule from './components/MapaHyrule';
import matrizMapaHyrule from './data/DadosHyrule';
import aStar from './utils/aStar';

function App() {
  const [posicaoAgente, setPosicaoAgente] = useState([25, 28]);
  const [rota, setRota] = useState([]);

  useEffect(() => {
    const novaRota = aStar(matrizMapaHyrule, 25, 28, 7, 6);
    setRota(novaRota);
  }, [posicaoAgente]);

  return (
    <MapaHyrule 
      matrizMapaHyrule={matrizMapaHyrule}
      posicaoAgente={posicaoAgente}
      setPosicaoAgente={setPosicaoAgente}
      rota={rota} 
    />
  );
}

export default App;
