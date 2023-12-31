import react, {createContext, useCallback, useContext, useState} from 'react'
import api from '../services/api'

interface SignInCredentials{
    email: string
    password: string
}
interface User{
    id: string
    avatar_url: string
    name: string
}

interface AuthContextData{
    user: User
    signIn(credentials: SignInCredentials):Promise<void>
    signOut():void
}


interface AuthState {
    token: string
    user: User
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData) //iniciando o contexto com objeto vazio - forçando o parâmetro a ser vazio


const AuthProvider: React.FC<{children: React.ReactNode}>= ({children}) => {
    const [data, setData] = useState<AuthState>(() => { //valor inicial é uma funcao que busca o token e o user no localStorage

        const token = localStorage.getItem('@GoBarber:token')
        const user = localStorage.getItem('@GoBarber:user')

        if (token && user)
        {
            api.defaults.headers.common['authorization'] = `Bearer ${token}`; //passando o token como parametro em todas as rotas

            return {token, user: JSON.parse(user)}
        }



        return {} as AuthState
    }) 


    const signIn = useCallback(async({email, password}: SignInCredentials) => {
        const response = await api.post('/sessions', {
            email,
            password
        })

        const {token, user} = response.data


        localStorage.setItem('@GoBarber:token', token)
        localStorage.setItem('@GoBarber:user', JSON.stringify(user))

        api.defaults.headers.common['authorization'] = `Bearer ${token}`; //passando o token como parametro em todas as rotas


        setData({token, user})

    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token')
        localStorage.removeItem('@GoBarber:user')

        setData({} as AuthState)

    },[] )

    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    if(!context)
    {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export {AuthProvider, useAuth}