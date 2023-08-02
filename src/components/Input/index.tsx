import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from "react";
//useCallback é um hook do react - é uma forma de criar funcoes dentro de um compoennte que nao sao recriadas a cada vez que o componente atualiza - eles 

import {IconBaseProps} from 'react-icons' //importando as propriedades que os ícones podem ter

import { Container } from './styles'

import {useField} from '@unform/core' //é um hook que vai receber como parâmetro o nome do campo e retorna varias propriedades

interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    name: string
    icon: React.ComponentType<IconBaseProps> //recebendo um componente React como propriedade
}

const Input: React.FC<InputProps> = ({name,icon: Icon, ...rest}) => {
    const {fieldName, defaultValue, error, registerField} = useField(name)
    //fieldName - nome do campo de fato (que sairá como propriedade no objeto de retorno do submit)
    //defaultValue - podemos setar um valor inicial  com a propriedade inicitalData na tag Form - usa-se os mesmos nomes dos fieldName
    //registerField
    //error - é utilizado quando precisa colocar um erro proximo ao input - pode ser um erro de validação

    const [isFocused, setIsFocused] = useState(false)
    const [isField, setIsField] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null) //é como se estivessemos usando JS puro - podemos manipular direto pela DOM
    //passando <HTMLInputElement> estamos informando que o inputReference vai carregar todos os metodos do componente input 

    const handleInputFocus = useCallback(() =>{
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() =>{
        setIsFocused(false)
        setIsField(!!inputRef.current?.value) //if (inputRef.current?.value) then true else false
    }, []) //ele cria a funcao uma vez e depois só vai recriar a cada vez que as variáveis setadas no segundo parametro forem chamadas - no nosso caso, não será recriada nenhuma vez

    useEffect(() => { //executado assim que a tela é carregada
        return registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField])

    return (
        <Container isfocused={isFocused} isfield={isField}>
            {Icon && <Icon size={20} />}
            <input 
                onFocus={()=> setIsFocused(true)} //qnd o input recebe o foco
                onBlur={handleInputBlur} //qnd o input perde o foco
                defaultValue={defaultValue}
                ref={inputRef}  
                {...rest}
            />
        </Container>
    )
    
}
export default Input