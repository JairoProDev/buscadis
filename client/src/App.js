import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainComponent from './MainComponent'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <div className="App">
        <MainComponent />
      </div>
    </Router>
  );
}

export default App;