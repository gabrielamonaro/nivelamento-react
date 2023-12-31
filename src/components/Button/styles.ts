import styled from 'styled-components'
import {shade} from 'polished'

export const Container = styled.button`

            background: #ff9000;
            height: 56px;
            border: 2px solid #232129;
            padding: 0 16px;
            color: #312e38;
            font-weight: 500;
            border-radius: 10px;
            border: none;
            width: 100%;
            margin-top: 16px;
            transition: background-color 0.2s;
            
            &:hover{
                background: ${shade( 0.2, '#ff9000')}
            }

`