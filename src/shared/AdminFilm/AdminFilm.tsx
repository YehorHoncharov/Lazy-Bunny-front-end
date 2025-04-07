import { useState } from "react";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICreateFilm } from "../../hooks/types";

// Схема валидации через yup
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
  Language: yup.string().required("Язык обязательен"),
  FilmCompany: yup.string().required("Кинокомпания обязательна"),
  Actors: yup.array().of(yup.string()).required("Актёры обязательны"),
  Img: yup.string().url("Неверный формат URL постера").required("URL постера обязателен"),
  Rating: yup.number().min(0, "Рейтинг не может быть меньше 0").max(10, "Рейтинг не может быть больше 10").required("Рейтинг обязателен"),
  Mood: yup.string().required("Настроение обязательно"),
  Baner: yup.string().url("Неверный формат URL баннера").required("URL баннера обязателен"),
  Url: yup.string().url("Неверный формат URL фильма").required("URL фильма обязателен"),
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
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFilm((prev) => ({
      ...prev,
      [name]: ["Year", "Rating", "Views"].includes(name) ? Number(value) : value,
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
      const response = await fetch("http://localhost:3001/movies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFilm),
      });

      if (!response.ok) {
        throw new Error("Не удалось создать фильм. Попробуйте снова.");
      }

      const result = await response.json();

      setSuccess(true);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при создании фильма.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      // Валидация данных
      await filmSchema.validate(newFilm);

      // Отправка на сервер
      const result = await createFilmAPI(newFilm);

      // Уведомление о успехе
      if (result) {
        toast.success("Фильм успешно создан!");
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
    <div className="adminProfiles">
      <h1>Добавить новый фильм</h1>

      <input name="Name" value={newFilm.Name} onChange={handleChange} placeholder="Название" />
      <input name="ReleaseDate" value={newFilm.ReleaseDate} onChange={handleChange} placeholder="Дата релиза" />
      <input name="Year" type="number" value={newFilm.Year} onChange={handleChange} placeholder="Год" />
      <input name="Genres" value={newFilm.Genres.join(", ")} onChange={handleArrayChange} placeholder="Жанры (через запятую)" />
      <input name="Country" value={newFilm.Country} onChange={handleChange} placeholder="Страна" />
      <input name="Director" value={newFilm.Director} onChange={handleChange} placeholder="Режиссёр" />
      <input name="Duration" value={newFilm.Duration} onChange={handleChange} placeholder="Длительность" />
      <input name="Screenwriter" value={newFilm.Screenwriter} onChange={handleChange} placeholder="Сценарист" />
      <textarea name="Description" value={newFilm.Description} onChange={handleChange} placeholder="Описание" />
      <input name="Language" value={newFilm.Language} onChange={handleChange} placeholder="Язык" />
      <input name="FilmCompany" value={newFilm.FilmCompany} onChange={handleChange} placeholder="Кинокомпания" />
      <input name="Actors" value={newFilm.Actors.join(", ")} onChange={handleArrayChange} placeholder="Актёры (через запятую)" />
      <input name="Img" value={newFilm.Img} onChange={handleChange} placeholder="URL постера" />
      <input name="Rating" type="number" value={newFilm.Rating} onChange={handleChange} placeholder="Рейтинг" />
      <input name="Mood" value={newFilm.Mood} onChange={handleChange} placeholder="Настроение" />
      <input name="Baner" value={newFilm.Baner} onChange={handleChange} placeholder="URL баннера" />
      <input name="Url" value={newFilm.Url} onChange={handleChange} placeholder="URL фильма" />
      <input name="Moments" value={newFilm.Moments.join(", ")} onChange={handleArrayChange} placeholder="Моменты (через запятую)" />

      <button onClick={handleCreate} disabled={isLoading}>Создать</button>

      {isLoading && <div>Загрузка...</div>}
      {error && <div>{error}</div>}

      <ToastContainer />
    </div>
  );
}
