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
    Comments: IComment[]
}
export interface IComment{
    author: string,
    text: string,
    children?: ReactNode
    commentId: number
}

export interface IActor{
    name: string,
    surname?: string,
    dateOfBirth: number,
    placeOfBirth: string,
    height: number,
    career: string,
    totalMovies: number,
    image: string
}

export interface IGenre{
    id: number,
    name: string,
}