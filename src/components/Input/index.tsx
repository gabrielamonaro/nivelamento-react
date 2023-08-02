import React, {InputHTMLAttributes} from "react";
import {IconBaseProps} from 'react-icons' //importando as propriedades que os ícones podem ter

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    name: string
    icon: React.ComponentType<IconBaseProps> //recebendo um componente React como propriedade
}

const Input: React.FC<InputProps> = ({icon: Icon, ...rest}) => (
    <Container>
        {Icon && <Icon size={20} />}
        <input {...rest}/>
    </Container>
)

export default Input