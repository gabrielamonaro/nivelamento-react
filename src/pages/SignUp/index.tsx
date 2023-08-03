import React, {useCallback, useRef} from 'react'
import {Container, Background, Content} from './styles'

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

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null) //valor inicial é nulo

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

        }
        catch(err)
        {
            let errors
            if (err instanceof ValidationError){

                console.log(err)
                errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)
            }
        }
    }, [])

    return ( <Container>
        <Background/>

<Content>
    <img src={logoImg} alt="Logo GoBarber" />

    {/* usamos a tag Form da biblioteca Unform */}
    <Form onSubmit={handleSubmit} ref={formRef}> 
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