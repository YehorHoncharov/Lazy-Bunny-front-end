import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import "./Header.css";

export function Header() {
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (window.location.pathname === "/") {
      const element = document.getElementById("search-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      window.location.hash = "search-section";
    }
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <img src="/static/img/HeaderBunny.png" alt="" />
      </Link>
      <Link to={"/movies"} className="text">
        Movies
      </Link>
      <a href="/shows" className="text">
        Shows
      </a>
      <Link to={"/movie/actor/1"} className="text">
        Mood
      </Link>
      <button onClick={handleSearchClick} className="button-text">
        Search
      </button>
      <Link to={isAuthenticated() ? "/profile" : "/reg"}>
        <button className="buttonProfile">Profile</button>
      </Link>
    </header>
  );
}
