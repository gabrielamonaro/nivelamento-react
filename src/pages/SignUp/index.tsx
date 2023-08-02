import React from 'react'
import {Container, Background, Content} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/Logo.svg'
import { FiMail, FiLock} from 'react-icons/fi'
import {CgProfile} from 'react-icons/cg'
import {BsArrowLeftShort} from 'react-icons/bs'

import {Form} from '@unform/web'


const SignUp: React.FC = () => {

    function handleSubmit(data: object): void{
        console.log(data)
    }

    return ( <Container>
        <Background/>

<Content>
    <img src={logoImg} alt="Logo GoBarber" />

    {/* usamos a tag Form da biblioteca Unform */}
    <Form onSubmit={handleSubmit}> 
        <h1>Faça seu cadastro</h1>
        <Input icon={CgProfile} name="name" type="text" placeholder='Nome' />
        <Input icon={FiMail} name="email" type="text" placeholder='email' />
        <Input icon={FiLock} name="password" type="password"  placeholder='senha' />

        <Button type="submit"> Cadastrar </Button>
    </Form>

    <a href="login">
        <BsArrowLeftShort/>
        Voltar para Logon
    </a>

</Content>
</Container>)
}

export default SignUp