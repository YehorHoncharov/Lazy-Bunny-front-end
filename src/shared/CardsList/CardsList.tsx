import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { Card } from "../CardBunny/CardBunny";
import "./CardsList.css";
import { ProgressBar } from "react-loader-spinner";

export function CardsList() {
  const { films, isLoading, error } = useGetAllFilms();

  return (
    <div className="cardsList">
      {isLoading === false ? (
        error === undefined ? (
          films.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                Name={card.Name}
                ReleaseDate={card.ReleaseDate}
                Img={card.Img}
                Rating={card.Rating}
                Year={card.Year}
                Description={card.Description}
                Genre={card.Genre}
                MoodImg={card.MoodImg}
                Screenwriter={card.Screenwriter}
                FilmCompany={card.FilmCompany}
                Country={card.Country}
                Starring={card.Starring}
                Director={card.Director}
                Language={card.Language}
                Duration={card.Duration}
              ></Card>
            );
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
  );
}
