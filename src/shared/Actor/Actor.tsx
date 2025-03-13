import { IActor } from "../../hooks/types"
import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { Card } from "../CardBunny/CardBunny";
import "./Actor.css"

interface IActorProps {
    actor: IActor;
  }

export function Actor({actor}: IActorProps) {

    const {films, isLoading, error} = useGetAllFilms()

    const filterFilm = films.filter((film) => {
        console.log(film.Actors)
        return film.Actors.some((actorThis) => actorThis.surname === actor.surname)
    }
        
        
    );

    console.log(filterFilm)

    return (
        <div className="MainDivActor">
            <h1 className="ActorH1" id="actorText">{actor.name}</h1>
            <div className="Actor">
                <div className="ActorImageDiv">
                    <img className="ActorImage" src={actor.image} alt="" />
                </div>
                <div className="ActorDescription">
                            <p id="description">Name: <p id="description2">{actor.name}</p></p>
                            <p id="description">Date of birth: <p id="description2">{actor.dateOfBirth}</p></p>
                            <p id="description">Place of birth: <p id="description2">{actor.dateOfBirth}</p></p>
                            <p id="description">Height: <p id="description2">{actor.height}</p></p>
                            <p id="description">Career: <p id="description2">{actor.career}</p></p>
                            <p id="description">Total movies: <p id="description2">{actor.totalMovies}</p></p>
                </div>
            </div>
            <h1 className="H1Movies">Movies</h1>
            {filterFilm.slice(0, 10).map((film) => {
                return <Card film={film} key={film.id}></Card>
            })}
            <h1 className="H1More">More</h1>
        </div>
)
}