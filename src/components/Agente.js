const Agente = ({ posicao }) => {
  return (
    <div className="agente" style={{ top: `$position[0] * 20}px`, left: `${posicao[1] * 20}px` }}>
      L
    </div>
  );
};

export default Agente;