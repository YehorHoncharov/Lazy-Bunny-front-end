import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { FilmComments } from "../../shared/FilmComments/FilmComments";
import { FilmDescriptionPhotos } from "../../shared/FilmDescriptionPhotos/FilmDescriptionPhotos";
import { FilmMainFrame } from "../../shared/FilmMainFrame/FilmMainFrame";
import { useParams } from "react-router-dom";
import { useFilmByID } from "../../hooks/useFilmByID";
import { useEffect, useState } from "react";
import { IFilm } from "../../hooks/types";
import { ProgressBar } from "react-loader-spinner" 

import "./FilmPage.css";

export function FilmPage() {
    
  const {id} = useParams()
  const {film} = useFilmByID(Number(id))
  
  const [filmState, setFilmState] = useState<IFilm>()
  useEffect(() => {
    if (film && film.length > 0){
      setFilmState(film[0])
    }
  }, [film])
  return(
    <div>
        {!filmState? <div> Loading Film.. <br />           
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
        </div>: 
        
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


