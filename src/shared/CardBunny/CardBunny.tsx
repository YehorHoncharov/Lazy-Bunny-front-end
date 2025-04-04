import { Link } from 'react-router-dom'
import './CardBunny.css'
import { IFilm } from '../../hooks/types'
import { useContext } from 'react'
import { recentFilmsContext } from '../MovieApp/MovieApp'
import { useUserContext } from '../../context/userContext'


interface ICardFilm {
    film: IFilm
}

export function Card(props: ICardFilm) {
    const { film } = props
    const { addFilms } = useContext(recentFilmsContext)
    const { user, updateUser } = useUserContext()
    
    const handleSaveClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    
        if (user) {
            const favouriteMovies = Array.isArray(user.favouriteMovies) ? user.favouriteMovies : [];
            console.log(user.favouriteMovies)
            const updatedFavouriteMovies = [...favouriteMovies, film]
    
            const updatedUser = {
                ...user,
                favouriteMovies: updatedFavouriteMovies,
            };
            console.log(updatedUser)
            updateUser(updatedUser)
        }

        console.log(user)
        try {
            if (user){
                const response = await fetch(`http://localhost:3001/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
    
                if (!response.ok) {
                    throw new Error("Failed to upload");
                  }
                
            
                const updatedUser = await response.json()
                updateUser(updatedUser) 
            }   
            
            
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }
    
    function handleTrailer() {
        const trailerUrl = film.Url;

        if (trailerUrl) {
        console.log("Opening trailer URL:", trailerUrl);
        try {
            const newWindow = window.open(
            trailerUrl,
            "_blank",
            "noopener,noreferrer"
            );

            if (
            !newWindow ||
            newWindow.closed ||
            typeof newWindow.closed === "undefined"
            ) {
            console.error("Popup was blocked by browser");
            }
        } catch (error) {
            window.open("https://www.youtube.com", "_blank");
        }
        } else {
        window.open("https://www.youtube.com", "_blank");
        }
    }

    return (
        <Link to={`/movie/${film.id}`} onClick={() => { addFilms(film) }}>
            <div className="card">
                <div>
                    <button 
                        className="saveButton" 
                        onClick={handleSaveClick}
                    >
                        <img src="/static/img/SaveCard.png" alt="" />
                    </button>
                    <img src={film.Img} alt="" className='movieImg'/>
                </div>

                <div className='rating'>
                    <p>Rating: <span className='ratingText'>{film.Rating}/10</span></p>
                </div>

                <div>
                    <p className='movieLables movieName'>{film.Name.slice(0,19)}</p>
                </div>

                <div>
                    <p className='movieLables movieData'>{film.Year}</p>
                </div>
                
                <div className='buttonAndMood'>
                    <button className='buttonTrailer' onClick={handleTrailer}>
                        <img src="/static/img/triangleCardBunny.png" alt="" /> 
                        <p>Trailer</p>
                    </button>
                    <img src="" alt="" />
                </div>
            </div>
        </Link>
    )
}