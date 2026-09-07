import { createContext, useState, useContext } from 'react';
import { CustoCaminhoProvider } from './CustoCaminhoContext';

// Criando o contexto
const StartEndNodesContext = createContext();

// Provedor do contexto
export const StartEndNodesProvider = ({ children }) => {
  const [startNode, setStartNode] = useState({ x: 24, y: 27 });
  const [endNode, setEndNode] = useState({ x: 6, y: 5 });

  return (
    <StartEndNodesContext.Provider value={{ startNode, setStartNode, endNode, setEndNode }}>
      <CustoCaminhoProvider>
        {children}
      </CustoCaminhoProvider>
    </StartEndNodesContext.Provider>
  );
};

// Hook personalizado para acessar os valores do contexto
export const useStartEndNodes = () => {
  const context = useContext(StartEndNodesContext);
  if (!context) {
    throw new Error('useStartEndNodes deve ser usado dentro de um StartEndNodesProvider');
  }
  return context;
};
