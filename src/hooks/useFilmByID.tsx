import { useState, useEffect } from 'react'
import { IComment, IFilm } from './types'


export function useFilmByID(id: number) {
    const [film, setFilm] = useState<IFilm>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
        async function getFilm() {
            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:3001/movies/${id}`)
                const film = await response.json()
                
                setFilm(film)
                
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
        
        getFilm()
        
    }, [id])

    async function addComment(name: string) {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:3001/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            const newComment = await response.json()
            setComments((prev) => [...prev, newComment])
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function updateComment(id: number, name: string) {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:3001/movies/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            setComments((prev) =>
                prev.map((comment) => (comment.id === id ? { ...comment, name } : comment))
            )
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteComment(id: number) {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3001/movies/${id}`, {
                method: "DELETE",
            })

            setComments((prev) => prev.filter((genre) => genre.id !== id))
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }
    

    
    return {film: film, isLoading: isLoading, error: error,
        addComment, updateComment, deleteComment
    }

    
}