import styled, { css } from 'styled-components'
import ToolTip from '../TootTip'

interface ContainerProps {
    isfocused: boolean
    isfield: boolean
    isErrored: boolean
}
export const Container = styled.div<ContainerProps>`
        background: #232129;
        border-radius: 10px;
        border: 2px solid #232129;
        padding: 16px;
        width: 100%;
        margin-top: 8px; 
        display: flex;
        align-items: center;
        justify-content: space-between;
       
        ${props => props.isErrored && css`
            border-color: #c53030;
        `}
        
        ${props => props.isfocused && css`
            color: #ff9000;
            border-color: #ff9000;
        `}


        input{
            background: transparent;
            border: 0;
            color:#f4ede8;
            &::placeholder{
                color: #666360; 
            }

            & + input { //todo input precedido por outro
                margin-top: 8px; 
            }
        }
        
       svg{
            margin-right: 16px;
            color:#666360;

            ${props => props.isfocused && css`
            color: #ff9000;`}

            ${props => props.isfield && css`
            color: #ff9000;`}
        }
`

export const Error = styled(ToolTip)`
    width: 20px;
    svg{
        margin: 0;
        align-self: flex-end;
    }

    span{
        background: #c53030;
        color: #fff;

        &::before{
            border-color: #c53030 transparent;
        }
    }
`