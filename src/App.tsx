import React from 'react'
import GlobalStyle from './styles/global'
import {BrowserRouter} from 'react-router-dom'
// import SignUp from './pages/SignUp';
import AppProvider from './hooks';
//AuthContext.Provider é um componente que vamos colocar em volta dos componentes que queremos que tenham acesso ao contexto de autenticação 
//todo o componente dentro dele terá acesso às informações de autenticação

import Routes from './routes'

const App: React.FC = () =>  {

  return (
    <BrowserRouter>
        <AppProvider>
            <Routes/>
        </AppProvider>
        <GlobalStyle/>
    </BrowserRouter>
  );
}

export default App;
