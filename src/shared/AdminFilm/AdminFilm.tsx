import { Link, useParams } from "react-router-dom";
import { useFilmByID } from "../../hooks/useFilmByID";
import { useEffect, useState } from "react";
import { IFilm } from "../../hooks/types";

export function AdminFilm(){
    const {id} = useParams()
    const {film} = useFilmByID(Number(id))
    const [filmState, setFilmState] = useState<IFilm>()
      useEffect(() => {
      if (film){
        setFilmState(film)
      }
    }, [film])
    return (
        <div>
            {!filmState? <div>No film</div>: 
                
            <div className="adminFilmPage">
                <h1>{filmState.Name}</h1>
                <Link to={`/admin/movie/${filmState.id}/comments`}>Comments</Link>
            </div>}
        
            </div>
    )
}