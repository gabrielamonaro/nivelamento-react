import styled, {keyframes} from 'styled-components'
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
    `
export const Background = styled.div`
    flex: 1;  //vai ocupar toda a tela, menos os 700px já ocupados
    background: url(${signInBackgroundImg}) no-repeat center;
    background-size: cover;
`

const appearFromLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(-50px)
    }
    to{
        opacity: 1;
        transform: translateX(0)
    }
`

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   

    animation: ${appearFromLeft} 1s;
form{
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
            margin-bottom: 24px;
        }
            a{
                color: #f4ede8;
                display: block;
                text-decoration: none;
                transition: color 0.2s;
                margin-top: 28px;

              
            }
        
        }

        >a {    //pega somente as tags a que vem diretamente de dentro do container - filhos diretos
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
