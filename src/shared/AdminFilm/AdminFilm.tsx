// import { useState } from "react";
// import * as yup from "yup";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ICreateFilm } from "../../hooks/types";

// const filmSchema = yup.object().shape({
//   Name: yup.string().required("Название обязательно"),
//   ReleaseDate: yup.string().required("Дата релиза обязательна"),
//   Year: yup.number().required("Год обязателен"),
//   Genres: yup.array().of(yup.string()).required("Жанры обязательны"),
//   Country: yup.string().required("Страна обязательна"),
//   Director: yup.string().required("Режиссёр обязателен"),
//   Duration: yup.string().required("Длительность обязательна"),
//   Screenwriter: yup.string().required("Сценарист обязателен"),
//   Description: yup.string().required("Описание обязательно"),
//   Language: yup.string().required("Язык обязательен"),
//   FilmCompany: yup.string().required("Кинокомпания обязательна"),
//   Actors: yup.array().of(yup.string()).required("Актёры обязательны"),
//   Img: yup.string().url("Неверный формат URL постера").required("URL постера обязателен"),
//   Rating: yup.number().min(0, "Рейтинг не может быть меньше 0").max(10, "Рейтинг не может быть больше 10").required("Рейтинг обязателен"),
//   Mood: yup.string().required("Настроение обязательно"),
//   Baner: yup.string().url("Неверный формат URL баннера").required("URL баннера обязателен"),
//   Url: yup.string().url("Неверный формат URL фильма").required("URL фильма обязателен"),
//   Moments: yup.array().of(yup.string()).required("Моменты обязательны"),
// });

