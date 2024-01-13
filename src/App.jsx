import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <main>
        <HeaderComponent />
        <NavComponent />
        <HomeComponent />
        <FooterComponent />
      </main>
    </BrowserRouter>
  );
}

export default App;
