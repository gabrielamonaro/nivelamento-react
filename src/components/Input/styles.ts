import styled from 'styled-components'

export const Container = styled.div`
        background: #232129;
        border-radius: 10px;
        border: 2px solid #232129;
        padding: 16px;
        width: 100%;
        margin-top: 8px; 
        display: flex;
        align-items: center;
        
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
        }
`