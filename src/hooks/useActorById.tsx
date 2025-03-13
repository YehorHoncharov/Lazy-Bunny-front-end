import { useState, useEffect } from 'react'
import { IActor } from './types'


export function useActorByID(id: number) {
    const [actor, setActor] = useState<IActor>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        async function getActor() {
            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:3001/movies/actor/${id}`)
                const actor = await response.json()
                
                setActor(actor)
                
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
        
        getActor()
        
    }, [id])
    

    
    return {actor: actor, isLoading: isLoading, error: error}

    
}