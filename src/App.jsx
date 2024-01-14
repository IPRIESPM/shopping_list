import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import HeaderComponent from './Components/headerComponent/HeaderComponent';
import NavComponent from './Components/navComponent/NavComponent';
import RouterComponent from './Components/routerComponent/RouterComponent';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <HeaderComponent />
        <NavComponent />
        <main>
          <RouterComponent />
        </main>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
