import { useGetAllFilms } from "../../hooks/useGetAllFilms"
import { ProgressBar } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import "./AdminMovies.css"

export function AdminMovies() {
    const { films: initialFilms, isLoading, error } = useGetAllFilms()
    const [films, setFilms] = useState(initialFilms || [])
    const navigate = useNavigate()

    useEffect(() => {
        setFilms(initialFilms || [])
    }, [initialFilms])

    async function handleDelete(event: React.MouseEvent, movieId: number) {
        console.log("Delete button clicked")
        event.stopPropagation()

        try {
            const response = await fetch(`http://localhost:3001/movies/${movieId}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete movie")
            }

            setFilms(prevFilms => prevFilms?.filter(film => film.id !== movieId) || [])
            
        } catch (error) {
            console.error("Error deleting movie:", error)
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: 48 }}>Movies</h1>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Edit</th>
                            <th>Views</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4}>
                                    <ProgressBar
                                        visible={true}
                                        height="80"
                                        width="80"
                                        borderColor="purple"
                                        barColor="green"
                                        ariaLabel="progress-bar-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={4}>{error}</td>
                            </tr>
                        ) : films && films.length > 0 ? (
                            films.map((film) => (
                                <tr
                                    key={film.id}
                                    onClick={() => navigate(`/admin/profile/movie/${film.id}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <td>{film.Name}</td>
                                    <td>{film.LastEdit}</td>
                                    <td>{film.Views}</td>
                                    <td className="actions">
                                        <button
                                            className="delete"
                                            onClick={(event) => handleDelete(event, film.id)}
                                        >
                                            <img src="/static/img/trash-2.png" alt="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No results found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}