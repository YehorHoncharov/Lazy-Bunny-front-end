import { Link } from "react-router-dom";
import "./CardBunny.css";
import { IFilm } from "../../hooks/types";
import { useContext } from "react";
import { recentFilmsContext } from "../MovieApp/MovieApp";
import { useUserContext } from "../../context/userContext";

interface ICardFilm {
  film: IFilm;
  onUpdate?: () => void;
}

export function Card(props: ICardFilm) {
  const { film } = props;
  const { addFilms } = useContext(recentFilmsContext);
  const { user, updateUser } = useUserContext();

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      console.error("Користувач не авторизований");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users/fav/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, filmId: film.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Не вдалося оновити улюблені фільми");
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);

      const favouriteMovies = Array.isArray(user.favouriteMovies)
        ? user.favouriteMovies
        : [];
      const updatedFavouriteMovies = [...favouriteMovies, film];
      updateUser({
        ...user,
        favouriteMovies: updatedFavouriteMovies,
      });
    } catch (error) {
      console.error("Помилка при збереженні фільму:", error);
    }
  };

  const handleTrailer = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const trailerUrl = film.Url || "https://www.youtube.com";
    console.log("Opening trailer URL:", trailerUrl);

    try {
      const newWindow = window.open(
        trailerUrl,
        "_blank",
        "noopener,noreferrer"
      );
      if (!newWindow || newWindow.closed) {
        console.error("Popup was blocked by browser");
      }
    } catch (error) {
      window.open("https://www.youtube.com", "_blank");
    }
  };

  const handleCardClick = () => {
    addFilms(film);
  };

  return (
    <Link
      to={`/movie/${film.id}`}
      onClick={handleCardClick}
      className="card-link"
    >
      <div className="card">
        <div>
          <button className="saveButton" onClick={handleSaveClick}>
            <img src="/static/img/SaveCard.png" alt="Save" />
          </button>
          <img src={film.Img} alt={film.Name} className="movieImg" />
        </div>

        <div className="rating">
          <p>
            Rating: <span className="ratingText">{film.Rating}/10</span>
          </p>
        </div>

        <div>
          <p className="movieLables movieName">{film.Name.slice(0, 19)}</p>
        </div>

        <div>
          <p className="movieLables movieData">{film.Year}</p>
        </div>

        <div className="buttonAndMood">
          <button className="buttonTrailer" onClick={handleTrailer}>
            <img src="/static/img/triangleCardBunny.png" alt="Trailer" />
            <p>Trailer</p>
          </button>
        </div>
      </div>
    </Link>
  );
}
