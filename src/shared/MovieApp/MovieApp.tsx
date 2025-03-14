import { createContext, useState } from "react";
import { AllMovies } from "../../pages/AllMovies/AllMovies";
import { FilmPage } from "../../pages/FilmPage/FilmPage";
import { MainPage } from "../../pages/MainPage/MainPage";
import "./MovieApp.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IFilm } from "../../hooks/types";
import { ActorPage } from "../../pages/ActorPage/ActorPage";
import { AuthorisationPage } from "../../pages/AuthorisationPage/Authorisation";
import { RegistrationPage } from "../../pages/RegistrationPage/Registration";
import { AdminPage } from "../../pages/AdminPage/AdminPage";
import { AdminProfiles } from "../AdminProfiles/AdminProfiles";
import { AdminMovies } from "../AdminMovies/AdminMovies";
import { AdminGenres } from "../AdminGenres/AdminGenres";
import { AdminFilm } from "../AdminFilm/AdminFilm";
import { AdminComments } from "../AdminComments/AdminComments";

interface IRecentFilms {
  addFilms: (film: IFilm) => void;
  recentFilms: IFilm[];
  // recomendFilms: IFilm[];
}

const initialValue: IRecentFilms = {
  addFilms: (film: IFilm) => {},
  recentFilms: [],
};

export const recentFilmsContext = createContext<IRecentFilms>(initialValue);

export function MovieApp() {
  const [recentFilms, setRecentFilms] = useState<IFilm[]>([]);

  function addFilms(film: IFilm){
    const filteredFilms = recentFilms.filter(recentFilm => recentFilm.id !== film.id)
    const filmsArray = [...filteredFilms, film]

    if (filmsArray.length > 7){
      filmsArray.shift()
    }
    setRecentFilms(filmsArray)

  }

  return (
    
      <div>
        <recentFilmsContext.Provider value={{addFilms, recentFilms}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<AllMovies></AllMovies>} />
            <Route path="/movie/:id" element={<FilmPage></FilmPage>} />
            <Route path="/movie/actor/:id" element={<ActorPage></ActorPage>}></Route>
            <Route path="/reg" element={<RegistrationPage></RegistrationPage>}></Route>
            <Route path="/auth" element={<AuthorisationPage></AuthorisationPage>}></Route>
            <Route path="/admin" element={<AdminPage></AdminPage>}>
              <Route path="/admin/movies" element={<AdminMovies></AdminMovies>}></Route>
              <Route path="/admin/profiles" element={<AdminProfiles></AdminProfiles>}></Route>
              <Route path="/admin/genres" element={<AdminGenres></AdminGenres>}></Route>
              <Route path="/admin/movie/:id" element={<AdminFilm></AdminFilm>}></Route>
              <Route path="/admin/movie/:id/comments" element={<AdminComments></AdminComments>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </recentFilmsContext.Provider>
      </div>
    
  )
}
