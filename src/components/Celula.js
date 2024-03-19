import '../styles/Celula.css';

function Celula({ value}) {
  const cellClassName = `mapa-celula cell-value-${value}`;

  return (
    <div className={cellClassName}>
      {value}
    </div>
  );
}

export default Celula;