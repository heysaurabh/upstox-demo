import React from 'react';
import Routes from './routes';
import { Link } from 'react-router-dom';

import './App.css';


function App() {
  return (
    <div className="App">
      <Link className="btn" to="/">Home</Link>
      <Link className="btn" to="/live-chart">Live Chart</Link>
      <Routes />
    </div>
  );
}

export default App;
