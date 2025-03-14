import { useState, useEffect } from 'react'
import { IUser } from './types'


export function useUserByID(id: number) {
    const [user, setUser] = useState<IUser>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:3001/users/${id}`)
                const user = await response.json()
                
                setUser(user)
                
            }
            catch (error) {
               
                if (error instanceof Error){
                    setError(error.message)
                }
                
            }
            finally {
                
                setIsLoading(false)
            }
        }
        
        getUser()
        
    }, [id])
    

    
    return {user: user, isLoading: isLoading, error: error}

    
}