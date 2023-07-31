import styled from 'styled-components'
import signInBackgroundImg from "../../assets/goBarberLogin.png"
import {shade} from 'polished'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch; //os itens dentro de Container carregam height 100vh tambem

`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    

    width: 100%;
    max-width: 700px;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
            margin-bottom: 24px;
        }

        input{
            background: #232129;
            border-radius: 10px;
            border: 2px solid #232129;
            padding: 16px;
            width: 100%;
            margin-top: 8px; 

            &::placeholder{
                color: #F4EDE8; 
            }

            & + input { //todo input precedido por outro
                margin-top: 8px; 
            }
        }

        button{
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

        a { 
            color: #F4EDE8;
            display: block;
            margin-top: 24x;
            text-decoration: none;
            transition: color 0.2s;
        }

        }
    }

    >a {        //pega somente as tags a que vem diretamente de dentro do container - filhos diretos
                color: #ff9000;
                display: block;
                margin-top: 24x;
                text-decoration: none;
                transition: color 0.2s;

                display: flex;
                align-items: center;

                &:hover{
                    color: ${shade( 0.2, '#ff9000')}
                }
    }
    `
export const Background = styled.div`
    flex: 1;  //vai ocupar toda a tela, menos os 700px já ocupados
    background: ${signInBackgroundImg} no-repeat center;
    background-size: cover;
`

