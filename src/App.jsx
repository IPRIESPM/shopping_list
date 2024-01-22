import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './components/routerComponent/RouterComponent';
import HeaderComponent from './components/headerComponent/HeaderComponent';
import NavComponent from './components/navComponent/NavComponent';
import { UserProvider } from './context/userContext';
import { ProductsProvider } from './context/productsContext';
import { ModalProvider } from './context/modalContext';
import { ShoppingListProvider } from './context/shoppingListContext';

function App() {
  /*
      Añadimos el contexto del usuario
      para que este disponible en toda la app
      Por si en algún momento necesitamos acceder al
      token del usuario o a sus datos.
  */
  /*
      Añadimos el contexto de productos
      esta vez limitado a la zona de main
      para intentar limitar en la medida de lo posible.
  */
  /*
      Añadimos el contexto de modal
      para que este disponible la zona de productos.
  */
  return (

    <UserProvider>
      <BrowserRouter>
        <HeaderComponent />
        <NavComponent />
        <ProductsProvider>
          <ShoppingListProvider>
            <ModalProvider>
              <main>
                <RouterComponent />
              </main>
            </ModalProvider>
          </ShoppingListProvider>
        </ProductsProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
