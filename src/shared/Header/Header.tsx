import { Link } from "react-router-dom"
import "./Header.css"

export function Header(){
    
    return(
        <header className="header">
            <Link to={'/'}><img src="/static/img/HeaderBunny.png" alt="" /></Link>
            <Link to={'/movies'} className="text">Movies</Link>
            <a href="/" className="text">Shows</a>
            <Link to={'/movie/actor/1'} className="text">Mood</Link>
            <a href="/" className="text">Search</a>
            <button className="buttonProfile">Profile</button>
        </header>
    )
}