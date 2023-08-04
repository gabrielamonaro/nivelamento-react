import React, {useRef, useCallback} from 'react'
//useContext é um hook que vai pegar as informaçoes do contexto
import {Container, Background, Content} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import * as Yup from 'yup'
import {Form} from '@unform/web'
import logoImg from '../../assets/Logo.svg'
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import { FormHandles } from '@unform/core'

import {useAuth} from '../../hooks/Auth'

import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/Toast'

interface SignInFormdata{
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null) //valor inicial é nulo
    
    const{signIn, user} = useAuth()
    console.log(user)
    const {addToast} = useToast()
    
    const handleSubmit = useCallback(async(data: SignInFormdata) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Senha obrigatória')
            })
            await schema.validate(data, {   //método .validate() vem junto com o Yup quando setamos schema = Yup.object()
                abortEarly: false //usamos para poder mostrar no console os erros separados de cada um
            }) 
            await signIn({
                email: data.email,
                password: data.password
            })

            await addToast({
                type: 'success',
                title: 'Login realizado com sucesso'
            })
     

        }
        catch(err)
        {
           
            if (err instanceof Yup.ValidationError){
              
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)
                return
            }
            
            //disparar um toast
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorrou um erro ao fazer o login, cheque as credenciais',
            })
            return
        }
    }, [signIn, addToast]) //toda variavel externa que utilizamos no useCallBack e useEffect precisamos colocar como dependencias no final
    
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