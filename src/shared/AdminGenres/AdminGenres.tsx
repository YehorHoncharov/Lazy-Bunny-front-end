import { useState } from "react";
import { useGenre } from "../../hooks/useGenre";
import "./AdminGenres.css";
import { ProgressBar } from "react-loader-spinner";


export function AdminGenres() {
    const { genres, addGenre, deleteGenre, updateGenre, isLoading, error } = useGenre();
    const [newGenre, setNewGenre] = useState("");
    const [editGenres, setEditGenres] = useState<Record<number, string>>({});
    

    async function AddGenre(){
        if (newGenre.trim()) {
            await addGenre(newGenre);
            setNewGenre('');
        }
    };

    function EditGenre(genreId: number, genreName: string){
        setEditGenres((prev) => ({ ...prev, [genreId]: genreName }));
    };

    async function SaveGenre(genreId: number){
        if (editGenres[genreId]?.trim()) {
            await updateGenre(genreId, editGenres[genreId]);
            setEditGenres((prev) => {
                const newEditGenres = { ...prev };
                delete newEditGenres[genreId];
                return newEditGenres;
            });
        }
    };

    async function DeleteGenre(id: number){
        await deleteGenre(id);
    };

    return (
         <div className="adminProfiles">
                    <h1 style={{fontSize:48}}>Profiles</h1>
        
                    <div className="admin-search">
                        <input className="admin-input" type="text" placeholder="Search by name or email" />
                        <img id="admin-img-search" src="/static/img/Frame.svg" alt="" />
                    </div>
        
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Delete/Editing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                    <td colSpan={5}>
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
                                    <td colSpan={5}>{error}</td>
                                    </tr>
                                ) : (
                                    genres.map((genre) =>
                                    Array.from({ length: 1 }).map(() => (
                                    <div key={genre.id}>
                                        <td>{genre.name}</td>
                                        <td className="actions">
                                            <button className="edit"><img src="/static/img/trash-2.png" alt="Edit" /></button>
                                            <button onClick={() => DeleteGenre(genre.id)}>🗑️</button>
                                        </td>
                                    </div>
                                    ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
        
                </div>
    )
}