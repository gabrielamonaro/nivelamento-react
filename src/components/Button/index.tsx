import React, {ButtonHTMLAttributes} from "react";
import {Container} from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({children, ...rest}) => (
    <Container type="button" {...rest}>

        teste
    </Container>
)

export default Button