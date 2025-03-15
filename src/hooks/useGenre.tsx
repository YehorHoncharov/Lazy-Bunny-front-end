import { useState, useEffect } from "react"
import { IGenre } from "./types"

export function useGenre() {
    const [genres, setGenres] = useState<IGenre[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchGenres() {
            try {
                setIsLoading(true)
                const response = await fetch("http://localhost:3001/genres")
                const genresData = await response.json()
                setGenres(genresData)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchGenres()
    }, [])

    async function addGenre(name: string) {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:3001/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            const newGenre = await response.json()
            setGenres((prev) => [...prev, newGenre])
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function updateGenre(id: number, name: string) {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:3001/movies/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            setGenres((prev) =>
                prev.map((genre) => (genre.id === id ? { ...genre, name } : genre))
            )
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteGenre(id: number) {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3001/movies/${id}`, {
                method: "DELETE",
            })

            setGenres((prev) => prev.filter((genre) => genre.id !== id))
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        genres,
        isLoading,
        error,
        addGenre,
        updateGenre,
        deleteGenre,
    }
}
