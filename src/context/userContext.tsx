import { createContext, useContext, ReactNode, useState } from "react"
import { useEffect } from "react"
import { Response } from "../hooks/types"

interface IUser {
    email: string
    username: string
    password: string
}

interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, nickname: string, password: string) => void
    isAuthenticated: () => boolean
}

const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, nickname: string, password: string) => {},
    isAuthenticated: () => false,
}
const userContext = createContext<IUserContext>(initialValue)

export function useUserContext(){
    return useContext(userContext)
}

interface IUserContextProviderProps{
    children?: ReactNode
}

export function UserContextProvider(props: IUserContextProviderProps){
    const [user, setUser] = useState<IUser | null>(null)

    async function getData(token: string){
        try{
            const response = await fetch('http://localhost:3001/users/me', {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json()
            if (result.status === 'error'){
                console.log(result.message) 
                return
            }
            setUser(result.data)
        } catch(error){

        }
    }

    async function login(email: string, password: string){
        try{
            const response = await fetch('http://localhost:3001/users/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json()
            if (result.status === 'error'){
                console.log(result.message)
                return
            }
            console.log(result.data)
            getData(result.data)
            localStorage.setItem('token', result.data)
            
        } catch(error){

        }
    }
    
    async function register(nickname: string, email: string, password: string){
        try {
            const response = await fetch('http://localhost:3001/users/reg', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'nickname': nickname, 'email': email, 'password': password, "role": "user"})
            })

            const result: Response<string> = await response.json();
            if (result.status === 'error'){
                console.log(result.message);
                return;
            }
            getData(result.data)
            localStorage.setItem('token', result.data)

        } catch(error){

        }
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        getData(token)
    },[])
    
    function isAuthenticated() {
        if (user === null) {
            return false
        }
        return true 
    }

    return <userContext.Provider
    value={{
        user: user,
        login: login,
        register: register,
        isAuthenticated: isAuthenticated
    }}>

    {props.children}
    </userContext.Provider> 
}

export {}