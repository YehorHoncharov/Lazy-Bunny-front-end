import { useState, useEffect } from "react"
import { IGenre } from "./types"


export function useGenre(){
    const [genres, setGenres] = useState<IGenre[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchGenres(){
            try {
                setLoading(true)
                const response = await fetch('http://localhost:3001/movies')
                const genresData = await response.json()
                setGenres(genresData)
            } catch(error){
                if (error instanceof Error) {
                    setError(error.message)
                }
                console.log(error)

            } finally {
                setLoading(false)
            }
        }
        fetchGenres()
        
    }, [])
    return {genres: genres, loading: loading, error: error}
}