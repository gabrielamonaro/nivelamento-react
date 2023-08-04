import React from 'react'
import {Container} from './styles'
import {ToastMessage} from '../../hooks/Toast'
import { useToast } from '../../hooks/Toast'
import Toast from './Toast'

import {useTransition} from '@react-spring/web' //vai permitir controlar a animacao de um elemento quando entra e quando sai da tela

export interface ToastContainerProps {
    messages: ToastMessage[] 
}

const ToastContainer: React.FC<ToastContainerProps> = ({messages}) => {

         /**
     * 1º parametro -> as mensagens 
     * 2º parametro -> uma função que vai obter a chave da minha mensagem
     * 3º parametro -> objeto contendo as minhas animações 
     */


    // const messagesWithTransitions = useTransition(messages, {
    //     keys: (message) => message.id,
    //     from: { right: '-120%', opacity: 0 },
    //     enter: { right: '0%', opacity: 1 },
    //     leave: { right: '-120%', opacity: 0 },
    // })

    const {removeToast} = useToast()

    return (
        <Container>
        {messages.map((message) => (
            <Toast key={message.id}  message={message}/>
        ))}
    </Container>
    
    )
}

export default ToastContainer