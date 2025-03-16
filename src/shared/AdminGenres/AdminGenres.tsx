import { useState } from "react"
import { useGenre } from "../../hooks/useGenre"
import "./AdminGenres.css"
import { ProgressBar } from "react-loader-spinner"

export function AdminGenres() {
    const { genres, addGenre, deleteGenre, updateGenre, isLoading, error } = useGenre()
    const [newGenre, setNewGenre] = useState("")
    const [editGenres, setEditGenres] = useState<Record<number, string>>({})

    async function SaveGenre(genreId: number) {
        const newName = editGenres[genreId]?.trim();
        if (!newName) return
      
        try {
            await updateGenre(genreId, newName)
            setEditGenres((prev) => {
                const newEditGenres = { ...prev };
                delete newEditGenres[genreId]
                return newEditGenres;
            });
        } catch (error) {
            console.error("Error updating genre:", error);
        }
    }

    return (
        <div className="adminProfiles">
            <h1 style={{ fontSize: 48 }}>Genres</h1>

            <div className="admin-search">
                <input
                    className="admin-input"
                    type="text"
                    placeholder="Add new genre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                />
                <button onClick={() => addGenre(newGenre)}>Add Genre</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={2}>
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
                                <td colSpan={2}>{error}</td>
                            </tr>
                        ) : (
                            genres.map((genre) => (
                                <tr key={genre.id}>
                                    <td>
                                        {editGenres[genre.id] !== undefined ? (
                                            <input
                                                type="text"
                                                value={editGenres[genre.id]}
                                                onChange={(e) => setEditGenres((prev) => ({
                                                    ...prev,
                                                    [genre.id]: e.target.value
                                                }))}
                                            />
                                        ) : (
                                            genre.name
                                        )}
                                    </td>
                                    <td className="actions">
                                        {editGenres[genre.id] !== undefined ? (
                                            <button onClick={() => SaveGenre(genre.id)}>Save</button>
                                        ) : (
                                            <button onClick={() => setEditGenres((prev) => ({
                                                ...prev,
                                                [genre.id]: genre.name
                                            }))}>
                                                Edit
                                            </button>
                                        )}
                                        <button onClick={() => deleteGenre(genre.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}