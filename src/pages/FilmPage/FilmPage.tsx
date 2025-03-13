import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";

import "./FilmPage.css";
import { FilmComments } from "../../shared/FilmComments/FilmComments";
import { FilmDescriptionPhotos } from "../../shared/FilmDescriptionPhotos/FilmDescriptionPhotos";
import { FilmMainFrame } from "../../shared/FilmMainFrame/FilmMainFrame";
import { useParams } from "react-router-dom";
import { useFilmByID } from "../../hooks/useFilmByID";
import { useEffect, useState } from "react";
import { IFilm } from "../../hooks/types";

export function FilmPage() {
    
  const {id} = useParams()
  const {film, isLoading} = useFilmByID(Number(id))
  
  const [filmState, setFilmState] = useState<IFilm>()
  useEffect(() => {
    if (film){
      setFilmState(film)
    }
  }, [film])
  return(
    <div>
        {!filmState? <div>No film</div>: 
        
        <div className="filmPage">
        <Header></Header>
        <FilmMainFrame film={filmState}></FilmMainFrame>
        <FilmDescriptionPhotos film={filmState} ></FilmDescriptionPhotos>
        <FilmComments film={filmState} ></FilmComments>
        <Footer></Footer>
    </div>}

    </div>
    
  )

}