// export function AdminCreateFilm() {
//   const [newFilm, setNewFilm] = useState<ICreateFilm>({
//     Name: "",
//     ReleaseDate: "",
//     Year: new Date().getFullYear(),
//     Genres: [],
//     Country: "",
//     Director: "",
//     Duration: "",
//     Screenwriter: "",
//     Description: "",
//     Language: "",
//     FilmCompany: "",
//     Actors: [],
//     Img: "",
//     Rating: 0,
//     Mood: "",
//     Baner: "",
//     Url: "",
//     Moments: [],
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<boolean>(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewFilm((prev) => ({
//       ...prev,
//       [name]: ["Year", "Rating", "Views"].includes(name) ? Number(value) : value,
//     }));
//   };

//   const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewFilm((prev) => ({
//       ...prev,
//       [name]: value.split(",").map((item) => item.trim()),
//     }));
//   };

//   const createFilmAPI = async (newFilm: ICreateFilm) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch("http://localhost:3000/movies/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newFilm),
//       });

//       if (!response.ok) {
//         throw new Error("Не удалось создать фильм. Попробуйте снова.");
//       }

//       const result = await response.json();

//       setSuccess(true);
//       return result;
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Произошла ошибка при создании фильма.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreate = async () => {
//     try {
//       await filmSchema.validate(newFilm);

//       const result = await createFilmAPI(newFilm);

//       if (result) {
//         toast.success("Фильм успешно создан!");
//       }
//     } catch (err) {
//       if (err instanceof yup.ValidationError) {
//         toast.error(err.errors[0]);
//       } else {
//         toast.error(error || "Ошибка при создании фильма");
//       }
//     }
//   };

//   return (
//     <div className="adminProfiles">
//       <h1>Добавить новый фильм</h1>
//       <div className="createFilmForm">
//       <input className="createFilminput" name="Name" value={newFilm.Name} onChange={handleChange} placeholder="Название" />
//       <input className="createFilminput" name="ReleaseDate" value={newFilm.ReleaseDate} onChange={handleChange} placeholder="Дата релиза" />
//       <input className="createFilminput" name="Year" type="number" value={newFilm.Year} onChange={handleChange} placeholder="Год" />
//       <input className="createFilminput" name="Genres" value={newFilm.Genres.join(", ")} onChange={handleArrayChange} placeholder="Жанры (через запятую)" />
//       <input className="createFilminput" name="Country" value={newFilm.Country} onChange={handleChange} placeholder="Страна" />
//       <input className="createFilminput" name="Director" value={newFilm.Director} onChange={handleChange} placeholder="Режиссёр" />
//       <input className="createFilminput" name="Duration" value={newFilm.Duration} onChange={handleChange} placeholder="Длительность" />
//       <input className="createFilminput" name="Screenwriter" value={newFilm.Screenwriter} onChange={handleChange} placeholder="Сценарист" />
//       <textarea className="createFilminput" name="Description" value={newFilm.Description} onChange={handleChange} placeholder="Описание" />
//       <input className="createFilminput" name="Language" value={newFilm.Language} onChange={handleChange} placeholder="Язык" />
//       <input className="createFilminput" name="FilmCompany" value={newFilm.FilmCompany} onChange={handleChange} placeholder="Кинокомпания" />
//       <input className="createFilminput" name="Actors" value={newFilm.Actors.join(", ")} onChange={handleArrayChange} placeholder="Актёры (через запятую)" />
//       <input className="createFilminput" name="Img" value={newFilm.Img} onChange={handleChange} placeholder="URL постера" />
//       <input className="createFilminput" name="Rating" type="number" value={newFilm.Rating} onChange={handleChange} placeholder="Рейтинг" />
//       <input className="createFilminput" name="Mood" value={newFilm.Mood} onChange={handleChange} placeholder="Настроение" />
//       <input className="createFilminput" name="Baner" value={newFilm.Baner} onChange={handleChange} placeholder="URL баннера" />
//       <input className="createFilminput" name="Url" value={newFilm.Url} onChange={handleChange} placeholder="URL фильма" />
//       <input className="createFilminput" name="Moments" value={newFilm.Moments.join(", ")} onChange={handleArrayChange} placeholder="Моменты (через запятую)" />

//       <button onClick={handleCreate} disabled={isLoading}>Создать</button>
//       </div>

//       {isLoading && <div>Загрузка...</div>}
//       {error && <div>{error}</div>}

//       <ToastContainer />
//     </div>
//   );
// }

import { useState } from "react";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICreateFilm } from "../../hooks/types";
import "./AdminFilm.css";

const filmSchema = yup.object().shape({
  Name: yup.string().required("Название обязательно"),
  ReleaseDate: yup.string().required("Дата релиза обязательна"),
  Year: yup.number().required("Год обязателен"),
  Genres: yup.array().of(yup.string()).required("Жанры обязательны"),
  Country: yup.string().required("Страна обязательна"),
  Director: yup.string().required("Режиссёр обязателен"),
  Duration: yup.string().required("Длительность обязательна"),
  Screenwriter: yup.string().required("Сценарист обязателен"),
  Description: yup.string().required("Описание обязательно"),
  Language: yup.string().required("Язык обязателен"),
  FilmCompany: yup.string().required("Кинокомпания обязательна"),
  Actors: yup.array().of(yup.string()).required("Актёры обязательны"),
  Img: yup
    .string()
    .url("Неверный формат URL постера")
    .required("URL постера обязателен"),
  Rating: yup
    .number()
    .min(0, "Рейтинг не может быть меньше 0")
    .max(10, "Рейтинг не может быть больше 10")
    .required("Рейтинг обязателен"),
  Mood: yup.string().required("Настроение обязательно"),
  Baner: yup
    .string()
    .url("Неверный формат URL баннера")
    .required("URL баннера обязателен"),
  Url: yup
    .string()
    .url("Неверный формат URL фильма")
    .required("URL фильма обязателен"),
  Moments: yup.array().of(yup.string()).required("Моменты обязательны"),
});

export function AdminCreateFilm() {
  const [newFilm, setNewFilm] = useState<ICreateFilm>({
    Name: "",
    ReleaseDate: "",
    Year: new Date().getFullYear(),
    Genres: [],
    Country: "",
    Director: "",
    Duration: "",
    Screenwriter: "",
    Description: "",
    Language: "",
    FilmCompany: "",
    Actors: [],
    Img: "",
    Rating: 0,
    Mood: "",
    Baner: "",
    Url: "",
    Moments: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewFilm((prev) => ({
      ...prev,
      [name]: ["Year", "Rating", "Views"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFilm((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const createFilmAPI = async (newFilm: ICreateFilm) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/movies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFilm),
      });

      if (!response.ok) {
        throw new Error("Не удалось создать фильм. Попробуйте снова.");
      }

      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при создании фильма.");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await filmSchema.validate(newFilm);
      const result = await createFilmAPI(newFilm);

      if (result) {
        toast.success("Фильм успешно создан!");
        setNewFilm({
          Name: "",
          ReleaseDate: "",
          Year: new Date().getFullYear(),
          Genres: [],
          Country: "",
          Director: "",
          Duration: "",
          Screenwriter: "",
          Description: "",
          Language: "",
          FilmCompany: "",
          Actors: [],
          Img: "",
          Rating: 0,
          Mood: "",
          Baner: "",
          Url: "",
          Moments: [],
        });
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        toast.error(err.errors[0]);
      } else {
        toast.error(error || "Ошибка при создании фильма");
      }
    }
  };

  return (
    <div className="adminFilmContainer">
      <h1 className="adminFilmHeader">Добавить новый фильм</h1>
      <div className="createFilmForm">
        <div className="inputGroup">
          <label>Название</label>
          <input
            className="createFilminput"
            name="Name"
            value={newFilm.Name}
            onChange={handleChange}
            placeholder="Введите название фильма"
          />
        </div>

        <div className="inputGroup">
          <label>Дата релиза</label>
          <input
            className="createFilminput"
            name="ReleaseDate"
            value={newFilm.ReleaseDate}
            onChange={handleChange}
            placeholder="ГГГГ-ММ-ДД"
          />
        </div>

        <div className="inputGroup">
          <label>Год</label>
          <input
            className="createFilminput"
            name="Year"
            type="number"
            value={newFilm.Year}
            onChange={handleChange}
            placeholder="2025"
          />
        </div>

        <div className="inputGroup">
          <label>Жанры</label>
          <input
            className="createFilminput"
            name="Genres"
            value={newFilm.Genres.join(", ")}
            onChange={handleArrayChange}
            placeholder="Драма, Комедия, Фантастика(на англ,маленькими)"
          />
        </div>

        <div className="inputGroup">
          <label>Страна</label>
          <input
            className="createFilminput"
            name="Country"
            value={newFilm.Country}
            onChange={handleChange}
            placeholder="Страна производства"
          />
        </div>

        <div className="inputGroup">
          <label>Режиссёр</label>
          <input
            className="createFilminput"
            name="Director"
            value={newFilm.Director}
            onChange={handleChange}
            placeholder="РЕдисер(имя)"
          />
        </div>

        <div className="inputGroup">
          <label>Длительность</label>
          <input
            className="createFilminput"
            name="Duration"
            value={newFilm.Duration}
            onChange={handleChange}
            placeholder="2ч 15мин"
          />
        </div>

        <div className="inputGroup">
          <label>Сценарист</label>
          <input
            className="createFilminput"
            name="Screenwriter"
            value={newFilm.Screenwriter}
            onChange={handleChange}
            placeholder="Сценарист(имя)"
          />
        </div>

        <div className="inputGroup" style={{ gridColumn: "1 / -1" }}>
          <label>Описание</label>
          <textarea
            className="createFilminput"
            name="Description"
            value={newFilm.Description}
            onChange={handleChange}
            placeholder="Полное описание фильма"
          />
        </div>

        <div className="inputGroup">
          <label>Язык</label>
          <input
            className="createFilminput"
            name="Language"
            value={newFilm.Language}
            onChange={handleChange}
            placeholder="Оригинальный язык"
          />
        </div>

        <div className="inputGroup">
          <label>Кинокомпания</label>
          <input
            className="createFilminput"
            name="FilmCompany"
            value={newFilm.FilmCompany}
            onChange={handleChange}
            placeholder="Название компании"
          />
        </div>

        <div className="inputGroup">
          <label>Актёры</label>
          <input
            className="createFilminput"
            name="Actors"
            value={newFilm.Actors.join(", ")}
            onChange={handleArrayChange}
            placeholder="Актёр 1, Актёр 2, ..."
          />
        </div>

        <div className="inputGroup">
          <label>URL постера</label>
          <input
            className="createFilminput"
            name="Img"
            value={newFilm.Img}
            onChange={handleChange}
            placeholder="Ссылка на постер"
          />
        </div>

        <div className="inputGroup">
          <label>Рейтинг</label>
          <input
            className="createFilminput"
            name="Rating"
            type="number"
            value={newFilm.Rating}
            onChange={handleChange}
            placeholder="0-10"
            min="0"
            max="10"
            step="0.1"
          />
        </div>

        <div className="inputGroup">
          <label>Настроение</label>
          <input
            className="createFilminput"
            name="Mood"
            value={newFilm.Mood}
            onChange={handleChange}
            placeholder="Настроение фильма"
          />
        </div>

        <div className="inputGroup">
          <label>URL баннера</label>
          <input
            className="createFilminput"
            name="Baner"
            value={newFilm.Baner}
            onChange={handleChange}
            placeholder="Ссылка на баннер"
          />
        </div>

        <div className="inputGroup">
          <label>URL трейллера</label>
          <input
            className="createFilminput"
            name="Url"
            value={newFilm.Url}
            onChange={handleChange}
            placeholder="Ссылка на трейллер"
          />
        </div>

        <div className="inputGroup">
          <label>Моменты</label>
          <input
            className="createFilminput"
            name="Moments"
            value={newFilm.Moments.join(", ")}
            onChange={handleArrayChange}
            placeholder="Ключевые моменты(юрл)"
          />
        </div>

        <button
          className="createButton"
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loadingPulse">Создание...</span>
          ) : (
            "Создать фильм"
          )}
        </button>
      </div>

      {error && <div className="errorMessage">{error}</div>}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
