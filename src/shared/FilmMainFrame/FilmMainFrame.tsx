import { Link } from "react-router-dom"
import "./FilmMainFrame.css"
import { IFilm } from "../../hooks/types";

interface IFilmGenresProps {
  film: IFilm;
}

export function FilmMainFrame({ film }: IFilmGenresProps){
    return (
        <div className="filmMainFrame">
                <div className="filmFrame">

                    <div className="buttonInfo">
                        <img src="/static/img/cardPhoto.jpg" alt="" className='movieImg'/>
                        <select name="seeMore" id="seeMore">
                            <option value="SeeMore" disabled selected>SeeMore</option>
                        </select>
                        <button className='buttonFilmTrailer'><img src="/static/img/triangleCardBunny.png" alt="" /> <p>Trailer</p></button>
                    </div>
                </div>

                <div className="movieInformationBlock">
                        <div className="information">
                            <h1 id="filmRating">User Rating: </h1><p id="yellow">{film.Rating}</p><h1 id="filmRating">/</h1><p id="yellow">10</p>
                            <h1 id="filmName">{film.Name}</h1>
                            <h1 id="filmYear">{film.Year}</h1>
                        </div>

                        <div className="genresOfFilms">
                            <Link to={""} className="genre">Wasted</Link>
                            <Link to={""} className="genre">Thriller</Link>
                            <Link to={""} className="genre">Comedy</Link>
                            <Link to={""} className="genre">Action</Link>
                            <Link to={""} className="genre">Drama</Link>
                            <Link to={""} className="genre">Thriller</Link>
                        </div>
                    </div>
        </div>
    )
}