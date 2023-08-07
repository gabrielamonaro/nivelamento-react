import React, { ComponentType } from 'react'
import {RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect} from 'react-router-dom'
import {useAuth} from '../hooks/Auth'

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean
    component: ComponentType<any>;
}

const Route: React.FC<RouteProps> = ({isPrivate = false, component: Component, ...rest}) => {
    const {user} = useAuth()

    return (
        <ReactDOMRoute 
        {...rest} 
        render={({location}) => { //pegamos o location para passarmos adiante o histórico de rotas do navegador (navegados pelas setas do navegador)
            //se a rota for privada e o usuario nao foi autenticado - manda pra rota do login
            //se a rota for privada e o usuario foi autenticado - manda pro Dashboard
            return isPrivate === !!user ? <Component/> : (<Redirect to={{pathname: isPrivate ? '/' : '/dashboard', state: {from: location}} }/>) 

        }}
        
        />
    )

}

export default Route