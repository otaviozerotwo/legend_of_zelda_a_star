import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustoCaminhoContext } from '../context/CustoCaminhoContext';
import atribuirClassNameParaCelula from '../utils/AtribuirClassNameDungeon2';
import astar from '../utils/aStar';
import Graph from '../utils/Graph';
import gridDungeon2 from '../data/GridMapaDungeon2';
import { useStartEndNodes } from '../context/StartEndNodesContext';

import Resultados from '../components/Resultados';

const Dungeon2 = () => {
  const [grid] = useState(gridDungeon2);
  const { startNode, setStartNode, endNode, setEndNode } = useStartEndNodes();
  const graph = new Graph(grid);
  const navegarPara = useNavigate();
  const { custoTotal, setCustoTotal } = useContext(CustoCaminhoContext);
  const [celulaAtualIndexIda, setCelulaAtualIndexIda] = useState(0);
  const [celulaAtualIndexVolta, setCelulaAtualIndexVolta] = useState(0);
  const [percorrerMapaClicado, setPercorrerMapaClicado] = useState(false);
  const [sairDungeonClicado, setSairDungeonClicado] = useState(false);

  const [caminhoIda, setCaminhoIda] = useState([]);
  const [caminhoVolta, setCaminhoVolta] = useState([]);

  const [celulasPercorridas, setCelulasPercorridas] = useState(() => {
    return grid.map(row => row.map(() => false));
  });

  useEffect(() => {
    if (percorrerMapaClicado && caminhoIda) {
      const interval = setInterval(() => {
        if (celulaAtualIndexIda < (caminhoIda.length -1)) {
          const currentNode = caminhoIda[celulaAtualIndexIda];
          setCelulaAtualIndexIda(prevIndex => prevIndex + 1);
          setCustoTotal(prevCustoTotal => prevCustoTotal + currentNode.weight);

          if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            clearInterval(interval);
          }
        } else if (sairDungeonClicado && caminhoVolta) {
          if (celulaAtualIndexVolta < (caminhoVolta.length -1)) {
            const currentNode = caminhoVolta[celulaAtualIndexVolta];
            setCelulaAtualIndexVolta(prevIndex => prevIndex + 1);
            setCustoTotal(prevCustoTotal => prevCustoTotal + currentNode.weight);

            if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
              clearInterval(interval);
            }
          }
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [caminhoIda, caminhoVolta, celulaAtualIndexIda, celulaAtualIndexVolta, endNode, percorrerMapaClicado, sairDungeonClicado, setCustoTotal]);

  useEffect(() => {
    if ((percorrerMapaClicado && caminhoIda) || (sairDungeonClicado && caminhoVolta)) {
      const interval = setInterval(() => {
        if (celulaAtualIndexIda < (caminhoIda.length -1)) {
          const currentNode = caminhoIda[celulaAtualIndexIda];

          // Marca a célula atual como percorrida na matriz de células percorridas
          setCelulasPercorridas(prevCelulasPercorridas => {
            const newCelulasPercorridas = [...prevCelulasPercorridas];
            newCelulasPercorridas[currentNode.x][currentNode.y] = true;
            return newCelulasPercorridas;
          });

          if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            clearInterval(interval);
          }
          
        } else if (celulaAtualIndexVolta < (caminhoVolta.length -1)) {
          const currentNode = caminhoVolta[celulaAtualIndexVolta];
          setCelulaAtualIndexVolta(prevIndex => prevIndex + 1);
          setCustoTotal(prevCustoTotal => prevCustoTotal + currentNode.weight);

          setCelulasPercorridas(prevCelulasPercorridas => {
            const newCelulasPercorridas = [...prevCelulasPercorridas];
            newCelulasPercorridas[currentNode.x][currentNode.y] = true;
            return newCelulasPercorridas;
          });

          if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            clearInterval(interval);
          }
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [caminhoIda, caminhoVolta, celulaAtualIndexIda, celulaAtualIndexVolta, endNode.x, endNode.y, percorrerMapaClicado, sairDungeonClicado, setCustoTotal]);

  const PercorrerMapa = () => {
    setPercorrerMapaClicado(true);
    const novoStartNode = startNode;
    const novoEndNode = endNode;
    setCaminhoIda(astar.search(graph, graph.grid[novoStartNode.x][novoStartNode.y], graph.grid[novoEndNode.x][novoEndNode.y]));  
  };

  const VoltarParaEntrada = () => {
    if (caminhoIda.length > 0) {
      setCelulasPercorridas(Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false)));
      setPercorrerMapaClicado(false);
      setSairDungeonClicado(true);
      const novoStartNode = endNode;
      const novoEndNode = startNode;
  
      setCaminhoVolta(astar.search(graph, graph.grid[novoStartNode.x][novoStartNode.y], graph.grid[novoEndNode.x][novoEndNode.y]));
      
      setStartNode({ x: 24, y: 1 });
      setEndNode({ x: 6, y: 5 });
    }
  };

  const SairDungeon = () => {
    navegarPara('/');
  }
  
  return (
    <>
      <div className="menu-acoes">
        <div className="titulo">
          <h2>Menu Ações</h2>
        </div>

        <button onClick={PercorrerMapa} className="btn-menu-acoes">Percorrer Mapa</button>

        <button onClick={VoltarParaEntrada} className="btn-menu-acoes">Voltar para Entrada</button>

        <button onClick={SairDungeon} className="btn-menu-acoes">Sair da Dungeon</button>
      </div>
      <div className="mapa-container">
        <div className="titulo">
          <h1>Dungeon #2</h1>
        </div>
        <div className="mapa-dungeon-container">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="mapa-linha">
              {row.map((cell, cellIndex) => {
                const className = atribuirClassNameParaCelula(cell);

                const isCelulaPercorrida = celulasPercorridas[rowIndex][cellIndex];

                const isCelulaAtualCaminhoIda = celulaAtualIndexIda < (caminhoIda.length -1) && caminhoIda[celulaAtualIndexIda]?.x === rowIndex && caminhoIda[celulaAtualIndexIda]?.y === cellIndex;
                
                const isCelulaAtualCaminhoVolta = (celulaAtualIndexVolta < (caminhoVolta.length -1)) && caminhoVolta[celulaAtualIndexVolta]?.x === rowIndex && caminhoVolta[celulaAtualIndexVolta]?.y === cellIndex;
                
                return (
                  <div 
                    key={cellIndex} 
                    className={`mapa-celula ${className} ${isCelulaPercorrida ? 'mapa-celula-caminho-percorrido' : ''} ${isCelulaAtualCaminhoIda ? 'mapa-celula-posicao-atual' : ''} ${isCelulaAtualCaminhoVolta ? 'mapa-celula-posicao-atual' : ''}`} >
                    
                    
                    {/* <span className="mapa-coordenada-x">{`x: ${rowIndex}`}</span>  
                    <span className="mapa-coordenada-y">{`y: ${cellIndex}`}</span>   */}
                    {/* <span className="mapa-celula-custo-fixo">{cell}</span> */}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Resultados custoTotal={custoTotal} />
    </>
  );
};

export default Dungeon2;
