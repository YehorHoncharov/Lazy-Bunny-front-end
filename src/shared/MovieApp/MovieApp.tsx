import { createContext, useState } from "react";
import { AllMovies } from "../../pages/AllMovies/AllMovies";
import { FilmPage } from "../../pages/FilmPage/FilmPage";
import { MainPage } from "../../pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IFilm } from "../../hooks/types";
import { ActorPage } from "../../pages/ActorPage/ActorPage";
import { AuthorisationPage } from "../../pages/AuthorisationPage/Authorisation";
import { RegistrationPage } from "../../pages/RegistrationPage/Registration";
import { AdminPage } from "../../pages/AdminPage/AdminPage";
import { AdminProfiles } from "../AdminProfiles/AdminProfiles";
import { AdminMovies } from "../AdminMovies/AdminMovies";
import { AdminGenres } from "../AdminGenres/AdminGenres";
import { AdminProfile } from "../AdminProfile/AdminProfile";
import { AdminComments } from "../AdminComments/AdminComments";
import { UserContextProvider } from "../../context/userContext";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import "./MovieApp.css";
import { ShowPage } from "../../pages/ShowPage/ShowPage";
import { MoodPage } from "../../pages/MoodPage/MoodPage";
import { AdminCreateFilm } from "../AdminFilm/AdminFilm";

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

  function addFilms(film: IFilm) {
    const filteredFilms = recentFilms.filter(
      (recentFilm) => recentFilm.id !== film.id
    );
    const filmsArray = [...filteredFilms, film];

    if (filmsArray.length > 7) {
      filmsArray.shift();
    }
    setRecentFilms(filmsArray);
  }

  return (
    <div>
      <UserContextProvider>
        <recentFilmsContext.Provider value={{ addFilms, recentFilms }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/shows" element={<ShowPage />} />
              <Route path="/mood" element={<MoodPage />} />
              <Route path="/movies" element={<AllMovies></AllMovies>} />
              <Route path="/movie/:id" element={<FilmPage></FilmPage>} />
              <Route
                path="/movie/actor/:id"
                element={<ActorPage></ActorPage>}
              ></Route>
              <Route
                path="/reg"
                element={<RegistrationPage></RegistrationPage>}
              ></Route>
              <Route
                path="/auth"
                element={<AuthorisationPage></AuthorisationPage>}
              ></Route>
              <Route
                path="/profile"
                element={<ProfilePage></ProfilePage>}
              ></Route>

              <Route path="/admin" element={<AdminPage></AdminPage>}>
                <Route
                  path="/admin/movies"
                  element={<AdminMovies></AdminMovies>}
                ></Route>
                <Route
                  path="/admin/profiles"
                  element={<AdminProfiles></AdminProfiles>}
                ></Route>
                <Route
                  path="/admin/profile/:id"
                  element={<AdminProfile></AdminProfile>}
                ></Route>
                <Route
                  path="/admin/genres"
                  element={<AdminGenres></AdminGenres>}
                ></Route>
                <Route
                  path="/admin/movie/create"
                  element={<AdminCreateFilm></AdminCreateFilm>}
                ></Route>
                <Route
                  path="/admin/movie/:id/comments"
                  element={<AdminComments></AdminComments>}
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </recentFilmsContext.Provider>
      </UserContextProvider>
    </div>
  );
}
