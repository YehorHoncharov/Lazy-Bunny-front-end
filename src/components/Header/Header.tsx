import { Link } from "react-router-dom"
import "./Header.css"

export function Header(){
    
    return(
        <header className="header">
            <a href="/"><img src="/static/img/HeaderBunny.png" alt="" /></a>
            <Link to={'movies'} className="text">Movies</Link>
            <a href="/" className="text">Shows</a>
            <a href="/" className="text">Mood</a>
            <a href="/" className="text">Search</a>
            <button className="buttonProfile">Profile</button>
        </header>
    )
}