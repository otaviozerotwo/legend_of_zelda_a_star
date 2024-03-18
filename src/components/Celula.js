import '../styles/Celula.css';

function Celula({ value, agent, route, onClick }) {
  const cellClassName = `mapa-celula cell-value-${value} ${agent ? 'agent' : ''} ${route ? 'route' : ''}`;

  return (
    <div className={cellClassName} onClick={onClick}>
      {value}
    </div>
  );
}

export default Celula;