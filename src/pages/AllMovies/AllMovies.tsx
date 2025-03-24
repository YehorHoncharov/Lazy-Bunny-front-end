import { useEffect, useState } from "react";

import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import "./AllMovies.css";
import { Card } from "../../shared/CardBunny/CardBunny";
import { ProgressBar } from "react-loader-spinner";
import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { useGenre } from "../../hooks/useGenre";


export function AllMovies() {
  const { genres ,isLoading: genresLoading, error: genresError } = useGenre()

  const { films, isLoading, error } = useGetAllFilms()
  const [filteredMovies, setFilteredMovies] = useState(films)
  const [selectedGenre, setSelectedGenre] = useState([""])

  const genreChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    const choosenGenre = event.target.value

    setSelectedGenre((prevGenres) => {
      if (choosenGenre === "AllGenre") {
        setFilteredMovies(films)
        return []
      }
      
      return prevGenres.includes(choosenGenre)
        ? prevGenres.filter((genre) => genre !== choosenGenre)
        : [...prevGenres, choosenGenre]
    });


  }

  function handleRemoveGenre(genre: string){
     const update_genres = selectedGenre.filter((g) => g !== genre)
     setSelectedGenre(update_genres);
  };


  useEffect(() => {
    if (selectedGenre.length === 0) {
      setFilteredMovies(films);
    } else {
      setFilteredMovies(
        films.filter((movie) => {
          return movie.Genres.some((genre) => { 
            return selectedGenre.includes(genre.name)
          })
        })
      );
    }
  }, [selectedGenre, films]);

  return (
    <div className="allMoviesPage">
      <Header />
      <div className="filterOfFilms">
        <p className="textFilter">Choose films to suit your tastes</p>

        <div className="filter">
          {genresLoading ? 
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            borderColor="purple"
            barColor="green"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> : genresError ? <h1>{genresError}</h1> : 
          
          <select
            className="chooseGenre"
            onChange={genreChange}>
            <option value="AllGenre">All genre</option>
            {films.map((film) => {
              return genres.map((genre) => {
                return <option value={genre.name}>{genre.name}</option>;
              })
            })}
          </select>
        }
          
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      {selectedGenre.map((genre) => (
          <div key={genre} style={{ display: 'inline-block', margin: '5px' }}>
            <button onClick={() => handleRemoveGenre(genre)}>
              {genre} <span style={{ color: 'red' }}>×</span>
            </button>
          </div>
        ))}
      </div>

      <div className="cardsList">
        {isLoading === false ? (
          error === undefined ? (
            filteredMovies.map((card) => {
              return (
                <Card film={card}></Card>
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
      <Footer />
    </div>
  );
}


