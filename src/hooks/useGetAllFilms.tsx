import { useEffect, useState } from "react"
import { IFilm } from "./types"

export function useGetAllFilms(){
    const [films, setFilms] = useState<IFilm[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    useEffect(()=>{
        async function getFilms(){
            try{
                setIsLoading(true)
                const response = await fetch('http://localhost:3001/movies')
                const films = await response.json()
                setFilms(films)

                }
            catch(error){
                if (error instanceof Error){
                    setError(error.message)
                }
            }
            finally{
                setIsLoading(false)
            }
            
        }
        getFilms()
        
    },[])
    return {films: films, isLoading: isLoading, error: error}
}