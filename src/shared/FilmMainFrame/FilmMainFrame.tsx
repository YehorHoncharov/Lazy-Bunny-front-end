import "./FilmMainFrame.css"
import { IFilm, IGenre } from "../../hooks/types";

interface IFilmGenresProps {
  film: IFilm;
}

export function FilmMainFrame({ film }: IFilmGenresProps){

    return (
        <div className="filmMainFrame">
        <img className="mainfarameimg" src="/static/img/bg1.webp" alt="" />
        {/* <img className="mainfarameimg" src={film.baner} alt="" /> */}
            <div className="filmdesc">
                <div className="filmFrame">
                    <div className="buttonInfo">
                        <img src={film.Img} alt="" className='movieImg'/>
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

                        <div className="genres">
                            {film.Genres.map((filmGenre: IGenre) => (
                                <p key={filmGenre.Genre.id} className="genre">
                                    {filmGenre.Genre.name}
                                </p>
                            ))}
                        </div>
                
                    </div>
            </div>
        </div>
    )
}