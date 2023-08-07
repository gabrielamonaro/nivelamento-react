import React, {useRef, useCallback, useState} from 'react'
//useContext é um hook que vai pegar as informaçoes do contexto
import {Container, Background, Content, AnimationContainer} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import * as Yup from 'yup'
import {Form} from '@unform/web'
import logoImg from '../../assets/Logo.svg'
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import { FormHandles } from '@unform/core'

import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/Toast'

import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

interface ForgotPasswordFormdata{
    email: string
    password: string
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null) //valor inicial é nulo

    const [loading, setLoading] = useState(false)


    const {addToast} = useToast()
    const history = useHistory()
    const handleSubmit = useCallback(async(data: ForgotPasswordFormdata) => {
        try{
            setLoading(true)
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido')
            })
            await schema.validate(data, {   //método .validate() vem junto com o Yup quando setamos schema = Yup.object()
                abortEarly: false //usamos para poder mostrar no console os erros separados de cada um
            }) 
            
            //recuperacao de senha
            
            api.post('/password/forgot', {
                email: data.email
            })

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado',
                description: 'Enviamos um e-mail para recuperar a senha.',
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
                title: 'Erro na recuperação de senha',
                description: 'Ocorrou um erro ao tentar realizar a recuperação de senha, tente novamente.',
            })
            return
        }
        finally{            //depois de terminar de executar o try (independente se caiu no catch ou nao)
            setLoading(false) 
        }
    }, [addToast, history]) //toda variavel externa que utilizamos no useCallBack e useEffect precisamos colocar como dependencias no final
    
    return(
        <Container>
            <Content>
            <AnimationContainer>
            <img src={logoImg} alt="Logo GoBarber" />
    
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Recuperar Senha</h1>
                <Input icon={FiMail} name="email" type="text" placeholder='email' />

                <Button loading={loading} type="submit"> Recuperar </Button>
            </Form >

            <Link to="/signin">
                <FiLogIn/>
               Voltar ao Login
            </Link>

            </AnimationContainer>
                
            </Content>
            <Background/>
        </Container>
        
    )
}

export default ForgotPassword