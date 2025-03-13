import React, { useContext, useEffect, useState } from "react";
import { CardsList } from "../CardsList/CardsList";
import "./CategoriesOfMovies.css";
import { recentFilmsContext } from "../MovieApp/MovieApp";
import { Card } from "../CardBunny/CardBunny";
import { IFilm, IGenre } from "../../hooks/types";
import { useGetAllFilms } from "../../hooks/useGetAllFilms";

export function CategoriesOfMovies() {
    const { recentFilms } = useContext(recentFilmsContext);
    const [recomendedFilms, setRecommendedFilms] = useState<IFilm[]>([])
    const { films} = useGetAllFilms();

   

    // setRecommendedFilms(films.filter((film) => {
    //      return film.Genres.some((genre) => 
    //         recomendedFilms.some((recomendedFilm) =>
    //             recomendedFilm.Genres.includes(genre))
            
    //     )
    // }))

    useEffect(() => {

    const getRecommendedFilms = () => {
        function checkGenre(genre: IGenre) {
            return recentFilms.some((recentFilm) =>{
                const filteredGenres = recentFilm.Genres.some((recentGenre) => {
                    return recentGenre.name === genre.name
                })
                return filteredGenres
                // console.log(filteredGenres)
                // console.log(recentFilm)
                
                // if (.id === genre.id)
                // return recomendedFilm.Genres.includes(genre)
            })
        }   
 
        function someGenres(film: IFilm) {
            const filterGenre = film.Genres.some((genre) => {
                const checkedGenres = checkGenre(genre)
                // console.log(checkedGenres)
                return checkedGenres
            
            })

            return filterGenre
        } 
        const filteredFilms = films.filter((film) => someGenres(film))    
        
        return filteredFilms
    }
        const filteredRecommendedFilms = getRecommendedFilms();
        setRecommendedFilms(filteredRecommendedFilms);
    }, [recentFilms, films])
    
    return (
        <div>
            <div>
                <div className="categoryInfo">
                    <h1>Recomend Films</h1>
                    <img src="/static/img/SectionsFilms.png" alt="" />
                </div>

                <div className="filteredFilm">
                    {recomendedFilms.map((film, index) => {
                    if (index < 5){
                        return <Card film={film}></Card>
                    }
                    return null
                    })}
                </div>
            </div>
        <div>
            <div className="categoryInfo">
            <h1>Today's best</h1>
            <img src="/static/img/SectionsFilms.png" alt="" />
            </div>
            <CardsList></CardsList>
        </div>
        <div>
            <div className="categoryInfo">
            <h1>Popular this week</h1>
            <img src="/static/img/SectionsFilms.png" alt="" />
            </div>
            <CardsList></CardsList>
        </div>
        <div>
            <div className="categoryInfo">
            <h1>New this month</h1>
            <img src="/static/img/SectionsFilms.png" alt="" />
            </div>
            <CardsList></CardsList>
        </div>
        <div>
            <div className="categoryInfo">
            <h1>Coming soon</h1>
            <img src="/static/img/SectionsFilms.png" alt="" />
            </div>
            <CardsList></CardsList>
        </div>
        <div>
            <div className="categoryInfo">
            <h1>TV shows</h1>
            <img src="/static/img/SectionsFilms.png" alt="" />
            </div>
            <CardsList></CardsList>
        </div>
        <div>
            <div className="categoryInfo">
            <h1>Recent Films</h1>
            <img src="/static/img/SectionsFilms.png" alt="" />
            </div>
            <div className="category-recent">
            {recentFilms.map((film, index) => {
                if (index < 5){
                    return <Card film={film}></Card>
                }
                return null
            })}
            </div>
        </div>
        </div>
    );
}
