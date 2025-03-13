import { useState } from "react";
import { useGenre } from "../../hooks/useGenre";
import "./AdminGenres.css";


export function AdminGenres() {

    const { genres, addGenre, deleteGenre, updateGenre } = useGenre();
    const [newGenre, setNewGenre] = useState("");
    const [editGenres, setEditGenres] = useState<Record<number, string>>({});
    
    const AddGenre = async () => {
        if (newGenre.trim()) {
            await addGenre(newGenre);
            setNewGenre('');
        }
    };

    const EditGenre = (genreId: number, genreName: string) => {
        setEditGenres((prev) => ({ ...prev, [genreId]: genreName }));
    };

    const SaveGenre = async (genreId: number) => {
        if (editGenres[genreId]?.trim()) {
            await updateGenre(genreId, editGenres[genreId]);
            setEditGenres((prev) => {
                const newEditGenres = { ...prev };
                delete newEditGenres[genreId];
                return newEditGenres;
            });
        }
    };

    const DeleteGenre = async (id: number) => {
        await deleteGenre(id);
    };

    return (
        <div>
            <h2>Жанры</h2>
            <table>
                <thead>
                    <tr>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => (
                        <tr key={genre.id}>
                        <tr title={genre.name}>
                            {/* <td>
                                <input
                                    type="text"
                                    value={editGenres[genre.id] || genre.name}
                                    onChange={(event) => EditGenre(genre.id, event.target.value)}
                                />
                            </td> */}
                            <td>
                                {editGenres[genre.id] !== undefined ? (
                                    <button onClick={() => SaveGenre(genre.id)}>💾</button>
                                ) : (
                                    <button onClick={() => EditGenre(genre.id, genre.name)}>✏️</button>
                                )}
                                <button onClick={() => DeleteGenre(genre.id)}>🗑️</button>
                            </td>
                        </tr>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Добавить жанр"
                />
                <button onClick={AddGenre}>➕ Добавить</button>
            </div>
        </div>
    );
}