import "./FilmMainFrame.css";
import { IFilm, IGenre } from "../../hooks/types";
import { useNavigate } from "react-router-dom";

interface IFilmGenresProps {
  film: IFilm;
}

export function FilmMainFrame({ film }: IFilmGenresProps) {
  const navigate = useNavigate();

  function handleSeeMoreClick() {
    if (window.location.pathname.includes("/movie")) {
      const cardsList = document.querySelector(".morelikethis");
      if (cardsList) {
        cardsList.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/movie#morelikethis");

      const handleNavigation = () => {
        const cardsList = document.querySelector(".morelikethis");
        if (cardsList) {
          cardsList.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          window.removeEventListener("load", handleNavigation);
        }
      };
      window.addEventListener("load", handleNavigation);
    }
  }

    function handleTrailer() {
        const trailerUrl = film.Url;

        if (trailerUrl) {
        console.log("Opening trailer URL:", trailerUrl);
        try {
            const newWindow = window.open(
            trailerUrl,
            "_blank",
            "noopener,noreferrer"
            );

            if (
            !newWindow ||
            newWindow.closed ||
            typeof newWindow.closed === "undefined"
            ) {
            console.error("Popup was blocked by browser");
            }
        } catch (error) {
            window.open("https://www.youtube.com", "_blank");
        }
        } else {
        window.open("https://www.youtube.com", "_blank");
        }
    }

  return (
    <div className="filmMainFrame">
      <img className="mainfarameimg" src={film.Baner} alt="" />
      <div className="filmdesc">
        <div className="filmFrame">
          <div className="buttonInfo">
            <img src={film.Img} alt="" className="movieImg" />
            <button id="seeMore" onClick={handleSeeMoreClick}>
              See More
            </button>
            <button className="buttonFilmTrailer" onClick={handleTrailer}>
              <img src="/static/img/triangleCardBunny.png" alt="" />{" "}
              <p>Trailer</p>
            </button>
          </div>
        </div>

        <div className="movieInformationBlock">
          <div className="information">
            <h1 id="filmRating">User Rating: </h1>
            <p id="yellow">{film.Rating}</p>
            <h1 id="filmRating">/</h1>
            <p id="yellow">10</p>
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
  );
}
