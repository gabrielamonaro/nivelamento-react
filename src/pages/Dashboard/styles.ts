import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
    padding: 32px 0;
    background: #28262e;
`

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    >img { //estilizando a primeira imagem apenas
        height: 80px;
    }   

    button{
        margin-left: auto;
        background: transparent;
        border: 0;

        svg { //estilizacao do icone
            color: #999591;
            width: 20px;
            height: 20px;
        }
    }
`

export const Profile = styled.div`
    display: flex;
    margin-left: 80px;
    align-items: center;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    div{
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span{
            color: #f4ede8;
        }

        strong{
           color: #ff9000;
        }
    }
`

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
`

export const Schedule = styled.div`
    flex: 1;
    margin-right: 120px;

    h1{
        font-size: 36px;
    }

    p{
        margin-top: 8px;
        color: #ff9000;
        font-weight: 500;
   }

   span + span {
        margin-left: 8px;
        padding-left: 8px;
        border-left: solid 1px #ff9000;
   }
`

export const NextAppointment = styled.div`
    margin-top: 64px;

    > strong{ 
        color: #999591;
        font-size: 20px;
        font-weight: 400;
    }

    div{
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-top: 24px;
        position: relative;

        &::before {
            position: absolute;
            height: 80%;
            width: 1px;
            left: 0;
            top: 10%;
            content:''; 
            background:  #ff9000;
        }

        img{
            width: 80px;
            height: 80px;
            border-radius: 5%;
        }

        strong{
            margin-left: 24px;
            color: #FFF;
        }

        span{
            margin-left: auto;
            display: flex;
            align-items: center;
            color: #999591;

            svg{
                color: #ff9000;
                margin-right: 8px;
            }
        }
    }

`

export const Section = styled.section`
    margin-top: 48px;
    
    >strong{
        color: #999591;
        font-size: 20px;
        line-height: 26px;
        border-bottom: 1px solid #3e3b47;
        display: block;//para ocupar toda a linha
        padding-bottom: 16px;
        padding-top: 16px;

    }

    p{
        color:#999591;
    }
`

export const Appointment = styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;

    & + div {
        margin-top: 16px;
    }
    
    span{
            margin-left: auto;
            display: flex;
            align-items: center;
            color: #f4ede8;

            svg{
                color: #ff9000;
                margin-right: 8px;
            }
        }
    
    div{
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-left: 24px;
        flex: 1;

        img{
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        strong{
            margin-left: 24px;
            color: #FFF;
            font-size: 20px;
            font-weight: 300;
        }


    }
`


export const Calendar = styled.aside`
    width: 380px;

    .rdp-month {
        background: #28262e;
        border-radius: 10px;
        padding-bottom: 10px;
    }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .rdp-cell{
    width: 40px;
    height: 40px;
  }
  .rdp-day:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
    margin: 2px;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .rdp-day_today {
    font-weight: normal;
  }
  .rdp-day_disabled{
    color: #666360 !important;
    background: transparent !important;
  }
  .rdp-day_selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }

`
