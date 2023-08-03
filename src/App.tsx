import React from 'react'
import GlobalStyle from './styles/global'
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import {AuthProvider}  from './hooks/AuthContext';

//AuthContext.Provider é um componente que vamos colocar em volta dos componentes que queremos que tenham acesso ao contexto de autenticação 
//todo o componente dentro dele terá acesso às informações de autenticação

function App() {

  return (
    <>
      <AuthProvider>   
        <SignIn/>
      </AuthProvider>
      <GlobalStyle/>
    </>
  );
}

export default App;
