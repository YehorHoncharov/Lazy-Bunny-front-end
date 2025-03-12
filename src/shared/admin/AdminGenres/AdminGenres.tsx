import { useState } from "react"
import { useGenre } from "../../../hooks/useGenre"
import { IGenre } from "../../../hooks/types"


export function AdminGenresPage(){
    const { genres } = useGenre()
    const [ editGenre, setEditGenre ] = useState<IGenre>()
    const [ addGenre, setAddGenre ] = useState<IGenre>()
    const [ newGenre, setNewGenre ] = useState<IGenre>()


    return(
        <div>
            <div className="GenresAll">
                <div className="GenresHeader">
                    <p className="GenresHeaderP">Genres</p>
                    <p className="GenresHeaderP">Delete/Edit</p>
                </div>

                <div className="Genres">
                    {}
                </div>
            </div>
        </div>
    )
}