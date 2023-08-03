import React, {useRef, useCallback} from 'react'
import {Container, Background, Content} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import * as Yup from 'yup'
import {Form} from '@unform/web'
import logoImg from '../../assets/Logo.svg'
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import { FormHandles } from '@unform/core'

import getValidationErrors from '../../utils/getValidationErrors'


const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null) //valor inicial é nulo

    console.log(formRef)

    const handleSubmit = useCallback(async(data: object) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Senha obrigatória')
            })
            await schema.validate(data, {
                abortEarly: false //usamos para poder mostrar no console os erros separados de cada um
            }) //método .validate() vem junto com o Yup quando setamos schema = Yup.object()

        }
        catch(err)
        {
            let errors
            if (err instanceof Yup.ValidationError){

                console.log(err)
                errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)
            }
        }
    }, [])
    
    return(
        <Container>
            <Content>
                <img src={logoImg} alt="Logo GoBarber" />
    
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input icon={FiMail} name="email" type="text" placeholder='email' />
                    <Input icon={FiLock} name="password" type="password"  placeholder='senha' />
    
                    <Button type="submit"> Entrar </Button>
                    <a href="#"> Esqueci minha senha</a>
                </Form >
    
                <a href="login">
                    <FiLogIn/>
                    Criar Conta
                </a>
    
            </Content>
            <Background/>
        </Container>
        
    )
}

export default SignIn