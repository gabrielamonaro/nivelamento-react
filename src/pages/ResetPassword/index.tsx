import React, {useRef, useCallback} from 'react'
//useContext é um hook que vai pegar as informaçoes do contexto
import {Container, Background, Content, AnimationContainer} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import * as Yup from 'yup'
import {Form} from '@unform/web'
import logoImg from '../../assets/Logo.svg'
import { FiLock} from 'react-icons/fi'
import { FormHandles } from '@unform/core'

import {useAuth} from '../../hooks/Auth'

import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/Toast'

import {useHistory, useLocation} from 'react-router-dom'
import api from '../../services/api'

interface ResetPasswordFormdata{
    password: string
    password_confirmation: string
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null) //valor inicial é nulo
    const location = useLocation()
    const history = useHistory()
    const{user} = useAuth()
    console.log(user)
    const {addToast} = useToast()
    
    const handleSubmit = useCallback(async (data:  ResetPasswordFormdata) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'Senha obrigatória').required('Senha obrigatória.'),
                password_confirmation: Yup.string().min(6, 'Senha obrigatória').required('Senha obrigatória.')
                .oneOf([Yup.ref('password'), null], 'As senhas não coincidem.') //verificação se os campos coincidem
            })
            await schema.validate(data, {   //método .validate() vem junto com o Yup quando setamos schema = Yup.object()
                abortEarly: false //usamos para poder mostrar no console os erros separados de cada um
            }) 

            const token = location.search.replace('?token=', '')

            await api.post('/password/reset', {
                password: data.password,
                passord_confirmation: data.password_confirmation, 
                token
            })

            if(!token){
                throw new Error()
            }
            
            history.push('/signin')
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
                title: 'Erro ao resetar senha.',
                description: 'Ocorrou um erro ao resetar sua senha, tente novamente.',
            })
            return
        }
    }, [addToast, history, location]) //toda variavel externa que utilizamos no useCallBack e useEffect precisamos colocar como dependencias no final
    
    return(
        <Container>
            <Content>
            <AnimationContainer>
            <img src={logoImg} alt="Logo GoBarber" />
    
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Resetar senha</h1>
                <Input icon={FiLock} name="password" type="password"  placeholder='Nova senha' />
                <Input icon={FiLock} name="password_confirmation" type="password"  placeholder='Confirmação da senha' />
                <Button type="submit"> Alterar Senha </Button>
            </Form >

            </AnimationContainer>
                
            </Content>
            <Background/>
        </Container>
        
    )
}

export default ResetPassword