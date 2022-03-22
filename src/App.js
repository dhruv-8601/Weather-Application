import logo from './logo.svg';
import './App.css';
import React from 'react';
import Forecast from './components/Forecast/Forecast';
import Logo from './components/Logo/Logo';

function App() {
  return (
    <div className="App">
      <header>
        <Logo />
        <h1>React Weather App</h1>
      </header>
      
      <main>
        <Forecast />
      </main>
      
      <footer>
        Page Created by Dhruv Patel
      </footer>
    </div>
  );
}

export default App;
