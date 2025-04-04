import { useEffect, useState } from "react";
import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { IFilm } from "../../hooks/types";
import { ProgressBar } from "react-loader-spinner";
import { Card } from "../CardBunny/CardBunny";

import "./FilmDescriptionPhotos.css";

interface IFilmGenresProps {
  film: IFilm;
}

export function FilmDescriptionPhotos({ film }: IFilmGenresProps) {
  const { films, isLoading, error } = useGetAllFilms();
  const [filteredActors, setFilteredActors] = useState<IFilm[]>([]);

  useEffect(() => {
    if (film?.Actors?.length > 0) {
      const filmActors = film.Actors.map((actor) => actor.surname);

      const filtered = films.filter((movie) =>
        movie.Actors.some((actor) => filmActors.includes(actor.surname))
      );
      setFilteredActors(filtered);
    } else {
      setFilteredActors(films);
    }
  }, [film, films]);

  return (
    <div>
      <div key={film.id}>
        <div className="film-textDiv">
          <h1 className="description">Description</h1>
          <p id="film-font">
            Year: {film.Year},{" "}
            {film.Genres.map((genre) => {
              return genre.name;
            })}
            ,{" "}
            {film.Genres.map((genre) => {
              return genre.name;
            })}
            , {film.Country}
          </p>
          <p id="film-font">Screenwriter: {film.Screenwriter}</p>
          <p id="film-font">Release Date: {film.ReleaseDate}</p>
          <p id="film-font">Duraction: {film.Duration}</p>
          <p id="film-font">Film Company: {film.FilmCompany}</p>
          <p id="film-font">Description: {film.Description}</p>
        </div>

        <div className="film-photo">
          <h1 id="top-cast">Top Cast</h1>

          <div className="film-photos">
            {film.Actors.map(({ Actor }) => (
              <div className="top-cast">
                <img
                  src={Actor.image}
                  alt=""
                  style={{ width: 155, height: 200, borderRadius: 2 }}
                />
                <div id="top-cast-font">{Actor.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="film-photo">
        <h1 id="top-cast">Photos</h1>

        <div className="film-photos">
          {film.Moments.map((moment) => (
            <div key={moment.id}>
              <img
                src={moment.url}
                alt="moment.url"
                style={{ width: 400, height: 200, borderRadius: 8 }}
              />
            </div>
          ))}
        </div>
      </div>

      <h1 id="top-cast" className="morelikethis">
        More like this
      </h1>

      <div className="cardsList">
        {isLoading === false ? (
          error === undefined ? (
            filteredActors.slice(0, 5).map((card) => {
              return <Card film={card}></Card>;
            })
          ) : (
            <div>{error}</div>
          )
        ) : (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
}
