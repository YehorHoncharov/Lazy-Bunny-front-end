import { useEffect, useState } from "react";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { Card } from "../../shared/CardBunny/CardBunny";
import { ProgressBar } from "react-loader-spinner";
import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { useGenre } from "../../hooks/useGenre";
import { IGenre } from "../../hooks/types";

import "./AllMovies.css";

export function AllMovies() {
  const { genres, isLoading: genresLoading, error: genresError } = useGenre();
  const { films, isLoading, error } = useGetAllFilms();
  const [filteredMovies, setFilteredMovies] = useState(films);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenGenre = event.target.value;

    if (chosenGenre === "AllGenre") {
      setSelectedGenres([]);
      return;
    }

    setSelectedGenres((select_genre) =>
      select_genre.includes(chosenGenre)
        ? select_genre.filter((g) => g !== chosenGenre)
        : [...select_genre, chosenGenre]
    );
  };

  const handleRemoveGenre = (genre: string) => {
    setSelectedGenres((prev) => prev.filter((g) => g !== genre));
  };

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilteredMovies(films);
    } else {
      setFilteredMovies(
        films.filter((movie) =>
          movie.Genres.some((genreObj: { Genre: IGenre }) =>
            selectedGenres.includes(genreObj.Genre.name)
          )
        )
      );
    }
  }, [selectedGenres, films]);

  return (
    <div className="allMoviesPage">
      <Header />
      <div className="filterOfFilms">
        <p className="textFilter">Choose films to suit your tastes</p>

        <div className="filter">
          {genresLoading ? (
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
          ) : genresError ? (
            <h1>{genresError}</h1>
          ) : (
            <select
              className="chooseGenre"
              onChange={handleGenreChange}
              value="AllGenre"
            >
              <option className="choose-genres" value="AllGenre">Choose genres...</option>
              {genres.map((genre: IGenre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          )}
          {selectedGenres.length > 0 && (
        <div className="selected-genres-container">
          {selectedGenres.map((genre) => (
            <div key={genre} className="genre-tag">
              <p>{genre}</p>
              <button
                onClick={() => handleRemoveGenre(genre)}
                className="remove-genre-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
        </div>
        
      </div>

      

      <div className="cardsList">
        {isLoading ? (
          <div className="loader-container">
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
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          filteredMovies.map((film) => <Card key={film.id} film={film} />)
        )}
      </div>
      <Footer />
    </div>
  );
}
