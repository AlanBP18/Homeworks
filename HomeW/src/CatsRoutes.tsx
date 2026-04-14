import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Gatos from './Cats/Gatos';
import ColoresSolid from './Cats/ColoresSolid';
import Atigrados from './Cats/Atigrados';

import Blanco from './Cats/CS/Blanco';
import Gris from './Cats/CS/Gris';
import Naranja from './Cats/CS/Naranja';
import Negro from './Cats/CS/Negro';


import Moteado from './Cats/AT/Moteado';
import Rayas from './Cats/AT/Rayas';
import Remolinos from './Cats/AT/Remolinos';
import RenderPage from './Cats/Render/Render';

export const CatsRoutes = () => {
  return (
    <Routes>
      <Route path="/gatos" element={<Gatos />} />
      <Route path="/coloressolid" element={<ColoresSolid />} />
      <Route path="/atigrados" element={<Atigrados />} />

      <Route path="/blanco" element={<Blanco />} />
      <Route path="/gris" element={<Gris />} />
      <Route path="/naranja" element={<Naranja />} />
      <Route path="/negro" element={<Negro />} />

      <Route path="/rayas" element={<Rayas />} />
      <Route path="/remolinos" element={<Remolinos />} />
      <Route path="/moteado" element={<Moteado />} />
      <Route path="/render" element={<RenderPage />} />

      <Route path="/" element={<Gatos />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
};
