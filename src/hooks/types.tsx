import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode } from "react"

export interface IFilm{
    id: number,
    Name: string,
    ReleaseDate: string,
    Year: number,
    Genres: IGenre[],
    Country: string,
    Director: string,
    Duration: string,
    Screenwriter: string,
    Description: string,
    Language: string,
    FilmCompany: string,
    Actors: IActor[],
    Img: string,
    Rating: number,
    Mood: string,
    Baner: string,
    Url: string,
    Views: number,
    LastEdit: string,
    Moments: IMoment[]
    Comments: IComment[]
}

export interface ICreateFilm{
        Name: string;
        ReleaseDate: string;
        Year: number;
        Genres: string[];
        Country: string;
        Director: string;
        Duration: string;
        Screenwriter: string;
        Description: string;
        Language: string;
        FilmCompany: string;
        Actors: string[];
        Img: string;
        Rating: number;
        Mood: string;
        Baner: string;
        Url: string;
        Moments: string[];
}

export interface IComment{
    id: number
    author: IUser,
    text: string,
    children?: ReactNode
    commentId: number
}

export interface IMoment{
    id: number,
    url: string,
}

export interface IActor{
    name: string,
    surname?: string,
    dateOfBirth: number,
    placeOfBirth: string,
    height: number,
    career: string,
    totalMovies: number,
    image: string,
    Actor: IActor,
}

export interface IGenre {
    id: number;
    name: string;
    Genre: IGenre;
}

export interface IUser{
    id: number,
    nickname: string,
    email: string,
    password: string,
    age?: number,
    role: string,
    image?: string,
    comments: IComment[]
    favouriteMovies: IFilm[]
}


export const toastSuccess = toast.success('Данные успешно сохранены!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
});

export const toastError = toast.error('Произошла ошибка при сохранении данных!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export interface IError {
    status: 'error'
    message: string
}

export interface ISuccess<T> {
    status: 'success'
    data: T
}

export type Response<T> = IError | ISuccess<T>