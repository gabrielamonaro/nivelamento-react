import ToastContainer from '../components/ToastConainer'
import { uuid } from 'uuidv4';
import React, {createContext, useCallback, useContext, useState} from 'react'

export interface ToastMessage{
    id: string
    type?: 'success' | 'error' | 'info'
    title: string
    description?:string
}

interface ToastContextData{
    addToast(message: Omit<ToastMessage, 'id'>): void
    removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [messages, setMessages] = useState<ToastMessage[]>([])

    const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
         const id = Math.random().toString()
         const toast = {
            id, 
            type, 
            title, 
            description
         }
         //setMessages([...messages, toast])
         //é o mesmo que 
         setMessages((oldMessages) => [...oldMessages, toast])
        }, [messages])
        
    const removeToast = useCallback((id: string) => {

        setMessages(state => state.filter(message => message.id != id))
    }, [])

    return (
        <ToastContext.Provider value={{addToast, removeToast}}>
            {children}
            <ToastContainer messages={messages}></ToastContainer>
        </ToastContext.Provider>     
        )
}

function useToast() : ToastContextData
{
    const context = useContext(ToastContext)

    if(!context){
        throw new Error ('useToast must be userd within a ToastProvider')
    }

    return context
}

export {ToastProvider, useToast}