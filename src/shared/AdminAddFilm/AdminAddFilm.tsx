import { useParams } from "react-router-dom"
import { useFilmByID } from "../../hooks/useFilmByID"


export function AdminAddFilm() {
    const {id} = useParams()
    const {film} = useFilmByID(Number(id))
    return (
        <div className="mainAddFilmDiv">
            <div>
                <h1>Movies</h1>
                <div className="panefilm">
                    
                    <h2></h2>
                </div>
            </div>
        </div>
    )
}