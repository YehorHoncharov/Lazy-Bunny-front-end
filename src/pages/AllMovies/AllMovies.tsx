import { useEffect, useState } from "react";

import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import "./AllMovies.css";
import { Card } from "../../shared/CardBunny/CardBunny";
import { ProgressBar } from "react-loader-spinner";
import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { useGenre } from "../../hooks/useGenre";

// export const cards = [
//     {id: 0, name: 'Django Unchained', img: '/static/img/DjangoFilm.png', rating: 4, year: 2009, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", genre: 'Action', moodImg: '/static/img/CardBadBunny.png'},
//     {id: 1, name: 'Django Unchained', img: '/static/img/DjangoFilm.png', rating: 4, year: 2009, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", genre: 'thriller', moodImg: '/static/img/CardBadBunny.png'},
//     {id: 2, name: 'Django Unchained', img: '/static/img/DjangoFilm.png', rating: 4, year: 2009, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", genre: 'Comedy', moodImg: '/static/img/CardBadBunny.png'},
//     {id: 3, name: 'Django Unchained', img: '/static/img/DjangoFilm.png', rating: 4, year: 2009, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", genre: 'thriller', moodImg: '/static/img/CardBadBunny.png'},
//     {id: 4, name: 'Django Unchained', img: '/static/img/DjangoFilm.png', rating: 4, year: 2009, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", genre: 'thriller', moodImg: '/static/img/CardBadBunny.png'},
// ]

export function AllMovies() {
  const { genres, loading: genresLoading, error: genresError } = useGenre();

  const { films, isLoading, error } = useGetAllFilms();
  const [filteredMovies, setFilteredMovies] = useState(films);
  const [selectedGenre, setSelectedGenre] = useState([""]);

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

    //  if (update_genres.length === 0) {
    //    setSelectedGenre(["AllGenre"])
    //  }
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
      // console.log(filteredMovies)
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
              return film.Genres.map((genre) => {
                return <option value={genre.name}>{genre.name}</option>;
              })
            })}
          </select>

        // <select className="chooseYear">
        //   <option value="">Year</option>
        //   <option value="2023">2023</option>
        //   <option value="2022">2022</option>
        //   <option value="2021">2021</option>
        // </select>

        // <select className="chooseFilter">
        //   <option value="">Filter</option>
        //   <option value="popular">Most Popular</option>
        //   <option value="newest">Newest</option>
        //   <option value="top-rated">Top Rated</option>
        // </select>

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
        {/* <button style={{fontSize: "24", color: "white", fontWeight: "bold", backgroundColor: "transparent", width: 100}}>{selectedGenre}</button> */}
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


