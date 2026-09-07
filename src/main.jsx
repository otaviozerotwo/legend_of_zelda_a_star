import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { StartEndNodesProvider } from './context/StartEndNodesContext';

import Hyrule from './routes/Hyrule.jsx';
import Dungeon1 from './routes/Dungeon1.jsx';
import Dungeon2 from './routes/Dungeon2.jsx';
import Dungeon3 from './routes/Dungeon3.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Hyrule /> },
      { path: "/dungeon_1", element: <Dungeon1 /> },
      { path: "/dungeon_2", element: <Dungeon2 /> },
      { path: "/dungeon_3", element: <Dungeon3 /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StartEndNodesProvider>
      <RouterProvider router={router} />
    </StartEndNodesProvider>
  </StrictMode>,
)
