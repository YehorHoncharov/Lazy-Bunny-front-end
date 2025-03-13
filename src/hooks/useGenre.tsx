import { useState, useEffect } from "react"
import { IGenre } from "./types"

export function useGenre() {
    const [genres, setGenres] = useState<IGenre[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchGenres() {
            try {
                setLoading(true)
                const response = await fetch("http://localhost:3001/movies")
                if (!response.ok) throw new Error("Ошибка загрузки жанров")

                const genresData = await response.json()
                setGenres(genresData)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchGenres()
    }, [])

    async function addGenre(name: string) {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3001/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            if (!response.ok) throw new Error("Ошибка при добавлении жанра")

            const newGenre = await response.json()
            setGenres((prev) => [...prev, newGenre])
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    async function updateGenre(id: number, name: string) {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:3001/movies/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            })

            if (!response.ok) throw new Error("Ошибка при обновлении жанра");

            setGenres((prev) =>
                prev.map((genre) => (genre.id === id ? { ...genre, name } : genre))
            )
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    async function deleteGenre(id: number) {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/movies/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Ошибка при удалении жанра")

            setGenres((prev) => prev.filter((genre) => genre.id !== id))
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        genres,
        loading,
        error,
        addGenre,
        updateGenre,
        deleteGenre,
    }
}
