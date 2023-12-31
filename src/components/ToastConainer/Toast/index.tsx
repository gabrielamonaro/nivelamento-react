import { ToastMessage } from '@/hooks/Toast'
import React, { useEffect } from 'react'
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import {Container} from './styles'
import { useToast } from '../../../hooks/Toast'
interface ToastProps{
    message: ToastMessage
}

const icons = {
    info: <FiInfo size={24}/>,
    error: <FiAlertCircle size={24}/>,
    success: <FiCheckCircle size={24}/>
}

const Toast:React.FC<ToastProps> = ({message}) => {
    const {removeToast} = useToast()

    useEffect(()=> {
        const timer = setTimeout(() => {
            removeToast(message.id)
        }, 3000)
    
        return () => { //se retorno uma funcao dentro de um useEffect - essa funcao é executada assim que o componente morrer/deixar de existir 
            clearTimeout(timer)
        }
    }, [message.id, removeToast])

    return(
        <Container type={message.type} hasDescription={Number(!!message.description)}>
           {icons[message.type || 'info']}
        <div>
            <strong>{message.title}</strong>
            {message.description &&  <p>{message.description}</p> }
        </div>
        <button type="button" onClick={() => removeToast(message.id)}>
            <FiXCircle size={18}/>
        </button>  

        </Container>)
}

export default Toast