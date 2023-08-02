import React from 'react'
import {Container, Background, Content} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/Logo.svg'
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi'

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="Logo GoBarber" />

            <form>
                <h1>Faça seu logon</h1>
                <Input icon={FiMail} name="email" type="text" placeholder='email' />
                <Input icon={FiLock} name="password" type="password"  placeholder='senha' />

                <Button type="submit"> Entrar </Button>
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