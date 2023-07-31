import React from 'react'
import {Container, Background, Content} from './styles'
  
import logoImg from '../../assets/Logo.svg'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Logo GoBarber" />

            <form>
                <h1>Faça seu logon</h1>
                <input type="text" placeholder='email' />
                <input type="password"  />

                <button type="submit"> Entrar </button>
                <a href="#"> Esqueci minha senha</a>
            </form>

            <a href="login">
                <FiLogIn/>
                Criar Conta
            </a>

        </Content>
        <Background/>
    </Container>
    
)

export default SignIn