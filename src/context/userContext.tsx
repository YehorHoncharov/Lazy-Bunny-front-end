import { createContext, useContext, ReactNode, useState } from "react"
import { useEffect } from "react"
import { IUser, Response } from "../hooks/types"

interface IUserContext {
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, nickname: string, password: string) => void
    isAuthenticated: () => boolean
    updateUser: (updatedUser: IUser) => void 
}

const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, nickname: string, password: string) => {},
    isAuthenticated: () => false,
    updateUser: (updatedUser: IUser) => {} 
}

const userContext = createContext<IUserContext>(initialValue)

export function useUserContext() {
    return useContext(userContext)
}

interface IUserContextProviderProps {
    children?: ReactNode
}

export function UserContextProvider(props: IUserContextProviderProps) {
    const [user, setUser] = useState<IUser | null>(null)


    const updateUser = (updatedUser: IUser) => {
        setUser(updatedUser)
    }

    async function getData(token: string) {
        try {
            const response = await fetch('http://localhost:3001/users/me', {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json()
            if (result.status === 'error') {
                console.log(result.message) 
                return
            }
            setUser(result.data)
        } catch(error) {
            console.error("Error fetching user data:", error)
        }
    }

    async function login(email: string, password: string) {
        try {
            const response = await fetch('http://localhost:3001/users/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json()
            if (result.status === 'error') {
                console.log(result.message)
                return
            }
            getData(result.data)
            localStorage.setItem('token', result.data)
        } catch(error) {
            console.error("Login error:", error)
        }
    }
    
    async function register(nickname: string, email: string, password: string) {
        try {
            const response = await fetch('http://localhost:3001/users/reg', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'nickname': nickname, 'email': email, 'password': password, "role": "user"})
            })

            const result: Response<string> = await response.json();
            if (result.status === 'error') {
                console.log(result.message);
                return;
            }
            getData(result.data)
            localStorage.setItem('token', result.data)
        } catch(error) {
            console.error("Registration error:", error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        getData(token)
    }, [])
    
    function isAuthenticated() {
        return user !== null
    }

    return (
        <userContext.Provider
            value={{
                user: user,
                login: login,
                register: register,
                isAuthenticated: isAuthenticated,
                updateUser: updateUser 
            }}
        >
            {props.children}
        </userContext.Provider> 
    )
}