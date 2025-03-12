
import { Link } from "react-router-dom";
import "./Panel.css";

export function Panel(){
    return (
        <div className="panel">
            <h1 style={{fontSize: 48}}>Admin Panel</h1>
            <button className="panel-button">Files</button>
            <button className="panel-button">Add Film</button>
            <div className="panel-content">
                <h3 style={{fontSize: 32}}>Content manager</h3>
                <hr style={{width: "100%"}} />
                <Link to={"/admin/movies"}>
                    <p style={{fontSize: 24}}>Movies</p>
                </Link>
                <Link to={"/admin/shows"}>
                    <p style={{fontSize: 24}}>Shows</p>
                </Link>
                <Link to={"/admin/mood"}>
                    <p style={{fontSize: 24}}>Mood</p>
                </Link>
                <Link to={"/admin/genres"}>
                    <p style={{fontSize: 24}}>Genres</p>
                </Link>
            </div>
            <div className="panel-content">
                <h3 style={{fontSize: 32}}>Personal</h3>
                <hr style={{width: "100%"}} />
                <Link to={"/admin/profiles"}>
                    <p style={{fontSize: 24}}>Profiles</p>
                </Link>
                <Link to={"/admin/moviestowatchlater"}>
                    <p style={{fontSize: 24}}>Movies to watch later</p>
                </Link>
                <Link to={"/admin/mood"}>
                    <p style={{fontSize: 24}}>Mood</p>
                </Link>
                <Link to={"/admin/moviescommentedon"}>
                    <p style={{fontSize: 24}}>Movies commented on</p>
                </Link>
                <Link to={"/admin/comments"}>
                    <p style={{fontSize: 24}}>Comments</p>
                </Link>
                <Link to={"/admin/recentlymovies"}>
                    <p style={{fontSize: 24}}>Recently movies</p>
                </Link>
            </div>
        </div>
    )
}