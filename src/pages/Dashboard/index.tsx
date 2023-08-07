import React, { useCallback, useState, useEffect, useMemo } from 'react'
import {Container, Header, Profile, HeaderContent, Content, Schedule, Calendar,NextAppointment, Section, Appointment} from './styles'
import logoImg from '../../assets/Logo.svg'
import { FiClock, FiPower } from 'react-icons/fi'
import { useAuth } from '../../hooks/Auth'
import { DayPicker , DayModifiers} from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import api from '../../services/api'
import {isToday, format, parseISO, isAfter} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { StringMappingType } from 'typescript'

interface MonthAvailabilityItem{
    day: number 
    available: boolean
}

interface Appointment{
    id: string
    date: string
    hourFormatted: string
    user: {
        name: string
        avatar_url: string
    }
}

const Dashboard: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState(new Date()) 
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>()
    const [appointments, setAppointments] = useState<Appointment[]>([])

    interface CalendarModifiers extends DayModifiers {
        available: boolean
    }
    const {signOut, user} = useAuth()    

    const handleMonthChanege = useCallback((month: Date) => {
        setCurrentMonth(month)
    }, [])

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params:{
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1
            }
        }).then(response => {
            setMonthAvailability(response.data)
        })
    }, [currentMonth, user.id]) //toda vez que currentMonth for alterada a funcao acima vai ser disparada -- user.id nao vai ser alterada mas o react pede que seja colocada na lista de parametros

    useEffect(() => {
        api.get<Appointment[]>('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(response => {
            const appointmentsFormatted = response.data.map((appointment: Appointment) => {
                return{
                    ...appointment, 
                    hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
                }
            })
            setAppointments(response.data)
        })
    }, [selectedDate])

    const disabledDays = useMemo(   //useMemo serve para memorizar um valor especifico e dizer quando queremos que seja atualizado
        ()=>{ 
            
            const dates = monthAvailability?.filter(monthDay => monthDay.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear()
                const month = currentMonth.getMonth()
                return new Date(year, month, monthDay.day)
            })
        },
    [currentMonth, monthAvailability]) //variaveis que compõem a constante que estamos criando disabledDays


    const selectedDateAsText = useMemo(() => { 
        return format(selectedDate, "'Dia' dd 'de' MMMM", { 
            locale: ptBR                    //traduzindo a data para portugues
        })
    }, [selectedDate])

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            locale: ptBR
        })
    }, [selectedDate])

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available){
            setSelectedDate(day)
        }
    }, [])

    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours()<12
        })
    }, [appointments])
    
    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
        return parseISO(appointment.date).getHours()>=12
        })
    }, [appointments])

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment => 
            isAfter(parseISO(appointment.date), new Date()))
    }, [appointments])


    return (
        <Container>
            <Header>
               <HeaderContent>
                    <img src={logoImg} alt="Logotipo do GoBarber" />

                    <Profile>
                        <img src={user.avatar_url} alt={user.name}  />
                        <div>
                            <span> Bem-vindo,  </span>
                            <strong>{user.name} </strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower/>
                    </button>
                </HeaderContent> 
            </Header>

            <Content>
                <Schedule>
                        <h1> Horários agendados </h1>
                        <p>
                            {isToday(selectedDate) && <span> 'Hoje' </span>} 
                            <span> {selectedDateAsText} </span>
                            <span> {selectedWeekDay} </span>
                        </p>

                        {isToday(selectedDate) && (
                            <NextAppointment>
                            <strong> Atendimento a seguir</strong>
                            <div>
                                <img src={nextAppointment?.user.avatar_url} alt={nextAppointment?.user.name} />
                            

                            <strong>{nextAppointment?.user.name}</strong>
                            <span> 
                                <FiClock/>
                                {nextAppointment?.hourFormatted}
                            </span>
                            </div>
                        </NextAppointment>
                        )} 
                        

                        <Section>
                            <strong> Manhã </strong>

                            {morningAppointments.length === 0 && (
                                <p> Nenhum agendamento neste período.</p>
                            )}

                         {morningAppointments.map(appointment => (
                               <Appointment key={appointment.id}>
                               <span>
                                   <FiClock/> {appointment?.hourFormatted}
                               </span>
                               <div>
                               <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                               <strong> {appointment.user.name}</strong>
                               </div>
                           </Appointment>
                         ))}

                        </Section>
                        <Section>
                            <strong> Tarde </strong>
                            {afternoonAppointments.length === 0 && (
                                <p> Nenhum agendamento neste período.</p>
                            )}

                            {afternoonAppointments.map(appointment => (
                               <Appointment  key={appointment.id}>
                               <span>
                                   <FiClock/> {appointment?.hourFormatted}
                               </span>
                               <div>
                               <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                               <strong> {appointment.user.name}</strong>
                               </div>
                           </Appointment>
                         ))}
                        </Section>

                        

                </Schedule>

                <Calendar>
                    <DayPicker 
                    fromMonth={new Date()}
                    disabled={[{dayOfWeek: [0,6]}]}
                    modifiers={{
                        available: {dayOfWeek: [1,2,3,4,5]}
                    }}
                    onDayClick={handleDateChange}
                    selected={selectedDate}
                    onMonthChange={handleMonthChanege}
                    ></DayPicker>
                </Calendar>
            </Content>
        </Container>
    )
}

export default Dashboard