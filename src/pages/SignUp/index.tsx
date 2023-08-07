import React, {useCallback, useRef} from 'react'
import {Container, Background, Content, AnimationContainer} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/Logo.svg'
import { FiMail, FiLock} from 'react-icons/fi'
import {CgProfile} from 'react-icons/cg'
import {BsArrowLeftShort} from 'react-icons/bs'

import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup' //biblioteca para lidar com validações de campos
//podemos importar tudo e ir usando conforme a necessidade ou podemos importar cada módulo por vez

import {ValidationError} from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import { Link, useHistory } from 'react-router-dom' //importamos o useHistory para fazer redirecionamentos

import api from '../../services/api'
import { useToast } from '../../hooks/Toast'

interface SignUpFormData{
    name: string
    email: string
    password: string
}
const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null) //valor inicial é nulo
    const {addToast} = useToast()

    const history = useHistory()

    console.log(formRef)

    const handleSubmit = useCallback(async(data: object) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos')
            })
            await schema.validate(data, {
                abortEarly: false //usamos para poder mostrar no console os erros separados de cada um
            }) //método .validate() vem junto com o Yup quando setamos schema = Yup.object()
            await api.post('/users', data) //cadastrando de fato pela rota
            
            history.push('/') //redirecionando para o login
            
            console.log(history)
            addToast({
                type: 'success',
                title: 'Cadastro realizado',
                description: 'Você já pode fazer o login no GoBarber'
            })
        }
        catch(err)
        {
            if (err instanceof ValidationError){
                console.log(err)
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

                return
            }

            addToast({
                type: 'success',
                title: 'Erro no cadastro.',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.'
            })
        }
    }, [addToast, history])

    return ( <Container>
        <Background/>

<Content>
    <AnimationContainer>
        <img src={logoImg} alt="Logo GoBarber" />

    {/* usamos a tag Form da biblioteca Unform */}
    <Form onSubmit={handleSubmit} ref={formRef}> 
        <h1>Faça seu cadastro</h1>
        <Input icon={CgProfile} name="name" type="text" placeholder='Nome' />
        <Input icon={FiMail} name="email" type="text" placeholder='email' />
        <Input icon={FiLock} name="password" type="password"  placeholder='senha' />

        <Button type="submit"> Cadastrar </Button>
    </Form>

    <Link to="/">
        <BsArrowLeftShort/>
        Voltar para Logon
    </Link>
    </AnimationContainer>
   

</Content>
</Container>)
}

export default SignUp