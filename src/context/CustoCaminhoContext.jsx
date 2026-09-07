import { createContext, useState } from 'react';

export const CustoCaminhoContext = createContext();

export const CustoCaminhoProvider = ({ children }) => {
  const [custoTotal, setCustoTotal] = useState(0);

  const atualizaCustoTotal = (novoCusto) => {
    setCustoTotal(novoCusto);
  };

  return (
    <CustoCaminhoContext.Provider value={{ custoTotal, setCustoTotal, atualizaCustoTotal }}>
      {children}
    </CustoCaminhoContext.Provider>
  );
};