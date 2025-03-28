import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../CardBunny/CardBunny";
import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { ProgressBar } from "react-loader-spinner";
import { IFilm } from "../../hooks/types";
import "./Search.css";

export function Search() {
  const location = useLocation();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { films, isLoading, error } = useGetAllFilms();
  const [foundFilms, setFoundFilms] = useState<IFilm[]>([]);

  useEffect(() => {
    if (location.hash === '#search-section') {
      const scrollToElement = () => {
        const element = document.getElementById('search-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Якщо елемент ще не завантажений, чекаємо 50мс і повторюємо спробу
          setTimeout(scrollToElement, 50);
        }
      };
      scrollToElement();
    }
  }, [location]);

  function handleSearch() {
    setButtonClicked(true);
    if (!searchTerm.trim()) {
      setFoundFilms([]);
      return;
    }

    const filteredFilms = films.filter((film) =>
      film.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFoundFilms(filteredFilms);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  if (isLoading) {
    return (
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
    );
  }

  if (error) return <div className="error-message">Error loading films: {error}</div>;

  return (
    <div className="search" id="search-section">
      <h1 id="textSearch">Search</h1>

      <div className="serchInput">
        <img
          className="searchBunny"
          src="/static/img/SearchBunny.png"
          alt="Search icon"
        />
        <input
          className="input"
          type="text"
          placeholder="Enter the film name"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <button id="buttonFind" onClick={handleSearch}>
        Find
      </button>

      <div className="search-results">
        {buttonClicked &&
          (foundFilms.length > 0 ? (
            <div className="films-grid">
              {foundFilms.map((film, index) => {
                if (index <= 5) {
                  return <Card key={film.id} film={film} />;
                }
                return null;
              })}
            </div>
          ) : (
            <p className="no-results">No results found. Please try again!</p>
          ))}
      </div>
    </div>
  );
}