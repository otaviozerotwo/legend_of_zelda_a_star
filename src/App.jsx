import { Outlet } from 'react-router-dom';
import './assets/fonts.css';
import '../src/styles/MenuAcoes.css';

const App = () => (
  <div className="container">
    <Outlet />
  </div>
);

export default App;