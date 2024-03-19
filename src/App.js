import MapaHyrule from './components/MapaHyrule';
import matrizMapaHyrule from './data/DadosHyrule';

function App() {
  return (
    <MapaHyrule 
      matrizMapaHyrule={matrizMapaHyrule} 
    />
  );
}

export default App;
